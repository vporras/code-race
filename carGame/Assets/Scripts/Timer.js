#pragma strict
import UnityEngine.UI;
var elapsedTime: float;
var guiTimer: Text;
var lapStarted: boolean;
var lapFinished: boolean;


function Start () {
  elapsedTime = 0.0;
  lapStarted = false;
  lapFinished = false;
}

function Update () {
	if (lapFinished) {
		guiTimer.text = "Final Time: " + elapsedTime.ToString("#.00") + " seconds ";
	} else if (lapStarted) {
		elapsedTime += Time.deltaTime;
 		guiTimer.text = "Elapsed Time: " + elapsedTime.ToString("0.00") + " seconds ";
	} else {
		guiTimer.text = "Begin racing!";
	}
}

function OnTriggerEnter (carCollider : Collider) {
	if (carCollider.transform.parent.gameObject.GetComponent.<CarAPI>().lapCompleted) {
		Application.ExternalCall("printScore(" + elapsedTime +")");
		lapFinished = true;
	} else {
		elapsedTime = 0.0;
		lapStarted = true;
	}
}