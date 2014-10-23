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
	var onArray = false;
	var onObject = false;
	var escapeVal =''

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
		if (!value) {
			throw("Unparseable String!");
		}
		if (escape) {
			if (onArray){
				value === '\\' ? arrayValue += '\\' : arrayValue += value;
				escape = false;
				next();
			} else {
				escapeVal += '\\' + value;
			}
		} else if (!string && value === " ") {
			next();
		} else if (value === "") {
		} else if (value === '"') {
			(string) ? string = false : string = true;
		} else if (value === '\\') {
			escape = true;
			next();
		}
	};
	var parseObject = function(){
		onKey = true;
		onObject = true;
		var objResult = {};
		var objKey = '';
		var objValue = '';
		next();
		while (value !== '}') {
			if (escapeVal.length > 0) {
				(onKey) ? objKey += escapeVal : objValue += escapeVal;
				escapeVal = '';
			}
			if (!string && value === '{') {
				innerObject = true;
				objValue = parseObject();
				innerObject = false;
			} else if (!string && value === '[') {
				innerArray = true;
				objValue = parseArray();
				innerArray = false;
			} else if (!string && value === ',') {
				objResult[objKey] = objValue;
				objKey = '';
				objValue = '';
				onKey = true;
			} else if (!string && onKey && value === ':') {
				onKey = false;
			} else if (!onKey) {
				objValue += value;
			} else if (onKey && string) {
				objKey = parseString();
			} else if (onKey) {
				objKey += value;
			}
			next();
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
		onArray = true;
		next();
		while (value !== ']') {
			if (value === '[' && !string) {
				innerArray = true;
				arrayValue = parseArray();
				innerArray = false;
				next();
			} else if (value === '{' && !string) {
				innerObject = true;
				arrayValue = parseObject();
				innerObject = false;
				next();
			} else if (value === ',' && !string) {
				arrayResult.push(arrayValue);
				arrayValue = '';
				next();
			} else {
				arrayValue += value;
				next();
			}
		}
		onArray = false;
		if (arrayValue) {arrayResult.push(arrayValue);}
        arrayValue = '';
		for (var i=0; i<arrayResult.length; i++) {
			strConvert(arrayResult, i);
		}
		if (innerArray === false) {result = arrayResult;}
		if (string) { throw("Unparseable String!"); }
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
