var express=require('express')
var app=express()
var bodyParser = require('body-parser')

app.use(require('./middleware/headers'))

app.use('/api/test', function(req, res) {
	res.send("Hello world")
})

app.listen(3000, function() {
	console.log("app is open on 3000!")
})


//this file pulls in express and the headers.js file. it also gives response to the api/test url.
//when server open it shows app open



var Sequelize = require('sequelize')
var sequelize = new Sequelize('workoutlog', 'postgres', '*Crumismyfuture17', {
	host: 'localhost', 
	dialect: 'postgres'
})

sequelize. authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db')
	},
	function(err){
		console.log(err)
	}
)

var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
})


//creates the table in postgres
//matches the model we defined
//doesn't drom the db

User.sync()
// DANGER THIS WILL DROP THE TABLEEEEEEEEEEEEEEEE
//User.sync({force:true})
//
app.use(bodyParser.json())

app.post('/api/user', function(req, res) {
	// when we post to api user, it will want a user object in the body
	var username = req.body.user.username
	var pass = req.body.user.password  //to do: hash this password
	//need to create a user object and use sequelize to put that user into our database
	//needs to match the model above (the username password)
	User.create({
		username: username,
		passwordhash: ""
}).then(
			//sequelize is going to return the object it created from db
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			})		
		},
		function createError(err){
			res.send(500, err.message)
		}
)
})