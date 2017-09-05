var express=require('express')
var app=express()
var bodyParser = require('body-parser')
var sequelize = require('./db')
var User = sequelize.import('./models/user')

User.sync() //User.sync({force:true})

app.use(bodyParser.json())

app.use(require('./middleware/headers'))

app.use('/api/test', function(req, res) {
	res.send("Hello world")
})

app.listen(3000, function() {
	console.log("app is open on 3000!")
})


//this file pulls in express and the headers.js file. it also gives response to the api/test url.
//when server open it shows app open


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
