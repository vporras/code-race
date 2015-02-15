#pragma strict

function Awake () {
	Application.RegisterLogCallback(HandleError);
}

function HandleError (logString : String, stackTrace : String, type : LogType) {
	Application.ExternalCall("printError", logString, stackTrace, type);
}