const jwt = require('jsonwebtoken')
// const User = require('../models/user.model')

module.exports = (req, res, next) => {
    try {
        console.log('\nAuthentication Called\n');
        const bodyToken = res.genToken
        console.log('Token from ComparePass Function:     ',bodyToken);
        console.log('');
        
        // const rawToken = req.headers.authorization
        // console.log('RawToken From Header:', rawToken)
        // const token = rawToken.split(" ")[1]
        // console.log('\nExtracted Useable Token:', token);

        const decoded = jwt.verify(bodyToken, process.env.JWT_KEY)
        req.userData = decoded

        console.log('Successfully Decoded:', decoded);

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed Why?',
            error: error
        })
    }
}