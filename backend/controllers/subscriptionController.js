



// const Subscription = require('../models/Subscription');

// const generateSchedule = (planType, startDate) => {
//   let schedule = [];
//   let currentDate = new Date(startDate);

//   switch (planType) {
//     // Daily Plan (D): 22 Exteriors, 2 Interiors, and Off days after every 6 services
//     case 'Daily':
//       for (let i = 0; i < 28; i++) {
//         const dayOfWeek = currentDate.getDay();
//         if (dayOfWeek === 0) {
//           schedule.push({ date: new Date(currentDate), type: 'OFF' });
//         } else if (i % 15 === 0) {
//           schedule.push({ date: new Date(currentDate), type: 'INTERIOR' });
//         } else {
//           schedule.push({ date: new Date(currentDate), type: 'EXTERIOR' });
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//       break;

//     // Alternate Plan (A): 10 Exteriors, 2 Interiors, Off days after each service, and 2 consecutive off days after 3 services
//     case 'Alternate':
//       let alternateExteriorCount = 0;
//       let alternateInteriorCount = 0;
//       let alternateServiceCount = 0;
//       let alternateTotalServices = 0;

//       while (schedule.length < 28) {
//         if (alternateServiceCount === 3) {
//           schedule.push({ date: new Date(currentDate), type: 'OFF' }); // First consecutive off day
//           currentDate.setDate(currentDate.getDate() + 1);
//           schedule.push({ date: new Date(currentDate), type: 'OFF' }); // Second consecutive off day
//           currentDate.setDate(currentDate.getDate() + 1);
//           alternateServiceCount = 0; // Reset after consecutive off days
//         } else {
//           // Schedule the first interior cleaning on the start date
//           if (alternateInteriorCount === 0) {
//             schedule.push({ date: new Date(currentDate), type: 'INTERIOR' });
//             alternateInteriorCount++;
//             currentDate.setDate(currentDate.getDate() + 1);
//             alternateServiceCount++;
//             alternateTotalServices++;
//           }
//           // Schedule the second interior cleaning after 6 total services
//           else if (alternateInteriorCount === 1 && alternateTotalServices >= 6) {
//             schedule.push({ date: new Date(currentDate), type: 'INTERIOR' });
//             alternateInteriorCount++;
//             currentDate.setDate(currentDate.getDate() + 1);
//             alternateServiceCount++;
//             alternateTotalServices++;
//           }
//           // Schedule exterior cleanings (maximum of 10)
//           else if (alternateExteriorCount < 10) {
//             schedule.push({ date: new Date(currentDate), type: 'EXTERIOR' });
//             alternateExteriorCount++;
//             currentDate.setDate(currentDate.getDate() + 1);
//             alternateServiceCount++;
//             alternateTotalServices++;
//           }

//           // Schedule an off day after each service
//           if (alternateServiceCount < 3) {
//             schedule.push({ date: new Date(currentDate), type: 'OFF' });
//             currentDate.setDate(currentDate.getDate() + 1);
//           }
//         }
//       }
//       break;

//     default:
//       break;
//   }

//   return schedule;
// };


// // Create a subscription
// exports.createSubscription = async (req, res) => {
//   try {
//     const { title, carType, planType, startDate, timeSlot } = req.body;

//     if (!carType || !planType || !startDate || !timeSlot) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const schedule = generateSchedule(planType, startDate);
//     const subscription = new Subscription({
//       title, carType, planType, startDate, timeSlot, schedule
//     });
//     await subscription.save();
//     res.status(201).json(subscription);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating subscription', error });
//   }
// }; 

// // Get all subscriptions
// exports.getSubscriptions = async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find();
//     res.status(200).json(subscriptions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching subscriptions', error });
//   }
// };



const Subscription = require('../models/Subscription');

// Function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Updated generateSchedule function to include formatted date
const generateSchedule = (planType, startDate, timeSlot) => {
  let schedule = [];
  let currentDate = new Date(startDate);

  switch (planType) {
    // Daily Plan (D): 22 Exteriors, 2 Interiors, and Off days after every 6 services
    case 'Daily':
      for (let i = 0; i < 28; i++) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0) {
          schedule.push({ date: formatDate(currentDate), type: 'OFF', timeSlot });
        } else if (i % 15 === 0) {
          schedule.push({ date: formatDate(currentDate), type: 'INTERIOR', timeSlot });
        } else {
          schedule.push({ date: formatDate(currentDate), type: 'EXTERIOR', timeSlot });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      break;

    // Alternate Plan (A): 10 Exteriors, 2 Interiors, Off days after each service, and 2 consecutive off days after 3 services
    case 'Alternate':
      let alternateExteriorCount = 0;
      let alternateInteriorCount = 0;
      let alternateServiceCount = 0;
      let alternateTotalServices = 0;

      while (schedule.length < 28) {
        if (alternateServiceCount === 3) {
          schedule.push({ date: formatDate(currentDate), type: 'OFF', timeSlot }); // First consecutive off day
          currentDate.setDate(currentDate.getDate() + 1);
          schedule.push({ date: formatDate(currentDate), type: 'OFF', timeSlot }); // Second consecutive off day
          currentDate.setDate(currentDate.getDate() + 1);
          alternateServiceCount = 0; // Reset after consecutive off days
        } else {
          // Schedule the first interior cleaning on the start date
          if (alternateInteriorCount === 0) {
            schedule.push({ date: formatDate(currentDate), type: 'INTERIOR', timeSlot });
            alternateInteriorCount++;
            currentDate.setDate(currentDate.getDate() + 1);
            alternateServiceCount++;
            alternateTotalServices++;
          }
          // Schedule the second interior cleaning after 6 total services
          else if (alternateInteriorCount === 1 && alternateTotalServices >= 6) {
            schedule.push({ date: formatDate(currentDate), type: 'INTERIOR', timeSlot });
            alternateInteriorCount++;
            currentDate.setDate(currentDate.getDate() + 1);
            alternateServiceCount++;
            alternateTotalServices++;
          }
          // Schedule exterior cleanings (maximum of 10)
          else if (alternateExteriorCount < 10) {
            schedule.push({ date: formatDate(currentDate), type: 'EXTERIOR', timeSlot });
            alternateExteriorCount++;
            currentDate.setDate(currentDate.getDate() + 1);
            alternateServiceCount++;
            alternateTotalServices++;
          }

          // Schedule an off day after each service
          if (alternateServiceCount < 3) {
            schedule.push({ date: formatDate(currentDate), type: 'OFF', timeSlot });
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
      }
      break;

    default:
      break;
  }

  return schedule;
};

// Create a subscription
exports.createSubscription = async (req, res) => {
  try {
    const { title, carType, planType, startDate, timeSlot } = req.body;

    if (!carType || !planType || !startDate || !timeSlot) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const schedule = generateSchedule(planType, startDate, timeSlot);
    const subscription = new Subscription({
      title, carType, planType, startDate, timeSlot, schedule
    });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};

// Get all subscriptions
exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};









