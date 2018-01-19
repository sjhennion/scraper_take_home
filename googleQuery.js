module.exports = exports = googleQuery;

var https = require("https");
var util = require("util");

function googleQuery() {

}

googleQuery.query = function query(query, callback) {
	var path = "/search?q="+query+"&aqs=chrome..69i57j69i60l2j69i65l2j69i60.415j0j9&sourceid=chrome&es_sm=91&ie=UTF-8";

	var options = {
		host: 'www.google.com',
		path: path, 
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	};

	var req = https.request(options, function(res) {
		var output = '';
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			output += chunk;
			console.log("Chunk received");
		});

		res.on('end', function() {
			var obj = output;
			console.log(output);
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
