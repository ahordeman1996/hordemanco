import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      
      const onMouseMove = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
        gsap.to(follower, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const onMouseEnter = () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.2 });
        gsap.to(follower, { scale: 1.2, borderColor: 'var(--hc-red)', duration: 0.2 });
      };

      const onMouseLeave = () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { scale: 1, borderColor: 'var(--hc-black)', duration: 0.2 });
      };

      window.addEventListener('mousemove', onMouseMove);
      
      const interactives = document.querySelectorAll('a, button, .interactive');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        interactives.forEach(el => {
          el.removeEventListener('mouseenter', onMouseEnter);
          el.removeEventListener('mouseleave', onMouseLeave);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-hc-red rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-hc-black rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
