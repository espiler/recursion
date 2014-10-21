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
	var escape = false;

	var strConvert = function(collection, key) {
		if (collection[key] === "" || typeof(collection[key]) !== 'string') {
		} else if (!(isNaN(Number(collection[key])))) {
			collection[key] = Number(collection[key]);
		} else if (collection[key] === 'false') { 
			collection[key] = false; 
		} else if (collection[key] === 'true') { 
			collection[key] = true; 
		} else if (collection[key] === 'null') { 
			collection[key] = null;
		} else if (typeof(collection[key]) === 'string') {
			collection[key] = collection[key].substring(1,collection[key].length-1);
		}
	};
	var next = function() {
		position++;
		value = json[position];
		if (escape === true) {
			value === '\\' ? arrayValue += '\\' : arrayValue += value;
				escape = false;
				next();
		} else if (string === false && value === " ") {
			next();
		} else if (value === '"') {
			string === true ? string = false : string = true;
		} else if (value === '\\') {
			escape = true;
			next();
		}
	};
	var parseObject = function(){
		onKey = true;
		var objResult = {};
		var objKey = '';
		var objValue = '';
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
			} else if (onKey === true) {
				objKey = parseString();
				next();
			}
		}
		if (objKey) {objResult[objKey] = objValue;}
		objKey = '';
		objValue = '';
		for (var key in objResult) {
			strConvert(objResult, key);
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
			strConvert(arrayResult, i);
		}
		if (innerArray === false) {result = arrayResult;}
		return arrayResult;
	};
	var parseString = function(){
		var stringResult = '';
		next();
		while (value !== '"') {
			stringResult += value;
			next();
		}
		return stringResult;
	}

	var parseNumber = function(){
		var numResult = '';
		while (Number(value) !== NaN && value !== undefined) {
			numResult += value;
			next();
		}
		return Number(numResult);
	}

	if (value === '[') {
		parseArray();
	} else if (value === '{') {
		parseObject();
	} else if (value === '"') {
		return parseString();
	} else if (Number(value) !== NaN) {
		return parseNumber();
	}

	return result;
};
