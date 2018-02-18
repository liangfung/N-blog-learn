const express = require('express')
const app = express()
const indexRouter = require('./routers/index')
const userRouter = require('./routers/user')

app.use('/', indexRouter)
app.use('/users', userRouter)
app.listen(3000)