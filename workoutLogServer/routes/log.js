let router = require('express').Router()
let sequelize = require('../db')
let Log = sequelize.import('../models/log')
let User = sequelize.import('../models/user')
let Definition = sequelize.import('../models/definition')

router.post('/', function(req, res) {
	//REQ HAS SOME BODY PROPERTIES THAT HAVE A USERNAME AND PWD
	let description = req.body.log.description
	let result = req.body.log.result
	let user = req.user
	let definition = req.body.log.def 

	//use our sequelize model to create a log 
	Log
		.create({
			description: descrioption,
			result: result,
			owner: user.id,
			def: definition 
		})
		.then(
			function createSuccess(log) {
				res.json(log)	
			},
			function createError(err) {
					res.send(500, err.message)
			}
		)
})

router.get('/', function(req, res) {
	let userid = req.user.id
	Log
	.findAll({
		where: {owner: userid}
	})
	.then(
		function findAllSuccess(data) {
			console.log(data)
			res.json(data)
		},
		function findAllError(err) {
			res.send(500, err.message)
		}
	)
})

module.exports = router