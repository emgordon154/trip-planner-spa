const express = require('express')
const app = express()
const path = require('path')

const morgan = require('morgan')

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, '..', '/public')))

app.use(require('./routes'))

app.use((req,res,next) => {
  var err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use( (err, req, res, next) => {
  res.status(err.status || 500)
  console.error(err)
  res.send(
    err.message || 'Internal Error'
  )
})

var port = 3000;
app.listen(port, () => {
  console.log("The server is listening on port ", port)
})