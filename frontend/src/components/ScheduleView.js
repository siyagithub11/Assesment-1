import React, { useEffect, useState } from 'react';

function ScheduleView() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await fetch('http://localhost:5000/api/subscriptions');
      const data = await response.json();
      setSubscriptions(data);
    };
    fetchSubscriptions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 md:px-4 ">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="md:text-2xl sm:text-xl font-bold mb-4 text-gray-800 text-center">Scheduled Services</h2>
        
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-gray-600">Date</th>
                <th className="px-4 py-2 text-gray-600">Type</th>
                <th className="px-4 py-2 text-gray-600">Car Type</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, index) => (
                sub.schedule.map((scheduleEntry, i) => (
                  <tr key={`${index}-${i}`} className="border-b">
                    <td className="px-4 py-2">{new Date(scheduleEntry.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{scheduleEntry.type}</td>
                    <td className="px-4 py-2">{sub.carType}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ScheduleView;