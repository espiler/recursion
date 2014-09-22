// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var res = '';
  if (typeof(obj) == 'string') {
    res = res + '"' + obj + '"';
  }
  if (typeof(obj) == 'boolean') {
    res = res + obj;
  }
  if (Array.isArray(obj)) {
    res = res + '['
    for (var i=0;i<obj.length;i++) {
      res = res + stringifyJSON(obj[i]) + ',';
    }
    res = res.substring(0, res.length-1) + ']'
  }
  else if (typeof(obj) == 'object') {
  	res = res + '{'
  	for (var key in obj) {
  		res = res + '"' + key + '":' + obj[key] + ',';
  	}
  	res = res.substring(0, res.length-1) + '}'
  }
  return res;
};