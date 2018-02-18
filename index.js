const express = require('express')
const app = express()

app.get('/', function(req, res){
  console.log(111)
  res.send('hello world')
})

app.listen(3000)