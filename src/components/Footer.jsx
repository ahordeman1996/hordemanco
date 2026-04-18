import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram } from 'lucide-react';

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-hc-black text-hc-white pt-24 rounded-t-[4rem] relative z-20 mt-[-4rem] overflow-hidden flex flex-col justify-between">
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 mb-24">
        
        {/* Contact Info */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <p className="font-mono text-sm opacity-60 max-w-sm">
            Ready to build your universe?
          </p>
          <a href="mailto:alexander@hordeman.com" className="font-heading text-3xl md:text-5xl text-hc-white hover:text-hc-red transition-colors inline-block w-fit link-hover">
            alexander@hordeman.com
          </a>
          
          <div className="mt-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-hc-white/50 bg-hc-white/5 w-fit px-4 py-2 rounded-full border border-hc-white/10 group">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_8px_2px_rgba(0,255,65,0.6)]"></span>
            System Operational
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-8 flex flex-col gap-4 font-mono text-sm">
          <h4 className="text-hc-white/40 mb-4 tracking-widest text-xs">navigation</h4>
          <Link to="/work" onClick={(e) => handleLinkClick(e, '/work')} className="hover:text-hc-red transition-colors w-fit link-hover">Work</Link>
          <Link to="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-hc-red transition-colors w-fit link-hover">About</Link>
          <Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-hc-red transition-colors w-fit link-hover">Contact</Link>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4 font-mono text-sm">
          <h4 className="text-hc-white/40 mb-4 tracking-widest text-xs">socials</h4>
          <a href="https://www.instagram.com/hordeman.co" target="_blank" rel="noreferrer" className="text-hc-white hover:text-hc-red transition-colors w-fit flex items-center gap-2">
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 mb-8 pt-8 border-t border-hc-white/10">
        <p className="font-mono text-xs text-hc-white/40">
          &copy; {new Date().getFullYear()} hordeman.co. All rights reserved.
        </p>
        <div className="font-mono text-xs text-hc-white/40 flex gap-4">
          <Link to="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-hc-white transition-colors link-hover">Privacy Policy</Link>
          <Link to="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="hover:text-hc-white transition-colors link-hover">Terms of Service</Link>
        </div>
      </div>

      {/* Massive Bleeding Logo */}
      <div className="relative w-full flex justify-center translate-y-[20%] pointer-events-none pb-0 mb-0">
        <img 
          src="/assets/hordeman.co logo.svg" 
          alt="Hordeman Logo Render" 
          className="w-[150vw] max-w-none"
        />
      </div>

    </footer>
  );
}
