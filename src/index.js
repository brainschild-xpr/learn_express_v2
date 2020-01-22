require('dotenv').config()
require('./db/mongoose');

const express = require('express')
const app = express();

const userRoute = require('./router/user.router')
const postRoute = require('./router//post.router')

const port = process.env.PORT

app.use(express.json())
app.use(userRoute)
app.use(postRoute)

app.listen(port, () => {
    console.log('server is up on ' + port);
})