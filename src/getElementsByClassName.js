// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node){

	var result = [];
	if (node == undefined) {node = document.body}
	var reg = new RegExp(className);
	var nodeList = node.childNodes;
	if (reg.test(node.className) && node == document.body) {
		result.push(node)
	}
	for(var i=0;i<nodeList.length; i++) {
	    if(reg.test(nodeList[i].className)){
	    	result.push(nodeList[i]);
	    }
	    if (nodeList[i].childNodes.length > 0) {
	    	var next = getElementsByClassName(className, nodeList[i]);
			if (next.length > 0) {
				next.forEach(function(item) {
					result.push(item);
				});
			}
	    }
	}
	return result;
}




