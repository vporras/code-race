package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-gonic/gin/binding"
    "database/sql"
    "gopkg.in/gorp.v1"
    _ "github.com/mattn/go-sqlite3"
    "log"
    "strconv"
)

var dbmap = initDb()

func main(){

	//When the function returns, we should last close the Db.
	defer dbmap.Db.Close()

	//Create the router with default settings; will use custom settings later on (if nec.).
	r := gin.Default()

	//Retrieves the top 10 times and returns them, along with respective email.
	r.GET("/leaderboard", getLeaderboard)

	//Looks up the times for a particular email
	r.GET("/lookup/:email", getLookup)

	//Gets all times and emails in no particular order.
	r.GET("/times", getTimes)

	//Post a time
	r.POST("/times", postTime)

	//Serve the client web page
	r.Static("/static/", "../builds/")

	//RUUUUUUUUUUUUN!
	r.Run(":8080")
}

type LapSignature struct {
	Time float64
	Email string 
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
	_, err := dbmap.Select(&laps, "SELECT * FROM Lapsigs WHERE email=?", email)
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
	//Query the Db and put result in laps.
	_, err := dbmap.Select(&laps, "SELECT * FROM Lapsigs")
	checkErr(err, "Failed to get times")
	//create a JSON wrapper
	content := gin.H{}
	//put results in
	for k, v := range laps {
		content[strconv.Itoa(k)] = v
	}
	//respond with conent
	c.JSON(200, content)
}

func getLookup(c *gin.Context){
	lapsig_email := c.Params.ByName("email")
	//l_email, _ := strconv.Atoi(lapsig_email)
	content := lookupLaps(lapsig_email)
	c.JSON(200, content)

}

func getLeaderboard(c *gin.Context){
	var laps []LapSignature

	_, err := dbmap.Select(&laps, "SELECT * FROM Lapsigs ORDER BY time LIMIT 10")
	checkErr(err, "Failed to retrieve leaderboard")
	content := gin.H{}
	for k, v := range laps {
		content[strconv.Itoa(k)] = v
	}
	c.JSON(200, content)
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
