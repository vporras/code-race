#pragma strict
var Car : CarAPI;

function Start () {

}

function Update () {
	Car.Accelerate(Input.GetAxis("Vertical"));
	Car.Turn(Input.GetAxis("Horizontal"));
	
	if (Input.GetButton("Jump"))
		Car.Brake(1);
	else
		Car.Brake(0);
		
	if (Input.GetKeyDown("return"))
		Car.UnFlip();
}