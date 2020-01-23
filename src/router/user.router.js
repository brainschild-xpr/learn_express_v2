const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
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


const authenticate = require('../middleware/auth.middle')

// Getting all Subscribers
router.get('/all', async (req, res) => {
    try {
        //   res.send('You have reached the Photos page')
        const user = await User.find({})
        console.log(user.email);
        res.json(user)
        // res.send({
        //     'email': user.email
        // })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }


})


// Getting one Photo
router.get('/:id', getUser, (req, res) => {
    console.log('\nRunning from GET/:id');

    console.log({
        'Fetched with ID': res.user._id,
        'JSON DOC Fetched': res.user
    });
    // res.json(res.user)
    res.send(
        {
            'id': res.user.id,
            'email': res.user.email,
            'createdOn': res.user.userCreatedDate
            // 'password': res.user.password,
            // 'Date of Subscription': res.subscriber.subscribeDate

        })
})

router.post('/register', async (req, res) => {
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
                        // result: result
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

router.post('/login', comparePass, authenticate, async (req, res, next) => {
    console.log('Generated Auth Token\n\n', res.genToken);

})

// Deleting one
router.delete('/:id', getUser, async (req, res) => {
    console.log('\nRunning from DELETE/:id');

    console.log({
        'Will be deleting DOC with ID': res.user._id,
        'JSON DOC To Be Deleted': res.user
    });
    try {
        await res.user.remove()
        res.json({ message: 'user Deleted' })
        console.log('DOCUMENT DELETED');
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Updating one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {

        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                return res.status(500).json({ ErrorMessage: error })
            }
            res.user.password = hash
            console.log(res.user.password);

            try {
                const updatedUser = await res.user.save()
                res.json(updatedUser)
                console.log(updatedUser);

            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        })
    }

})

// Function for getUsers
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            console.log('DOC ID was available but is inexistent at the the moment');
            return res.status(404).json({ message: 'Cannot find user' })
        }
        console.log('getUser Ran');
    } catch (error) {
        console.log('Error with ID Passed: Maybe incorrect', req.params.id)
        return res.status(500).json({ message: error.message })
    }
    res.user = user
    next()
}
// Function for Comparing User PassWord
async function comparePass(req, res, next) {
    try {
        authUser = await User.find({ email: req.body.email })
        if (authUser < 1) {
            return res.status(401).json({ message: 'Generating Token Failed' })
        }
        bcrypt.compare(req.body.password, authUser[0].password, async (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            if (result) {
                let genToken
                const finalToken = jwt.sign(
                    {
                        email: authUser[0].email,
                        UserId: authUser[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )
                res.status(200).json({
                    message: 'Generated Auth Token ',
                    token: finalToken
                })
                res.genToken = finalToken
                next()
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = router