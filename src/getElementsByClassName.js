// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node){

	var result = [];
	if (node === undefined) {node = document.body}
	var reg = new RegExp(className);
	var children = node.childNodes;
	if (reg.test(node.className) && node === document.body) {
		result.push(node)
	}
	for(var i=0;i<children.length; i++) {
	    if(reg.test(children[i].className)){
	    	result.push(children[i]);
	    }
	    if (children[i].childNodes.length > 0) {
	    	var next = getElementsByClassName(className, children[i]);
			if (next.length > 0) {
				next.forEach(function(item) {
					result.push(item);
				});
			}
	    }
	}
	return result;
}




