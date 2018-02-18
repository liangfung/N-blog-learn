const path = require('path')
const express = require('express')
const app = express()
const indexRouter = require('./routers/index')
const userRouter = require('./routers/user')

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/users', userRouter)
app.listen(3000)