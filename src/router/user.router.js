const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// const { ObjectID } = require('mongodb')

const router = express.Router()
User = require('../models/user.model')

// router.post('/login', async (req, res) => {
//     const user = new User({
//         email: req.body.email,
//         password: req.body.password
//     })
//     console.log(user)

//     try {
//         const newSubscriber = await user.save()
//         res.status(201).json(newSubscriber)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })


// const authenticate = require('../middleware/auth')

router.post('/login', async (req, res) => {

    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({ ErrorMessage: error })
        }
        else {
            const user = new User({
                email: req.body.email,
                password: hash
            })

            user.save()
                .then(result => {
                    console.log('Result:', result)
                    res.status(200).json({
                        message: 'User Created Succesfully',
                        result: result
                    })
                })
                .catch(error => {
                    console.log('Error', error)
                    res.status(500).json({
                        message: 'Error Creating User',
                        error: error
                    })
                }
                );
        }
    })


})

module.exports = router