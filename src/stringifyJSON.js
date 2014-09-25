// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var res = '';
  if (typeof(obj) == 'string') {
    res += '"' + obj + '"';
  }
  if (typeof(obj) == 'boolean' || typeof(obj) == 'number' || obj == undefined) {
    res += obj;
  }
  if (Array.isArray(obj)) {
    res += '['
    for (var i=0;i<obj.length;i++) {
      res += stringifyJSON(obj[i]) + ',';
    }
    if (res.length > 1) {res = res.substring(0, res.length-1)};
    res += ']';
  }
  else if (typeof(obj) == 'object' && obj != null) {
  	res += '{'
  	for (var key in obj) {
      if (key !== undefined && typeof(key) !== 'function' && obj[key] !== undefined && typeof(obj[key]) !== 'function') {
  		res += '"' + key + '":' + stringifyJSON(obj[key]) + ',';
      }
  	}
  	if (res.length > 1) {res = res.substring(0, res.length-1)};
    res += '}';
  }
  return res;
};