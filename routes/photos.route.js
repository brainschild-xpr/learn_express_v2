const express = require('express')
const router = express.Router()

// Getting all Subscribers
router.get('/', async (req, res) => {
    try {
      res.send('You have reached the Photos page')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  
  
  })

module.exports = router