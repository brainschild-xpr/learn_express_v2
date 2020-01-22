const express = require('express')
const router = express.Router()
Subscriber = require('../models/subscriber.model')

// Getting all Subscribers
router.get('/', async (req, res) => {
  try {
    // res.send('You have reached the Subcribers page')
    const subscribers = await Subscriber.find()
    console.log(subscribers);
    res.json(subscribers)
    
    
  } catch (error) {
    // console.error();
    res.status(500).json({ message: error.message })
  }


})
// Getting one Subscriber
router.get('/:id', getSubscriber, (req, res) => {
  console.log('\nRunning from GET/:id');
  
  console.log({
    'Fetched with ID': res.subscriber._id,
    'JSON DOC Fetched':res.subscriber});
  res.json(res.subscriber)
  // res.send(
  //   {
  //     'Record Id': res.subscriber._id,
  //     'Channel': res.subscriber.subscribedToChannel,
  //     'Subscriber': res.subscriber.name,
  //     'Date of Subscription': res.subscriber.subscribeDate

  //   })
})
// Creating one

router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating one
router.patch('/:id', getSubscriber, (req, res) => {

})
// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  console.log('\nRunning from DELETE/:id');
  
  console.log({
    'Will be deleting DOC with ID': res.subscriber._id,
    'JSON DOC To Be Deleted':res.subscriber});
try {
  await res.subscriber.remove()
  res.json({message: 'Subscriber Deleted'})
  console.log('DOCUMENT DELETED');
} catch (error) {
  res.status(500).json({message: error.message})
}
})

// Function for GetSubscribers
async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      console.log('DOC ID was available but is inexistent at the the moment');

      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
    console.log('getSubscriber Ran');
  } catch (error) {
    console.log('Error with ID Passed: Maybe incorrect', req.params.id)
    return res.status(500).json({ message: error.message })
  }
  res.subscriber = subscriber
  // console.log('Let', subscriber);
  // console.log('Res', res.subscriber);

  next()

}

module.exports = router