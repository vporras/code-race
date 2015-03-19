package main

import (
	"fmt"
    "github.com/gin-gonic/gin"
    "github.com/gin-gonic/gin/binding"
    "database/sql"
    "gopkg.in/gorp.v1"
    _ "github.com/mattn/go-sqlite3"
	"github.com/gorilla/websocket"
    "log"
    "strconv" 
)

var dbmap = initDb()

type LapSignature struct {
	Time float64
	Email string 
}

func main(){

	defer dbmap.Db.Close()
	go wsUpdate()

	r := gin.Default()
	r.GET("/lookup/:email", getLookup)
	r.GET("/times", getTimes)
	r.POST("/times", postTime)
	r.Static("/static/", "../builds/")	
	//ws
	r.GET("/ws", func(c *gin.Context) {
		conn, err := wsupgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Println("Failed to set websocket upgrade: %+v", err)
			return
		}
		defer delete(clients, conn)
		defer conn.Close()
		clients[conn] = true;
		connReader(conn)		
	})
	r.Run(":8080")
}

func createLapSignature(time float64, email string) LapSignature {
	lapSig := LapSignature{
		Time: time,
		Email: email,
	}
	err := dbmap.Insert(&lapSig)
	checkErr(err, "Insert unsuccessful")
	return lapSig
}

func lookupLaps(email string) gin.H {
	var laps []LapSignature
	_, err := dbmap.Select(&laps,"SELECT * FROM Lapsigs WHERE email=?",email)
	checkErr(err, "Email lookup failed")
	content := gin.H{}
	for k, v := range laps {
		content[strconv.Itoa(k)] = v
	}
	return content
}

func postTime(c *gin.Context) {
	var json LapSignature

	c.BindWith(&json, binding.JSON)
	lapsig := createLapSignature(json.Time, json.Email)
	go func(){notifyCh <- true}()
	if lapsig.Time == json.Time {
		content := gin.H{
			"result": "success",
			"time": lapsig.Time,
			"email": lapsig.Email,
		}
		c.JSON(201, content)
	} else {
		c.JSON(500, gin.H{"result": "failed"})
	}
}

func getTimes(c *gin.Context){
	var laps []LapSignature
	_, err := dbmap.Select(&laps, "SELECT * FROM Lapsigs")
	checkErr(err, "Failed to get times")
	content := gin.H{}
	for k, v := range laps {
		content[strconv.Itoa(k)] = v
	}
	c.JSON(200, content)
}

func getLookup(c *gin.Context){
	lapsig_email := c.Params.ByName("email")
	content := lookupLaps(lapsig_email)
	c.JSON(200, content)
}

func getLeaderboard() []LapSignature{
	var laps []LapSignature
	query := "SELECT * FROM Lapsigs ORDER BY time LIMIT 10"
	_, err := dbmap.Select(&laps, query)
	checkErr(err, "Failed to retrieve leaderboard")
	return laps
}

func initDb() *gorp.DbMap {
	db, err := sql.Open("sqlite3", "db.sqlite3")
	checkErr(err, "sql.Open failure")
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.SqliteDialect{}}
	dbmap.AddTableWithName(LapSignature{}, "Lapsigs")
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")
	return dbmap
}

func checkErr(err error, msg string) {
    if err != nil {
        log.Fatalln(msg, err)
    }
}

/* ===========================================================================*
 *                             Websocket stuff                                *
 * ===========================================================================*/

type Output struct {
	Leaderboard []LapSignature
}

var notifyCh = make(chan bool)
var clients = make(map[*websocket.Conn]bool)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

/*                                                                       *
 * ALWAYS RUNNING. CONSTANTLY CHECKS IF NEW LEADERBOARD NEEDS TO BE SENT *
 *                                                                       */ 

func wsUpdate(){
	for {
		select{
			case <- notifyCh:
				leaderboard := getLeaderboard();
				out := Output{
					Leaderboard: leaderboard,
				}
				for k, _ := range clients {
					 k.WriteJSON(out)
				}
			//
		}
	}
}

//We actually only read from a socket to catch clients disconnecting so we 
//Can close the socket properly and remove from clients map.
func connReader(c *websocket.Conn) {
	var in interface{}
	for {
		err := c.ReadJSON(&in)
		if err != nil {
			fmt.Println("Error reading from ws %+v", err)
			break
		}
	}
}