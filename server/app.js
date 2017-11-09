require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const auth = require('./routes/auth')
// const user = require('./routes/user')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/auth', auth)
// app.use('/api/user', user)

app.listen(3000, ()=>{
  console.log('app running on port 3000');
})
