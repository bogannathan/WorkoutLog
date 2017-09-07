require('dotenv').config()
const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const sequelize = require('./db')

const User = sequelize.import('./models/user')

User.sync() 
// User.sync({force:true})

app.use(bodyParser.json()) 
// this needs to be in front of other app.use. it must jsonify 
//so that other functions can use json objects.
//the other files that use req.body.... use json objects. 
app.use(require('./middleware/headers'))
app.use(require('./middleware/validate-session'))
app.use('/api/user', require('./routes/user'))
app.use('/api/login', require('./routes/session'))
app.use('/api/definition', require('./routes/definition'))
app.use('/api/test', function(req, res) {
	res.send("Hello world")
})

app.listen(3000, function() {
	console.log("app is open on 3000!")
})


//this file pulls in express and the headers.js file. it also gives response to the api/test url.
//when server open it shows app open



