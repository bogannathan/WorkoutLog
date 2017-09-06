require('dotenv').config()
var express=require('express')
var app=express()
var bodyParser = require('body-parser')
var sequelize = require('./db')

var User = sequelize.import(__dirname + '\\models\\user')

User.sync() //User.sync({force:true})

app.use(bodyParser.json()) // this needs to be in front of other app.use. it must jsonify 
//so that other functions can use json objects
app.use(require('./middleware/headers'))
app.use(require('./middleware/validate-session'))
//create a user
app.use('/api/user', require('./routes/user'))
//log in a user
app.use('/api/login', require('./routes/session'))
//localhose: 300/api/login/

app.use('/api/test', function(req, res) {
	res.send("Hello world")
})

app.listen(3000, function() {
	console.log("app is open on 3000!")
})


//this file pulls in express and the headers.js file. it also gives response to the api/test url.
//when server open it shows app open



