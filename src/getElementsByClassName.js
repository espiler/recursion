// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node){

	var result = [];
	if (node === undefined) {node = document.body}
	var children = node.childNodes;
	if (node.classList && node.classList.contains(className)) {
		result.push(node)
	}
	for(var i=0;i<children.length; i++) {
    	var next = getElementsByClassName(className, children[i]);
		if (next.length > 0) {
			next.forEach(function(item) {
				result.push(item);
			});
	    }
	}
	return result;
}

