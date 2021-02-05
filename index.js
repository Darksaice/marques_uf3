#!/usr/bin/node

const http = require("http");
const fs = require ("fs");

console.log("Inicializando el servidor web");

http.createServer((request, response) => {
	console.log(request, url);

	fs.readFile("index.html", (error, content) => {
	
	
	
	});
 
	fs.readFile("index.html", (error, content) => {
		
		response.writeHead(200, {'Content-Type': 'text/html'}); 
		response.write(content);
		response.end();
	
	});

}).listen(8080);
