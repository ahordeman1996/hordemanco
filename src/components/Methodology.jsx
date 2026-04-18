import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
  {
    step: '01',
    title: 'CORE DISCOVERY',
    desc: 'Every solution begins with deep alignment. We identify the specific needs of your business to establish the "DNA" of the project—ensuring the narrative and goals are hardcoded into every future decision.'
  },
  {
    step: '02',
    title: 'INVISIBLE ARCHITECTURE',
    desc: 'We design immersive, purpose-driven systems that feel natural to the end user. By balancing high-end aesthetics with intuitive functionality, we build a custom-tailored environment where the complexity remains hidden behind a seamless experience.'
  },
  {
    step: '03',
    title: 'UNIFIED DEPLOYMENT',
    desc: 'True identity is found in consistency. We implement your vision across all mediums with absolute cohesion, ensuring that every touchpoint feels like a deliberate part of the same world we established at the start.'
  }
];

export default function Methodology() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        let amountToScroll = containerRef.current.scrollWidth - window.innerWidth;

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            end: () => '+=' + amountToScroll
          }
        });

        // Translate the entire container instead of individual sections for reliability
        tl.to(containerRef.current, {
          x: -amountToScroll,
          ease: 'none'
        }, 0);

        // SVG Draw Animation embedded in the same timeline!
        tl.fromTo('.wolf-path',
          { strokeDasharray: 1000, strokeDashoffset: 1000 },
          { strokeDashoffset: 0, ease: 'none' },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative h-[100dvh] w-full bg-hc-black text-hc-white overflow-hidden border-t border-hc-white/10">

      {/* Background Absolute SVG element spanning the whole pinned container */}
      <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
        <img src="/assets/wolf.svg" alt="Wolf Protocol Render" className="w-[80vw] h-[80vw] filter invert opacity-50" />
      </div>

      {/* Main Container for Horizontal Layout */}
      <div ref={containerRef} className="absolute top-0 left-0 h-full flex z-10 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar w-full md:w-max md:flex-nowrap md:overflow-hidden md:snap-none">

        {protocols.map((protocol, index) => (
          <div key={index} className="protocol-panel w-full shrink-0 h-full flex items-center justify-center px-6 md:px-24 snap-center relative md:w-[100vw]">

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-24 items-center">

              {/* Massive Step Indicator */}
              <div className="flex flex-col items-start text-hc-white/20">
                <p className="font-mono text-xs uppercase tracking-[0.4em] mb-4 text-hc-red">PROTOCOL STAGE</p>
                <h3 className="font-heading text-[8rem] md:text-[12rem] leading-none tracking-tighter">
                  {protocol.step}
                </h3>
              </div>

              {/* Content text */}
              <div className="flex flex-col gap-6 w-full max-w-[85vw] mx-auto md:max-w-none">
                <h4 className="font-heading text-3xl md:text-6xl uppercase tracking-tight text-hc-white">
                  {protocol.title}
                </h4>
                <div className="w-12 h-1 bg-hc-red"></div>
                <p className="font-mono text-sm md:text-lg text-hc-white/60 leading-relaxed uppercase tracking-widest mt-4">
                  {protocol.desc}
                </p>
              </div>

            </div>

            {/* Mobile swipe indicator on first panel */}
            {index === 0 && (
              <div className="absolute bottom-16 md:hidden left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                <span className="font-mono text-xs uppercase tracking-widest text-hc-white">Swipe Next</span>
                <span className="text-xl">→</span>
              </div>
            )}

          </div>
        ))}

      </div>

      {/* Utility to hide standard scrollbar on mobile horizontal scrolling while keeping functionality */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

    </section>
  );
}
