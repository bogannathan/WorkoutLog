var router = require('express').Router()
var sequelize = require('../db.js')
var User = sequelize.import('../models/user')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

router.post('/', function(req, res) {
	// when we post to api user, it will want a user object in the body
	var username = req.body.user.username
	var pass = req.body.user.password  //to do: hash this password
	//need to create a user object and use sequelize to put that user into our database
	//needs to match the model above (the username password)
	User.create({
		username: username,
		passwordhash: bcrypt.hashSync(pass, 10)
	}).then(
			//sequelize is going to return the object it created from db
		function createSuccess(user){
			var token = jwt.sign({id:user.id}, "i_am_secret", {expiresIn: 60*60*24})
			res.json({
				user: user,
				message: 'create',
				sessionToken: token
			})		
		},
		function createError(err){
			res.send(500, err.message)
		}
	)
})

module.exports = router;
