require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const PORT = 3000
const mongoUri = process.env.DB_Uri
const dbSubscribers = process.env.DB_subscribers
const db_subscribers_url = mongoUri + dbSubscribers

const app = express()
const db = mongoose.connection
// const db = mongoose.createConnection(mongoUri, {
//     useNewUrlParser: true
//     // useUnifiedTopology: true
// })

db.on('error', (err) => {
    console.error('Error Occured:', err);
})
db.once('open', () => console.log('Database Connected and Started. DBName:', dbSubscribers))

mongoose.connect(db_subscribers_url, {
    useNewUrlParser: true , 
    useUnifiedTopology: true
}, function(err){
    if (err) {
        console.error('Connection Error:',err);
    }else{
        console.log('Database Connected Succesfully. DB Name:', dbSubscribers );
    }
})

app.use(express.json())

const subscribersRouter = require('./routes/subscribers.route')
app.use('/subscribers', subscribersRouter)

app.listen(PORT, function () {
    console.log('Server Started on Port:', PORT);
})
// require('dotenv').config()

// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')

// mongoose.connect(process.env.DB_Uri, { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

// app.use(express.json())

// const subscribersRouter = require('./routes/subscribers')
// app.use('/subscribers', subscribersRouter)

// app.listen(3000, () => console.log('Server Started'))
