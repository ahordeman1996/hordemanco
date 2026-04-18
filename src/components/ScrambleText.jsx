import React, { useState, useRef, useEffect } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, as: Component = 'span', className = '' }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  
  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => prev.split('').map((letter, index) => {
        if(index < iteration) {
          return text[index];
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      
      if(iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2; // Increased reveal speed (was 1/3)
    }, 20); // Faster tick rate (was 30ms)
  };
  
  const reset = () => {
    clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Attach event listeners to the closest interactive wrapper block, falling back to the direct parent.
    const target = el.closest('.interactive') || el.parentElement;
    
    if (target) {
      target.addEventListener('mouseenter', scramble);
      target.addEventListener('mouseleave', reset);
      target.addEventListener('touchstart', scramble);
      
      return () => {
        target.removeEventListener('mouseenter', scramble);
        target.removeEventListener('mouseleave', reset);
        target.removeEventListener('touchstart', scramble);
      };
    }
  }, [text]);
  
  return (
    <Component 
      ref={containerRef}
      className={className} 
    >
      {displayText}
    </Component>
  );
}
