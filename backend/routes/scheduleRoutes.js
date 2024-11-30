const express = require('express');
const router = express.Router();
const { getSchedules } = require('../controllers/schedulesController');

router.get('/', getSchedules);

module.exports = router;
//const express = require('express');
//const router = express.Router();
//const { getSchedules, createSubscription } = require('../controllers/subscriptionController');

//router.get('/schedules', getSchedules);
//router.post('/subscriptions', createSubscription);

//module.exports = router;