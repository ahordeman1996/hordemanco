import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WebDesign({ data }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.web-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.image-reveal',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [data]);

  return (
    <section ref={containerRef} className="w-full pb-48 md:pb-64">

      {/* 1. Context / Issue */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4 web-reveal">
            <h3 className="font-heading text-4xl uppercase tracking-tighter text-hc-white mb-6">01 // Context</h3>
            <div className="w-full h-px bg-hc-red opacity-30"></div>
          </div>
          <div className="md:col-span-8 font-mono text-base md:text-lg text-hc-white/80 leading-relaxed font-light web-reveal whitespace-pre-wrap">
            {data.context}
          </div>
        </div>
      </div>

      {/* Massive Hero Image */}
      {data.images.hero && (
        <div className="w-full max-w-[100rem] mx-auto px-6 mb-24 md:mb-32">
          <div className="w-full relative image-reveal">
            <img src={data.images.hero} alt="Project Hero" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}

      {/* 2. Planning / Preparation - Broken Grid Layout */}
      {data.prep && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-12 web-reveal mb-8">
              <h3 className="font-heading text-4xl uppercase tracking-tighter text-hc-white">02 // Preparation</h3>
            </div>
            <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 font-mono text-lg md:text-xl lg:text-2xl text-hc-white/90 leading-relaxed font-light web-reveal whitespace-pre-wrap">
              <div className="border-l-[3px] border-hc-red pl-8 md:pl-12 py-4">
                {data.prep}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Gallery Item 1 w/ Mobile Overlay Optional */}
      {data.images?.gallery && data.images.gallery[0] && (
        <div className={`max-w-7xl mx-auto px-6 md:px-12 relative ${data.images.mobileOverlay ? 'mb-40 md:mb-64 lg:mb-72' : 'mb-24 md:mb-32'}`}>
          <div className="w-full lg:w-[85%] relative image-reveal z-0">
            <img src={data.images.gallery[0]} alt="Project Gallery 1 Desktop" className="w-full h-auto object-contain border border-hc-white/10 rounded-[1rem] md:rounded-[2rem]" />
          </div>

          {/* Overlapping Mobile Frame */}
          {data.images.mobileOverlay && (
            <div className="absolute -bottom-24 right-0 lg:right-12 z-10 image-reveal transform scale-50 sm:scale-75 md:scale-100 origin-bottom-right">
              <div className="relative w-[390px] h-[844px] drop-shadow-2xl">
                <img src={data.images.mobileOverlay} alt="Project Gallery 1 Mobile" className="absolute inset-0 w-[390px] h-[844px] object-cover rounded-[40px] z-0" />
                <img src="/images/work/phone mockup.webp" alt="Phone Frame" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none max-w-none" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Execution - Asymmetrical Sticky Layout */}
      {data.execution && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32 relative">
          <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
            <div className="md:w-1/3 web-reveal sticky top-32">
              <h3 className="font-heading text-4xl lg:text-5xl uppercase tracking-tighter text-hc-red mb-2">
                {data.prep ? "03 // Execution" : "02 // Execution"}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-hc-white/40 mb-8 border-b border-hc-white/10 pb-4 inline-block">Final Deployment Phase</p>
            </div>
            <div className="md:w-3/5 font-mono text-base md:text-xl text-hc-white/90 leading-relaxed font-light web-reveal whitespace-pre-wrap">
              {data.execution}
            </div>
          </div>
        </div>
      )}

      {/* Remaining Gallery Items */}
      {data.images?.gallery && data.images.gallery.length > 1 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-8 md:gap-16 gap-y-32 md:gap-y-56">
          {data.images.gallery.slice(1).map((img, i) => {
            const isMobile = img.toLowerCase().includes('mobile');
            const mobileClasses = `transform ${i % 2 !== 0 ? 'translate-y-0 md:translate-y-32' : ''} scale-75 sm:scale-100 flex-shrink-0`;
            const desktopClasses = `w-full`;

            return (
              <div key={i} className={`relative image-reveal ${isMobile ? mobileClasses : desktopClasses}`}>
                {isMobile ? (
                  <div className="relative w-[390px] h-[844px] drop-shadow-2xl flex-shrink-0 mx-auto">
                    <img src={img} alt={`Project Execution ${i + 2}`} className="absolute inset-0 w-[390px] h-[844px] object-cover rounded-[40px] z-0" />
                    <img src="/images/work/phone mockup.webp" alt="Phone Frame" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none max-w-none" />
                  </div>
                ) : (
                  <img src={img} alt={`Project Execution ${i + 2}`} className="w-full h-auto object-contain" />
                )}
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
