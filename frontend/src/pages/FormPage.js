import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [carType, setCarType] = useState('');
  const [planType, setPlanType] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title: `${carType} Cleaning`, carType, planType, startDate, timeSlot };

    try {
      const response = await fetch('http://localhost:5000/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to submit');
      }

     const result = await response.json();
     console.log(result);
      alert('Subscription created successfully!');
      navigate(`/CarScheduleCalendar?date=${startDate.toISOString().split('T')[0]}&plan=${planType}`);


    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 md:p-10 w-full max-w-md">
        <h1 className="xl:text-[28px] text-[20px] font-semibold text-gray-200  text-center">Car Subscription Scheduler</h1>
        <hr className="border-neutral-50 my-5" />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-200 text-[17px]">Car Type</label>
            <select
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              className="bg-slate-800 text-white border border-neutral-300 p-2 mt-1 rounded focus:outline-none  focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Car Type</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="CSUV">CSUV</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-[17px]">Plan Type</label>
            <select
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
              className="bg-slate-800 text-white border border-neutral-300 p-2 mt-1 rounded focus:outline-none  focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Plan</option>
              <option value="Daily">Daily</option>
              <option value="Alternate">Alternate</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-[17px]">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full bg-slate-800 text-white border border-neutral-300 p-2 mt-1 rounded focus:outline-none  focus:ring focus:border-blue-300"
              required
              minDate={startDate}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 text-[17px]">Time Slot</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="bg-slate-800 text-white border border-neutral-300 p-2 mt-1 rounded focus:outline-none  focus:ring focus:border-blue-300"
              required
            >
              <option value="">Select Time Slot</option>
              <option value="6-8 AM">6-8 AM</option>
              <option value="8-10 AM">8-10 AM</option>
              <option value="10-12 AM">10-12 AM</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-slate-800 text-white border border-neutral-300 py-2 rounded hover:bg-slate-700 transition w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;