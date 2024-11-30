import React, { useEffect, useState } from 'react';

function SchedulePage() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await fetch('http://localhost:5000/api/subscriptions');
      const data = await response.json();
      setSubscriptions(data);
    };
    fetchSubscriptions();
  }, []);

  // Separate the subscriptions based on the plan type
  const dailySubscriptions = subscriptions.filter(sub => sub.planType === 'Daily');
  const alternateSubscriptions = subscriptions.filter(sub => sub.planType === 'Alternate');

  return (
    <div className="flex flex-col md:flex-row items-start justify-center bg-slate-700 p-5">
      {/* Daily Plan Table */}
      <div className="bg-gray-800 shadow-xl rounded-lg m-4 p-4 w-full md:w-1/2 flex-grow">
        <h2 className="text-gray-200 text-[24px] font-semibold text-center mb-4">Daily Plan Schedule</h2>
        <table className="table-auto w-full text-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Car Type</th>
              <th className="border px-4 py-2">Time Slot</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {dailySubscriptions.map((sub, index) =>
              sub.schedule.map((scheduleEntry, i) => (
                <tr key={`${index}-${i}`}>
                  <td className="border px-4 py-2">{new Date(scheduleEntry.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{scheduleEntry.type}</td>
                  <td className="border px-4 py-2">{sub.carType}</td>
                  <td className="border px-4 py-2">{sub.timeSlot}</td> {/* New data */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    
      {/* Alternate Plan Table */}
      <div className="bg-gray-800 shadow-xl rounded-lg m-4 p-4 w-full md:w-1/2 flex-grow">
        <h2 className="text-gray-200 text-[24px] font-semibold text-center mb-4">Alternate Plan Schedule</h2>
        <table className="table-auto w-full text-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Car Type</th>
              <th className="border px-4 py-2">Time Slot</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {alternateSubscriptions.map((sub, index) =>
              sub.schedule.map((scheduleEntry, i) => (
                <tr key={`${index}-${i}`}>
                  <td className="border px-4 py-2">{new Date(scheduleEntry.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{scheduleEntry.type}</td>
                  <td className="border px-4 py-2">{sub.carType}</td>
                  <td className="border px-4 py-2">{sub.timeSlot}</td> {/* New data */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SchedulePage;