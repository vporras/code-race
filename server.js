var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var idCount = 0;
var users = {};
var submissions = [];


app.use("/builds", express.static(__dirname + '/builds'));
app.use("/build1", express.static(__dirname + '/builds/build1'));
app.use("/js", express.static(__dirname + '/builds/js'));
app.use("/css", express.static(__dirname + '/builds/css'));

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/builds/index.html');
});

// user connected
io.on('connection', function(socket){
	idCount++;
	var myId = idCount;
	
	console.log("user " + myId + " connected");

	// submission
	socket.on('submission', function(msg) {
		console.log();
		console.log("submission received from user " + myId);
		console.log("name: " + msg.Name);
		console.log("email: " + msg.Email);
		console.log("time: " + msg.Time);

		var index = 0;
		var time = msg.Time;
		// linear search, oh well
		while (index < submissions.length && time > submissions[index].Time)
			index++;
		submissions.splice(index, 0, msg);
  });

  // user disconnected
  socket.on('disconnect', function(){
		console.log("user " + myId + " disconnected");
		delete users[myId];
  });

});

http.listen(app.get('port'), function(){
  console.log('listening on *: ' + app.get('port'));
});


function pushScores() {
	// top 10 scores
	var msg = submissions.slice(0, Math.min(submissions.length, 10));
	io.emit('leaderboard', msg);
}

setInterval(pushScores, 1000);
