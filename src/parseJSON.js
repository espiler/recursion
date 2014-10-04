// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	var result;
	var arrayValue = '';
	var onKey = true;
	var objKey = '';
	var objValue = '';
	var string = false;
	var position = 0;
	var value = json[position];

	var next = function() {
		position++;
		value = json[position];
		if (value === " ") {
			next();
		}
		if (string === false && value === '"') {
			string = true;
		}
		if (string === true && value === '"') {
		string = false;
		}
	};
	var parseObject = function(){
		next();
		while (value !== '}') {
			if (value === ',' && string === false) {
				result[objKey] = objValue;
				objKey = '';
				objValue = '';
				onKey = true;
				next();
			}
			if (value === ':' && onKey === true && string === false) {
				onKey = false;
				next();
			} else if (onKey === false) {
				objValue += value;
				next();
			} else if (onKey === true && value === '"') {
				next();
			} else {
				objKey += value;
				next();
			}
		}
		if (objKey) {result[objKey] = objValue;}
		objKey = '';
		objValue = '';
		for (var key in result) {
			if (!(isNaN(Number(result[key])))) {
				result[key] = Number(result[key]);
			} else if (result[key] === 'false') { 
				result[key] = false; 
			} else if (result[key] === 'true') { 
				result[key] = true; 
			} else if (result[key] === 'null') { 
				result[key] = null;
			} else if (typeof(result[key]) === 'string') {
				result[key] = result[key].substring(1,result[key].length-1);
			}
		}
		return result;
	};
	var parseArray = function(){
		next();
		while (value !== ']') {
			if (value === ',' && string === false) {
				result.push(arrayValue);
				arrayValue = '';
				next();
			} else {
				arrayValue += value;
				next();
			}
		}
		if (arrayValue) {result.push(arrayValue);}
        arrayValue = '';
		for (var i=0; i<result.length; i++) {
			if (!(isNaN(Number(result[i])))) {
				result[i] = Number(result[i]);
			} else if (result[i] === 'false') { 
				result[i] = false; 
			} else if (result[i] === 'true') { 
				result[i] = true; 
			} else if (result[i] === 'null') { 
				result[i] = null;
			} else if (typeof(result[i]) === 'string') {
				result[i] = result[i].substring(1,result[i].length-1);
			}
		}
		return result;
	};
	
	// while (position < json.length-1) {
	// 	if (value === '[') {
	// 		debugger;
	// 		result = [];
	// 		parseArray();
	// 	}
	// 	if (value === '{') {
	// 		result = {};
	// 		parseObject();
	// 	}
	// 	next();
	// }

	if (value === '[') {
		result = [];
		parseArray();
	}
	if (value === '{') {
		result = {};
		parseObject();
	}
	next();

	return result;
};
