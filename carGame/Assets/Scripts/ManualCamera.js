#pragma strict

function Start () {

}

function Update () {
	var turnSpeed = 3;
	transform.RotateAround(transform.position, transform.right, -Input.GetAxis("Mouse Y") * turnSpeed);
	transform.RotateAround(transform.position, Vector3.up, Input.GetAxis("Mouse X") * turnSpeed);
	
	var speed : float = 30;
	transform.Translate(Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0.0, Input.GetAxis("Vertical") * speed * Time.deltaTime));
}