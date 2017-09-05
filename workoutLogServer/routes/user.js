var router = require('express').Router()
var sequelize = require('../db.js')
var User = sequelize.import('../models/user')

router.post('/', function(req, res) {
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

module.exports = router;

