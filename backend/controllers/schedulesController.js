const Subscription = require('../models/Subscription');


exports.getSchedules = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
};








