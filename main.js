var express = require("express");
var moment = require("moment");
var cheerio = require("cheerio");
var googleQuery = require("./googleQuery");
var bingQuery = require("./bingQuery");
var yahooQuery = require("./yahooQuery");
var async = require("async");
var app = express();


function main(params) {
	console.log("Test");

	app.get('/search', function(req,res) {
		var queryString = "" + req.query.query;
		console.log(queryString);

		var resultSet = [];

		async.parallel([
			function(callback) {
				var bingres = [];
				bingQuery.query(queryString, function(err, result) {
					var $ = cheerio.load(result);
					//console.log(bingRes);	
					$('li.b_algo').each(function(i, element) {
						var a = $(this);
						var link = a.children().children().attr('href');
						var title = a.children().children().children().eq(0).text();
						var item = {"Title" : title, "Link" : link};
						//console.log(link + " " + title);
						bingres.push(item);
					});

					callback(null, {"Bing Results" : bingres});
				});
			},
			function(callback) {
				var yahoores = [];
				yahooQuery.query(queryString, function(err, result) {
					var $ = cheerio.load(result);
					console.log($);	
					/*
					$('li.b_algo').each(function(i, element) {
						var a = $(this);
						var link = a.children().children().attr('href');
						var title = a.children().children().children().eq(0).text();
						var item = {"Title" : title, "Link" : link};
						console.log(link + " " + title);
						bingres.push(item);
					});
					*/

					callback(null, {"Yahoo Results" : yahoores});
				});
					callback(null, {"Yahoo Results" : yahoores});
			},
			function(callback) {
				var googleres = [];
				googleQuery.query(queryString, function(err, result) {
					var $ = cheerio.load(result);
					//console.log($);	
					$('h3.r').each(function(i, element) {
						var a = $(this);
						var link = a.children().attr('href');
						//console.log(a.children().children().text());
						var title = a.children().children().eq(0).text();
						var item = {"Title" : title, "Link" : link};
						//console.log(link + " " + title);
						googleres.push(item);
					});

					callback(null, {"Google Results" : googleres});
				});
			},function(callback) {
				callback(null, 1);
			}
		],
		function(err, results) {
			results.forEach(function(resItem) {
				//console.log(resItem);
			});

			res.send(results);
		});

		//res.send(queryString);
	});


	startServer();

	return 0;
}

function startServer() {
	var port = 50385;
	var name = "SearchSever";

	server = app.listen(port, function() {
		console.log("%s server listening on port %s", name, port);
	});
}

main();