import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Footer from './components/Footer';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/main-dashboard');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Hero 
        onGetStarted={handleGetStarted}
        onLogin={handleLogin}
      />
      <Features />
      <Stats />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
};

export default Landing;
