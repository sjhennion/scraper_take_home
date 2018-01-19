module.exports = exports = yahooQuery;

var https = require("https");
var util = require("util");

function yahooQuery() {

}

yahooQuery.query = function query(query, callback) {
	var path = "/search;_ylc=X3oDMTFiN25laTRvBF9TAzIwMjM1MzgwNzUEaXRjAzEEc2VjA3NyY2hfcWEEc2xrA3NyY2h3ZWI-?p=" + query + "&fr=yfp-t-201";

	var options = {
		host: 'https://search.yahoo.com',
		path: path, 
		method: 'GET',
		headers: {
			'Content-Type': 'text/html',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36'
		}
	};

	var req = https.request(options, function(res) {
		var output = '';
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			output += chunk;
			//console.log("Chunk received");
		});

		res.on('end', function() {
			var obj = output;
			//console.log(output);
			callback(undefined,obj);
		});
	});

	req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('data\n');
	req.write('data\n');
	req.end();
}
