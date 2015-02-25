#pragma strict
var startFunction : Function = function(){};
var updateFunction : Function = function(){};
var Car : CarAPI;

Application.ExternalCall("getAICode");

function testAICode (code: String) {
	eval(code);
}

function Start () {
	startFunction();
}

function FixedUpdate () {
	updateFunction();
}