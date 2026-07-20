import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-primary selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content Routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/admissions" element={<Navigate to="/#contact" replace />} />
            <Route path="/academics" element={<Navigate to="/#academics" replace />} />
            <Route path="/facilities" element={<Navigate to="/#facilities" replace />} />
            <Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Footer Bar */}
        <Footer />
      </div>
    </Router>
  );
}
