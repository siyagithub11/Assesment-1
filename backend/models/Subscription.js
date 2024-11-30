
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  title: { type: String },
  carType: { type: String, required: true },
  planType: { type: String, required: true },
  startDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  schedule: { type: [Object], default: [] },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;

// const mongoose = require('mongoose');

// const SubscriptionSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   carType: { type: String, required: true },
//   planType: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   timeSlot: { type: String, required: true },
//   schedule: [
//     {
//       date: { type: Date, required: true },
//       type: { type: String, required: true },
//       time: { type: String, required: true },
//     }
//   ]
// });

// module.exports = mongoose.model('Subscription', SubscriptionSchema);