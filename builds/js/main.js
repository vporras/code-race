var socket;
var myScore;

// init method, called with everything is loaded
$(document).ready(function() {

	// hide buttons before they are ready
	$("#codeTestButton").css("visibility", "hidden");

	$("#scoreText").css("visibility", "hidden");
	$("#score").css("visibility", "hidden");
	$("#submitButton").css("visibility", "hidden");
  

  console.log("hello world we are ready");
  socket = io.connect();

  // generate score divs for leaderboard
  for (var i = 1; i <= 10; i++) {
  	var str = "";
  	str += "<div id=\"score" + i + "\" class=\"score\">"
  	str += "<div class=\"name textContainer\">"
  	str += "<span id=\"name" + i + "\" class=\"text\"></span>"
  	str += "</div>"
  	str += "<div class=\"time textContainer\">"
  	str += "<span id=\"time" + i + "\" class=\"text\"></span>"
  	str += "</div>"
  	str += "</div>";
  	$("#leaderboard").append($(str));

  	var color = i % 2 == 1 ? "#EEEEEE" : "#DDDDDD";
  	$("#score"+i).css("background-color", color);
  	$("#score"+i).css("display", "none");
  }

  // leaderboard received from server
  socket.on('leaderboard', function(msg){
  	for (var i = 0; i < msg.length; i++) {
  		// $("#score"+(i+1)).html("foo");
  		$("#score"+(i+1)).css("display", "block");
  		$("#name"+(i+1)).html(msg[i].Name);
  		$("#time"+(i+1)).html(formatScore(msg[i].Time, 2));
  	}
  });

});

function getAICode() {
  $("#codeTestButton").css("visibility", "visible");
}

function printError(logString, stackTrace, type) {
    // $("#error-log").append("<p class='error'>" + logString + "</p>");
    console.log(logString);
    console.log(stackTrace);
    console.log(type);
}

function printScore(score) {
  // $("#code-submit").prop("disabled", false);
  console.log("score printed: " + score);
  myScore = score;
  $("#score").text(formatScore(score,2));

  $("#scoreText").css("visibility", "visible");
	$("#score").css("visibility", "visible");
	$("#submitButton").css("visibility", "visible");

}


// display number with a fixed amount of digits after the decimal point
function formatScore(score, numZeroes) {
	var str = score + "";
	if (str.indexOf(".") < 0)
		str += ".";
	var count = str.length - str.indexOf(".") - 1;

	// more digits than necessary
	if (count > numZeroes) 
		str = str.substring(0, str.length - (count-numZeroes));
	// add trailing zeroes
	else 
		for (var i = 0; i < numZeroes-count; i++)
			str += "0";
	return str;
}



// testing code
$(document).on('click', '#codeTestButton', function() {
  console.log("code test button pressed");
  u.getUnity().SendMessage("AICar", "testAICode", $("#bot-code").val());
  // $("#error-log").empty();
});

// submitting score
$(document).on('click', '#submitButton', function() {
  console.log("submit button pressed");

  var data = {
  	Name: $("#nameInput").val(),
  	Email: $("#emailInput").val(),
  	Time: myScore * 1.0,
  	Code: $("#bot-code").val()
  }

  console.log("submitted score");
  socket.emit('submission', data);

  // can only submit once
  $("#scoreText").css("visibility", "hidden");
	$("#score").css("visibility", "hidden");
	$("#submitButton").css("visibility", "hidden");
});