const express = require('express')
const router = express.Router()
const { checkLogin } = require('../middleware/checkLogin')

router.get('/', function(req, res){
	res.send('主页')
})
router.post('/create', checkLogin, function(req, res){
	res.send('发表文章')
})
