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
private var maxSteerAngle : float = 15;
private var steerAngle : float = 0;

var path: Path;
private var checkpointIdx : int = 0;
var checkpointThreshold : float = 5;

function Start () {
	rigidbody.centerOfMass.y = -0.8;
}

function Accelerate (power: float) {
	power = Mathf.Clamp(power, -0.5, 1);
	
	motorTorque = maxTorque * power;
}

function Accelerate () {
	Accelerate(1);
}

function Brake (power: float) {
	power = Mathf.Clamp01(power);
	
	brakeTorque = maxBrakeTorque * power;
}

function Brake () {
	Brake(1);
}

function Turn (angle: float) {
	angle = Mathf.Clamp(angle, -1, 1);
	
	var speedFactor = rigidbody.velocity.magnitude/50;
	
	steerAngle = Mathf.Lerp(maxSteerAngle, 2, speedFactor) * angle;
}

function TurnLeft () {
	Turn(-1);
}

function TurnRight () {
	Turn(1);
}

function Flipped () : boolean {
	return Vector3.Dot(transform.up,Vector3.up) < 0;
}

function UnFlip () {
   transform.rotation.z = 0;
   transform.rotation.x = 0;
   transform.Translate(0, 1, 0);
}

function GetCheckpointDirection () : float {
	var checkpoint : Transform = path.GetCheckpoint(checkpointIdx);
	var checkpointVector : Vector3 = transform.InverseTransformPoint(Vector3(checkpoint.position.x, transform.position.y, checkpoint.position.z));
	
	var direction : float = Mathf.Atan2(checkpointVector.x, checkpointVector.z) * Mathf.Rad2Deg;
	return direction;
}

function GetDistanceToObstacle (azimuth : float, altitude : float) : float {
	var hit : RaycastHit;
	
	var direction = Quaternion.Euler(-altitude, azimuth, 0) * transform.forward;
	
	if (Physics.Raycast(transform.position, direction, hit))
		Debug.DrawLine(transform.position, hit.point, Color.white);
	return hit.distance;
}

function GetDistanceToObstacle (azimuth : float) : float {
	return GetDistanceToObstacle(azimuth, 0);
}

function GetDistanceToObstacle () : float {
	return GetDistanceToObstacle(0, 0);
}

function GetSpeed () {
	return rigidbody.velocity.magnitude * 60 * 60 / 1000; //kph
}

function FixedUpdate () {
	RR.motorTorque = motorTorque;
	RL.motorTorque = motorTorque;
	
	RR.brakeTorque = brakeTorque;
	RL.brakeTorque = brakeTorque;
	
	FL.steerAngle = steerAngle;
	FR.steerAngle = steerAngle;
	
	var checkpoint : Transform = path.GetCheckpoint(checkpointIdx);
	var checkpointVector : Vector3 = transform.InverseTransformPoint(Vector3(checkpoint.position.x, transform.position.y, checkpoint.position.z));
	if (checkpointVector.magnitude <= checkpointThreshold) {
		checkpointIdx++; Debug.Log(checkpointIdx);}
	if (checkpointIdx >= path.GetLength())
		checkpointIdx = 0;
}

function Update () {
	wheelFLTrans.Rotate(FL.rpm/60*360*Time.deltaTime,0,0);
	wheelFRTrans.Rotate(FR.rpm/60*360*Time.deltaTime,0,0);
	wheelRLTrans.Rotate(RL.rpm/60*360*Time.deltaTime,0,0);
	wheelRRTrans.Rotate(RR.rpm/60*360*Time.deltaTime,0,0);
	
	wheelFLTrans.localEulerAngles.y = FL.steerAngle * Mathf.Lerp(1, 5, rigidbody.velocity.magnitude/50) - wheelFLTrans.localEulerAngles.z;
	wheelFRTrans.localEulerAngles.y = FR.steerAngle * Mathf.Lerp(1, 5, rigidbody.velocity.magnitude/50) - wheelFRTrans.localEulerAngles.z;
}
