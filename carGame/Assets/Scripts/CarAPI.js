#pragma strict
var FL : WheelCollider;
var FR : WheelCollider;
var RL : WheelCollider;
var RR : WheelCollider;

var wheelFLTrans : Transform;
var wheelFRTrans : Transform;
var wheelRLTrans : Transform;
var wheelRRTrans : Transform;


private var maxTorque : float = 50;
private var motorTorque : float = 0;
private var maxBrakeTorque : float = 100;
private var brakeTorque : float = 0;
private var steerAngle : float = 0;

function Start () {
	rigidbody.centerOfMass.y = -0.8;
}

function Accelerate (power: float) {
	power = Mathf.Max(Mathf.Min(power, 1), -0.5);
	
	motorTorque = maxTorque * power;
}

function Brake (power: float) {
	power = Mathf.Max(Mathf.Min(power, 1), 0);
	
	brakeTorque = maxBrakeTorque * power;
}

function Turn (angle: float) {
	angle = Mathf.Max(Mathf.Min(angle, 1), -1);
	
	var speedFactor = rigidbody.velocity.magnitude/50;
	
	steerAngle = Mathf.Lerp(10, 2, speedFactor) * angle;
}

function FixedUpdate () {
	RR.motorTorque = motorTorque * Input.GetAxis("Vertical");
	RL.motorTorque = motorTorque * Input.GetAxis("Vertical");
	
	RR.brakeTorque = brakeTorque;
	RL.brakeTorque = brakeTorque;
	
	FL.steerAngle = steerAngle;
	FR.steerAngle = steerAngle;
}

function Update() {
	wheelFLTrans.Rotate(FL.rpm/60*360*Time.deltaTime,0,0);
	wheelFRTrans.Rotate(FR.rpm/60*-360*Time.deltaTime,0,0);
	wheelRLTrans.Rotate(RL.rpm/60*360*Time.deltaTime,0,0);
	wheelRRTrans.Rotate(RR.rpm/60*-360*Time.deltaTime,0,0);
}
