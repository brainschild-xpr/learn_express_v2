require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const expr_hdbr = require('express-handlebars')



const PORT = 5000
const mongoUri = process.env.DB_Uri
const dbSubscribers = process.env.DB_subscribers
const dbPhotos = process.env.DB_photos

const db_photos_url = mongoUri + dbPhotos
const db_subscribers_url = mongoUri + dbSubscribers

const app = express()
const db = mongoose.connection

db.on('error', (err) => {
    console.error('Error Occured:', err);
})
// db.once('open', () => console.log('Database Connected and Started. DBName:', dbSubscribers))

mongoose.connect(db_subscribers_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.error('Connection Error:', err);
    } else {
        console.log('Database Connected Succesfully. DB Name:', dbSubscribers);
    }
})

mongoose.connect(db_photos_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.error('Connection Error:', err);
    } else {
        console.log('Database Connected Succesfully. DB Name:', dbPhotos);
    }
})

app.use(express.json())

const main_layout = path.join(__dirname, 'views/main_layout')

app.engine('handlebars', expr_hdbr({
    defaultLayout: 'main',
    layoutsDir: main_layout
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    res.render('home')
})

const subscribersRouter = require('./routes/subscribers.route')
app.use('/subscribers', subscribersRouter)

const photosRouter = require('./routes/photos.route')
app.use('/photos', photosRouter)

app.listen(PORT, function () {
    console.log('Server Started on Port:', PORT);
})