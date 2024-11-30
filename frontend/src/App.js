


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './pages/FormPage';
import SchedulePage from './pages/SchedulePage';
import CarScheduleCalendar from './pages/CarScheduleCalendar';


function App() {
  return (
    <Router>
      <Routes>
        {/* Root route displays the form */}
        <Route path="/" element={<FormPage />} />

        {/* Schedule route displays the schedule */}
        <Route path="/schedule" element={<SchedulePage />} />

        <Route path="/carScheduleCalendar" element={<CarScheduleCalendar />} />

      </Routes>
    </Router>
  );
}

export default App;