import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Correctly import BrowserRouter, Routes, and Route
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import CollegeHomepage from './Pages/CollegeHomepage/CollegeHomepage';  // Make sure to import the CollegeHomepage component

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="layout-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<CollegeHomepage />} /> {/* Replaced Calendar with CollegeHomepage */}
              {/* Additional routes can be added here */}
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
