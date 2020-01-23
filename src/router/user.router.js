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


// const authenticate = require('../middleware/auth')

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

router.post('/login', async (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(
            user => {
                if (user.length < 1) {
                    console.log(
                        'Unauthorized'
                    );

                    return res.status(401).json({
                        message: 'Unauthorized'
                    })
                }
                console.log('Hello');
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth Failed'
                        })
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }

                        )
                        return res.status(200).json({
                            message: 'Auth Successful',
                            token: token
                        })
                    }
                    return res.status(401).json({
                        message: 'Auth Failed'
                    })
                })

                // else {
                //     return res.status(201).json({
                //         message: 'User Found'
                //     })
                // }
            }
        )
        .catch(error => {
            res.status(500).json({ message: error.message })
        }
        )
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
    // console.log('Let', subscriber);
    // console.log('Res', res.subscriber);

    next()

}

module.exports = router