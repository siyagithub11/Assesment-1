
// const express = require('express');
// const router = express.Router();
// const Subscription = require('../models/subscription');
// const generateSchedule = require('../utils/scheduler');

// // Create a subscription
// router.post('/', async (req, res) => {
//   const { carType, planType, startDate } = req.body;
//   try {
//     const schedule = generateSchedule(planType, startDate);
//     const newSubscription = new Subscription({ carType, planType, startDate, schedule });
//     await newSubscription.save();
//     res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating subscription', error });
//   }
// });

// // Fetch all subscriptions
// router.get('/', async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find();
//     res.status(200).json(subscriptions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching subscriptions', error });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createSubscription, getSubscriptions } = require('../controllers/subscriptionController');

// Create a subscription
router.post('/', createSubscription);
 
// Fetch all subscriptions
router.get('/', getSubscriptions);

module.exports = router;