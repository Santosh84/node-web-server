const express = require('express');
const fs =require('fs');

var app = express();
var hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'))
//implementing express middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(now);
	var log = '${now}'
	var url = req.method
	//create server.lof file and store log data
	fs.appendFile('server.log', log + url +'\n');
	next();

});

hbs.registerHelper('getCurrentFullYeard', ()=>{
	return new Date().getFullYear()+5;
});

app.get('/', (req, res) => {
	res.render("home.hbs", {
		pageTitle : 'About page',
		welcomeMsg : 'This is home page',
		currentYear : new Date().getFullYear()+1
	});
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		pageTitle : 'About page',
		currentYear : new Date().getFullYear()+1

	});

});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage:'Unable to handle request.'
	});
});

app.listen(3000);