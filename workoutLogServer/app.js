var express=require('express')
var app=express()

app.use('/api/test', function(req, res) {
	res.send("Hello world")
})

app.listen(3000, function() {
	console.log("app is open on 3000!")
})