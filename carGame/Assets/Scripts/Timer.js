#pragma strict
import UnityEngine.UI;
var elapsedTime: float;
var startTime: float;
var guiTimer: Text;

var lapno: int;


function Start () {
  elapsedTime = 0.0;
  startTime = 0.0;
  lapno = 0;
	

}

function Update () {
	if(lapno < 2) {
		elapsedTime+= Time.deltaTime;
 		guiTimer.text = "Time Elapsed " + elapsedTime.ToString() + "";
	}
	else {
	guiTimer.text = "Final Time: " + elapsedTime.ToString();
	}
}

function OnTriggerEnter() {
	
	if(lapno == 0) {
		elapsedTime = 0; lapno = lapno+1;
	}
	
	else {
	elapsedTime = elapsedTime; lapno = lapno+1;
	Application.ExternalCall("printScore(" + elapsedTime +")");
	}
	
}