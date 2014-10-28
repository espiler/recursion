// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node){

	var result = [];
	node = node || document.body;
	var children = node.childNodes;
	if (node.classList && node.classList.contains(className)) {
		result.push(node)
	}
	for (var i=0;i<children.length; i++) {
		result = result.concat(getElementsByClassName(className, children[i]));
	}
	return result;
}

