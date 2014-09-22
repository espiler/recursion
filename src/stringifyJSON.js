// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var res = '';
  if (typeof(obj) == 'string') {
    res = res + obj;
  }
  if (typeof(obj) == 'object') {
  	res = res + '{'
  	for (var key in obj) {
  		res = res + '"' + key + '":' + obj[key] + ',';
  	}
  	res = res + '}'
  }
  return res;
};