let router = require('express').Router()
let sequelize = require('../db.js')
let User = sequelize.Import('../models/user.js')
let Definition = sequelize.Import('../models/definition.js')

router.post('/', function(req, res) {
	//variables
	let description = req.body.definition.desc
	let logType = req.body.definition.type 
	let owner = req.user.id

	//methods
	Definition
		.create({
			description: description,
			logType: logType,
			owner: owner
		})
		.then(
			function createSuccess(definition) {
				//send a response as json
				res.json({
					definition: definition,
				})
			},
			function createError(err) {
				res.send(500, err.message)
			}
		)
})

router.get('/', function(req, res) {
	//user variable
	let userid = req.user.id
	Definition
		.findAll({
			where: {owner: userid}
		})
		.then(
			//success
			function findAllSuccess(data) {
				//console.log(data)
				res.json(data)
			},
			//failure
			function findAllError(err {
				res.send(500, err.message)
			})
		)
})

module.exports = router