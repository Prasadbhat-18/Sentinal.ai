import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-background selection:bg-primary/30 selection:text-primary">
        {/* Navigation could go here */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
