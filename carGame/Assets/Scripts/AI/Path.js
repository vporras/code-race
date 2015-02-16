#pragma strict
private var path : Transform[];
var rayColor : Color = Color.white;

function Start () {
	InitPath();
}

function InitPath () {
	var children : Array = transform.GetComponentsInChildren(Transform);
	Gizmos.color = rayColor;
	
	path = new Transform[children.length - 1];
	
	var i = 0;
	for (var child : Transform in children) {
		if (child != transform) {
			path[i] = child;
			i++;
		}
	}
	
	Debug.Log(path[0]);
}

function GetCheckpoint(i : int) : Transform {
	if (path == null || path.length == 0 || path[0] == null)
		InitPath();
		
	return path[i];
}

function GetLength() : int {
	return path.length;
}

function OnDrawGizmos/*Selected*/ () {
	if (path == null || path.length == 0 || path[0] == null)
		InitPath();

	Gizmos.color = rayColor;

	for (var i : int = 0; i < path.length; i++) {
		var pos : Vector3 = path[i].position;
		var prev : Vector3;
		
		if (i == 0)
			prev = path[path.length - 1].position;
		else 
			prev = path[i-1].position;
			
		Gizmos.DrawLine(prev, pos);
		Gizmos.DrawWireSphere(pos, 1);
	}
}
