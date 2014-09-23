// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){

	var result = [];
	var reg = new RegExp(className);
	var nodes = document.body.childNodes;
	var classList = document.body.classList;
	console.log(nodes);
	console.log(classList);
	if (reg.test(document.body.className)) {
		result.push(document.body)
	}
	for(var i=0;i<nodes.length; i++) {
	    if(reg.test(nodes[i].className)){
	    	result.push(nodes[i]);
	    }
	}
	console.log(result);
	return result;
}




