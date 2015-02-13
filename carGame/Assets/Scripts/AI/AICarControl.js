#pragma strict
var startFunction : Function = function(){};
var updateFunction : Function = function(){};
var Car : CarAPI;

Application.ExternalCall("getAICode");

function storeAICode (s: String) {
	eval(s);
}

function Start () {
	rigidbody.centerOfMass.y = -0.8;
	startFunction();
}

function FixedUpdate () {
	updateFunction();
	
//	Application.ExternalEval(
//		"console.log('Hello, World!');"

//	);
//	Debug.Log('x = ' + f());
}