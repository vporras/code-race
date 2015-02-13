#pragma strict
var CarAPI : CarAPI;

function Start () {

}

function Update () {
	CarAPI.Accelerate(Input.GetAxis("Vertical"));
	CarAPI.Turn(Input.GetAxis("Horizontal"));
	
	if (Input.GetButton("Jump"))
		CarAPI.Brake(1);
	else
		CarAPI.Brake(0);
}