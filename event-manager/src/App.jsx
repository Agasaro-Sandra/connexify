import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageOne from './components/admin/PageOne'; 
import PageTwo from './components/admin/PageTwo'; 
import PageThree from './components/users/PageThree'
import Login from './components/admin/Login';
import SignUp from './components/admin/SignUp';
import Dashboard from './components/admin/Dashboard';
import EventCreation from './components/admin/EventCreation';
import EventUpdate from './components/admin/EventUpdate';
import Register from './components/users/Register';
import Enter from './components/users/Enter';
import LandingPage from './components/users/LandingPage';
import Booking from './components/users/Booking';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PageOne />} />
      <Route path="/page-two" element={<PageTwo />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-event" element={<EventCreation />} />
      <Route path="/edit/:id" element={<EventUpdate />} />
      <Route path="/page-three" element={<PageThree />} />
      <Route path='/register' element={<Register />} />
      <Route path='/enter' element={<Enter />} />
      <Route path='/landing' element={<LandingPage />} />
      <Route path='/booking' element={<Booking />} />
    </Routes>
  </Router>
);

export default App;
