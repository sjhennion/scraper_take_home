module.exports = exports = bingQuery;

var https = require("https");
var util = require("util");

function bingQuery() {

}

bingQuery.query = function query(query, callback) {
	var path = "/search?q=" + query + "&go=Submit&qs=n&form=QBLH&pq=test&sc=8-4&sp=-1&sk=&cvid=C5264EDF7B5A4792AD8DBEA0DBB516C1";

	var options = {
		host: 'www.bing.com',
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
