// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
	var result;
	var arrayValue = '';
	var onKey = true;
	var string = false;
	var position = 0;
	var value = json[position];
	var innerArray = false;
	var innerObject = false;

	var next = function() {
		position++;
		value = json[position];
		if (string === false && value === " ") {
			next();
		} else if (value === '"') {
			string === true ? string = false : string = true;
		}
	};
	var parseObject = function(){
		onKey = true;
		var objResult = {};
		var objKey = '';
		var objValue = ''
		next();
		while (value !== '}') {
			if (string === false && value === '{') {
				innerObject = true;
				objValue = parseObject();
				innerObject = false;
				next();
			} else if (string === false && value === '[') {
				innerArray = true;
				objValue = parseArray();
				innerArray = false;
				next();
			} else if (string === false && value === ',') {
				objResult[objKey] = objValue;
				objKey = '';
				objValue = '';
				onKey = true;
				next();
			} else if (string === false && onKey === true && value === ':') {
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
		if (objKey) {objResult[objKey] = objValue;}
		objKey = '';
		objValue = '';
		for (var key in objResult) {
			if (objResult[key] === "" || typeof(objResult[key]) !== 'string') {
			} else if (!(isNaN(Number(objResult[key])))) {
				objResult[key] = Number(objResult[key]);
			} else if (objResult[key] === 'false') { 
				objResult[key] = false; 
			} else if (objResult[key] === 'true') { 
				objResult[key] = true; 
			} else if (objResult[key] === 'null') { 
				objResult[key] = null;
			} else if (typeof(objResult[key]) === 'string') {
				objResult[key] = objResult[key].substring(1,objResult[key].length-1);
			}
		}
		if (innerObject === false) {result = objResult;}
		return objResult;
	};
	var parseArray = function(){
		var arrayResult = [];
		next();
		while (value !== ']') {
			if (value === '[' && string === false) {
				innerArray = true;
				arrayValue = parseArray();
				innerArray = false;
				next();
			} else if (value === '{' && string === false) {
				innerObject = true;
				arrayValue = parseObject();
				innerObject = false;
				next();
			} else if (value === ',' && string === false) {
				arrayResult.push(arrayValue);
				arrayValue = '';
				next();
			} else {
				arrayValue += value;
				next();
			}
		}
		if (arrayValue) {arrayResult.push(arrayValue);}
        arrayValue = '';
		for (var i=0; i<arrayResult.length; i++) {
			if (arrayResult[i] === "" || typeof(arrayResult[i]) !== 'string') {
			} else if (!(isNaN(Number(arrayResult[i])))) {
				arrayResult[i] = Number(arrayResult[i]);
			} else if (arrayResult[i] === 'false') { 
				arrayResult[i] = false; 
			} else if (arrayResult[i] === 'true') { 
				arrayResult[i] = true; 
			} else if (arrayResult[i] === 'null') { 
				arrayResult[i] = null;
			} else if (typeof(arrayResult[i]) === 'string') {
				arrayResult[i] = arrayResult[i].substring(1,arrayResult[i].length-1);
			}
		}
		if (innerArray === false) {result = arrayResult;}
		return arrayResult;
	};

	if (value === '[') {
		parseArray();
	}
	if (value === '{') {
		parseObject();
	}
	next();

	return result;
};
