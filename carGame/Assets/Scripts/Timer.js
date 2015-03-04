#pragma strict
import UnityEngine.UI;
var elapsedTime: float;
var guiTimer: Text;

function Start () {
  elapsedTime = 0.0;
	

}

function Update () {
elapsedTime+= Time.deltaTime;
 guiTimer.text = "Time Elapsed " + elapsedTime.ToString() + "";
}