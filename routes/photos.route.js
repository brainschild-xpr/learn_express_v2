const express = require('express')
const router = express.Router()
const path = require('path')
const expr_hdbr = require('express-handlebars')

const main_layout = path.join(__dirname, '../views/main_layout')
console.log(main_layout);

const app = express()

app.engine('handlebars', expr_hdbr({
    defaultLayout: 'main',
    layoutsDir: main_layout
}))
app.set('view engine', 'handlebars')

router.get('/test', function (req, res) {
    res.render('home')
})

// '.views/main_layout')
Photo = require('../models/photos.model')

// Getting all Subscribers
router.get('/', async (req, res) => {
    try {
        //   res.send('You have reached the Photos page')
        const photos = await Photo.find()
        console.log(photos);
        const parse = photos[0]
        const one = {
            _id: '923',
            title: 'Yonko Kaido vs Luffy',
            url: 'https://res.cloudinary.com/daluwid/image/upload/v1541146124/one-piece-cover-923.png',
            url_2: '',
            subscribeDate: '2020-01-22T20:23:22.330Z',
            __v: '0'
        }
        // res.json(photos)
        res.render('home', { photos: one })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


})

// Getting one Photo
router.get('/:id', getPhoto, (req, res) => {
    console.log('\nRunning from GET/:id');

    console.log({
        'Fetched with ID': res.photo._id,
        'JSON DOC Fetched': res.photo
    });
    // res.json(res.photo)
    res.send(
        {
            'id': res.photo.id,
            'title': res.photo.title,
            'url': res.photo.url,
            // 'Date of Subscription': res.subscriber.subscribeDate

        })
})

// Creating one

router.post('/', async (req, res) => {
    const photo = new Photo({
        // _id_id: req.photo._id_id,
        _id: req.body._id,
        title: req.body.title,
        url: req.body.url,
        url_2: req.body.url_2,

    })
    try {
        const newPhoto = await photo.save()
        res.status(201).json(newPhoto)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Function for GetSubscribers
async function getPhoto(req, res, next) {
    let photo
    try {
        photo = await Photo.findById(req.params.id)
        if (photo == null) {
            console.log('DOC ID was available but is inexistent at the the moment');

            return res.status(404).json({ message: 'Cannot find photo' })
        }
        console.log('getPhoto Ran');
    } catch (error) {
        console.log('Error with ID Passed: Maybe incorrect', req.params.id)
        return res.status(500).json({ message: error.message })
    }
    res.photo = photo
    // console.log('Let', subscriber);
    // console.log('Res', res.subscriber);

    next()

}

module.exports = router