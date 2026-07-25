import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { SchoolContext } from './context/SchoolContext';
import logoImg from './assets/logo.png';

// Page Imports
import Home from './pages/Home';
import Login from './pages/Login';

// ── Splash / Loading Screen ──────────────────────────────────────────────────
function SplashScreen() {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#ffffff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '20px',
      }}
    >
      {/* Animated glowing orb behind logo */}
      <div style={{
        position: 'absolute', width: '280px', height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        animation: 'pulse-glow 2s ease-in-out infinite',
      }} />

      {/* Logo Image */}
      <div style={{
        zIndex: 1,
        animation: 'scale-in 0.5s ease-out',
      }}>
        <img 
          src={logoImg} 
          alt="A B Public School Logo" 
          style={{ width: '130px', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* School Name */}
      <div style={{ textAlign: 'center', zIndex: 1, animation: 'fade-up 0.6s ease-out 0.2s both' }}>
        <div style={{
          fontSize: '1.5rem', fontWeight: '800', color: '#0f172a',
          fontFamily: 'Poppins, Inter, sans-serif', letterSpacing: '-0.5px',
          textTransform: 'uppercase',
        }}>
          A B Public School
        </div>
        <div style={{
          fontSize: '0.78rem', fontWeight: '600', color: '#2563eb',
          letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '4px',
        }}>
          Empowering Young Minds
        </div>
      </div>

      {/* Loading dots */}
      <div style={{
        display: 'flex', gap: '8px', marginTop: '4px', zIndex: 1,
        animation: 'fade-up 0.6s ease-out 0.4s both',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#2563eb',
            animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes scale-in {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-up {
          from { transform: translateY(12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { loading } = useContext(SchoolContext);

  // Show splash until backend data is fully loaded
  if (loading) return <SplashScreen />;

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
