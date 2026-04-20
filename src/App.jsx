import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import Project from './pages/Project';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const transitionRef = useRef(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname && !isTransitioning.current) {
      isTransitioning.current = true;
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
          window.scrollTo(0, 0);

          // Phase 2: Reveal new page
          requestAnimationFrame(() => {
            const outTl = gsap.timeline({
              onComplete: () => {
                isTransitioning.current = false;
                gsap.set('.page-transition-overlay', { display: 'none' });
              }
            });
            outTl.to('.page-transition-overlay', { yPercent: -100, duration: 0.6, ease: 'power3.inOut', delay: 0.2 });
          });
        }
      });

      // Phase 1: Cover screen
      gsap.set('.page-transition-overlay', { display: 'flex', yPercent: 100 });
      
      tl.to('.page-transition-overlay', { yPercent: 0, duration: 0.6, ease: 'power3.inOut' });
    }
  }, [location, displayLocation]);

  return (
    <>
      <div className="flex-1">
        <Routes location={displayLocation} key={displayLocation.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>

      {/* Global Transition Overlay */}
      <div 
        className="page-transition-overlay fixed inset-0 z-[9999] bg-hc-black flex items-center justify-center pointer-events-none"
        style={{ display: 'none' }}
      >
        <div className="absolute inset-0 noise-overlay opacity-30"></div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-hc-black text-hc-white selection:bg-hc-red selection:text-hc-white relative flex flex-col">
        <div className="noise-overlay"></div>
        
        <CustomCursor />
        <Navbar />
        
        <AnimatedRoutes />

        <Footer />
      </div>
    </Router>
  );
}

export default App;


