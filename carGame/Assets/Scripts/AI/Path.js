var path : Array;
var rayColor : Color = Color.white;

function OnDrawGizmos() {
	var children : Array = transform.GetComponentsInChildren(Transform);
	Gizmos.color = rayColor;
	
	path = new Array();
	
	for (var child : Transform in children) {
		if (child != transform)
			path[path.length] = child;
	}
	
	for (var i : int = 0; i < path.length; i++) {
		var pos : Vector3 = path[i].position;
		if (i > 0) {
			var prev = path[i-1].position;
			Gizmos.DrawLine(prev, pos);
			
		}
	}
	
	
}
