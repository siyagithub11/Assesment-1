// import { Typography } from '@mui/material';
// import dayjs from 'dayjs';
// import moment from 'moment'; // Import moment to resolve the error
// import React, { useEffect, useMemo, useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useLocation } from 'react-router-dom';

// // Initialize moment localizer
// const localizer = momentLocalizer(moment);

// const ColoredDateCellWrapper = ({ children }) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       backgroundColor: 'lightblue',
//     },
//   });

// function CarScheduleCalendar() {
//   const [events, setEvents] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [planType, setPlanType] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       const response = await fetch('http://localhost:5000/api/schedules');
//       const data = await response.json();

//       const formattedEvents = data.map((schedule, index) => ({
//         id: index,
//         title: schedule?.title || 'Cleaning',
//         start: new Date(schedule.startDate),
//         end: new dayjs().add(schedule.schedule.length, 'day').$d,
//         allDay: true,
//         type: schedule.type // Add this to use in eventStyleGetter
//       }));
//       setEvents(formattedEvents);
//     };

//     fetchSchedules();
//   }, []);

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const date = query.get('date');
//     const plan = query.get('plan');

//     if (date) {
//       setSelectedDate(new Date(date));
//     }
//     if (plan) {
//       setPlanType(plan);
//     }
//   }, [location.search]);

//   const eventStyleGetter = (event) => {
//     let backgroundColor = event.completed ? '#A9A9A9' : '';

//     if (event.type === 'Interior') {
//       backgroundColor = '#FF5733';
//     } else if (event.type === 'Exterior') {
//       backgroundColor = '#33FF57';
//     }

//     if (selectedDate && moment(event.start).isSame(selectedDate, 'day')) {
//       backgroundColor = '#FFD700'; // Highlight color for selected date
//     }

//     const style = {
//       backgroundColor,
//       borderRadius: '5px',
//       color: 'white',
//       border: '0px',
//       display: 'block',
//     };
//     return {
//       style,
//     };
//   };

//   const { components, defaultDate } = useMemo(() => ({
//     components: {
//       timeSlotWrapper: ColoredDateCellWrapper,
//     },
//     defaultDate: new Date(2024, 12, 18),
//   }), []);

//   return (
//     <div className="min-h-screen p-4">
//       <Typography variant="h4" className="text-black text-center mb-4">
//         Car Cleaning Schedule
//       </Typography>

//       <Calendar
//         localizer={localizer}
//         components={components}
//         events={events}
//         defaultView='month'
//         style={{ height: '1000px' }}
//         views={['month', 'week', 'day']}
//         eventPropGetter={eventStyleGetter}
//         showAllEvents
//         timeslots={4}
//         showWeekNumbers
//       />
//     </div>
//   );
// }

// export default CarScheduleCalendar;

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function CarScheduleCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await fetch('http://localhost:5000/api/subscriptions');
      const data = await response.json();

      const formattedEvents = data.map((subscription, index) => ({
        id: index,
        title: subscription.title,
        start: new Date(subscription.startDate),
        end: new Date(new Date(subscription.startDate).getTime() + (60 * 60 * 1000)), 
        extendedProps: {
          carType: subscription.carType,
          planType: subscription.planType,
          timeSlot: subscription.timeSlot,
        }
      }));
      setEvents(formattedEvents);
    };

    fetchSubscriptions();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
  };

  // Function to clear the selected date
  const clearSelection = () => {
    setSelectedDate(null); // Clear the selected date
  };

  return (
    <div className="min-h-screen mx-8">
      <h4 className="text-2xl font-bold text-center mb-4">Car Cleaning Schedule</h4>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          alert('Event: ' + info.event.title);
        }}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        views={{
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'long' }
          }
        }}
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>
            <p>Car Type: {eventInfo.event.extendedProps.carType}</p>
            <p>Plan Type: {eventInfo.event.extendedProps.planType}</p>
            <p>Time: {eventInfo.event.extendedProps.timeSlot}</p>
          </div>
        )}
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        eventTextColor="#000000"
        className="calendar-container "
      />
    
      {selectedDate && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md text-center">
          <p className="text-lg text-gray-700">
            Selected Date: <b>{selectedDate}</b>
          </p>
          <button
            onClick={clearSelection} // Use the clearSelection function here
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}

export default CarScheduleCalendar;