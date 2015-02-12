#pragma strict
var FL : WheelCollider;
var FR : WheelCollider;
var RL : WheelCollider;
var RR : WheelCollider;
var maxTorque : float;

function Start () {
	rigidbody.centerOfMass.y = -0.9;
}

function FixedUpdate () {
	RR.motorTorque = maxTorque * Input.GetAxis("Vertical");
	RL.motorTorque = maxTorque * Input.GetAxis("Vertical");
	
	FL.steerAngle = 10 * Input.GetAxis("Horizontal");
	FR.steerAngle = 10 * Input.GetAxis("Horizontal");
}