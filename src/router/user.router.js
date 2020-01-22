const express     = require('express');
const router      =  new express.Router()
const User        = require('../models/user.model')
const {ObjectID}  = require('mongodb')

router.post('/users', async (req,res) => {
    const user = new User(req.body);
    try{
        const token = await user.newAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router