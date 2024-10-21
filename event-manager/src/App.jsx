import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageOne from './components/PageOne'; // Adjust the path based on your file structure
import PageTwo from './components/PageTwo'; // Adjust the path based on your file structure
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import EventCreation from './components/EventCreation';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PageOne />} />
      <Route path="/page-two" element={<PageTwo />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-event" element={<EventCreation />} />
    </Routes>
  </Router>
);

export default App;
