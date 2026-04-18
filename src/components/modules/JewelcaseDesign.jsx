import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function JewelcaseDesign({ data }) {
    const containerRef = useRef(null);
    const textSectionRef = useRef(null);
    const bookletRef = useRef(null);

    // Destructure image data for easier reading
    const {
        frontCover,
        backCover,
        insideTray,
        outsideTray,
        disc,
        bookletPages
    } = data.images;

    useEffect(() => {
        let ctx = gsap.context(() => {

            // Text section reveal animations
            gsap.fromTo('.web-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: textSectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            // SCENE 1: Flat Jewelcase & CD extraction
            const tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "center center",
                    end: "+=150%", // Scroll distance
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Extract disc fully to the right
            tl1.to('.jc-disc', {
                x: '110%',
                rotationZ: 360,
                ease: "power2.inOut"
            }, 0);

            // Shift the jewelcase case slightly to the left proportionally so the entire group remains centered
            tl1.to('.jc-wrapper', {
                xPercent: -50,
                ease: "power2.inOut"
            }, 0);

            // SCENE 2: The Booklet 3D flip
            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: bookletRef.current,
                    start: "center center",
                    end: "+=400%", // Longer scroll distance for many pages
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Booklet pages initial state
            gsap.set('.booklet-container', { perspective: 2500 });
            gsap.set('.booklet-leaf', { transformOrigin: 'left center', transformStyle: 'preserve-3d', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' });

            // Set initial centered position
            gsap.set('.booklet-wrapper', { xPercent: 0 });

            // The booklet leaves are stacked. We flip them one by one.
            const leaves = gsap.utils.toArray('.booklet-leaf');

            // Reverse array so top pages flip first
            leaves.reverse().forEach((leaf, i) => {
                tl2.to(leaf, {
                    rotationY: -179, // Almost fully flat
                    duration: 1,
                    z: i * -0.5, // Push towards camera when flipped to prevent even pages clipping under previous layers
                    ease: "power1.inOut"
                }, i * 0.8)
                    // Halfway through flip, bump the zIndex so it visually lands on top of the left stack
                    .set(leaf, { zIndex: 100 + i }, i * 0.8 + 0.5);

                // If this is the very first page flipping open, shift the wrapper to center the spine
                if (i === 0) {
                    tl2.to('.booklet-wrapper', {
                        xPercent: 50,
                        duration: 1,
                        ease: "power1.inOut"
                    }, 0);
                }

                // If this is the final leaf flipping closed, shift the wrapper to center the left-bound book
                if (i === leaves.length - 1) {
                    tl2.to('.booklet-wrapper', {
                        xPercent: 100,
                        duration: 1,
                        ease: "power1.inOut"
                    }, i * 0.8);
                }
            });

        });

        return () => ctx.revert();
    }, [data]);

    return (
        <>
            {/* Descriptive Text Sections (Restored from WebDesign layout) */}
            <div ref={textSectionRef} className="w-full pt-20 pb-12">

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

                {/* 2. Planning / Preparation - Broken Grid Layout */}
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

                {/* 3. Execution - Asymmetrical Sticky Layout */}
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 relative">
                    <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
                        <div className="md:w-1/3 web-reveal sticky top-32">
                            <h3 className="font-heading text-4xl lg:text-5xl uppercase tracking-tighter text-hc-red mb-2">03 // Execution</h3>
                            <p className="font-mono text-xs uppercase tracking-widest text-hc-white/40 mb-8 border-b border-hc-white/10 pb-4 inline-block">Final Deployment Phase</p>
                        </div>
                        <div className="md:w-3/5 font-mono text-base md:text-xl text-hc-white/90 leading-relaxed font-light web-reveal whitespace-pre-wrap">
                            {data.execution}
                        </div>
                    </div>
                </div>

            </div>

            {/* Flat Jewelcase Section */}
            <section ref={containerRef} className="w-full h-screen bg-hc-black flex items-center justify-center overflow-hidden relative">

                <div className="absolute top-1/4 left-6 md:left-12 z-0 opacity-20 pointer-events-none">
                    <h3 className="font-heading text-6xl md:text-9xl uppercase tracking-tighter text-hc-white print-heading">
                        04 // Physical Media
                    </h3>
                </div>

                <div className="absolute inset-x-0 bottom-12 flex justify-center z-20">
                    <p className="font-mono text-xs uppercase tracking-widest text-hc-white/40 border-b border-hc-white/10 pb-4 inline-block">
                        Scroll to Extract Disc
                    </p>
                </div>

                {/* Flat Jewelcase Stage */}
                <div className="w-full max-w-5xl flex items-center justify-center relative mt-12 z-10">

                    <div className="jc-wrapper relative w-[350px] md:w-[450px] aspect-square drop-shadow-2xl">
                        {/* Layer 1: The Base (Tray Outside) */}
                        <div className="absolute inset-0 z-0">
                            <img src={outsideTray} alt="Tray Outside" className="w-full h-full object-cover rounded-sm" />
                        </div>

                        {/* Layer 2: The Inside Tray (behind the CD) */}
                        <div className="absolute inset-0 z-10">
                            <img src={insideTray} alt="Tray Inside" className="w-full h-full object-cover rounded-sm" />
                        </div>

                        {/* Layer 3: The CD Disc */}
                        <div className="jc-disc absolute inset-0 z-20">
                            <div
                                className="w-[95%] h-[95%] absolute top-[2.5%] left-[2.5%] rounded-full shadow-2xl drop-shadow-2xl"
                                style={{
                                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 12%, black 13%)',
                                    maskImage: 'radial-gradient(circle at center, transparent 12%, black 13%)'
                                }}
                            >
                                <img src={disc} alt="CD Disc" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* Layer 4: Front Cover Booklet Image (covers the CD) */}
                        <div className="absolute inset-0 z-30 bg-hc-black">
                            <img src={frontCover} alt="Front Cover" className="w-full h-full object-cover rounded-sm opacity-95" />
                        </div>
                    </div>

                </div>
            </section>

            {/* Booklet 3D Archive Section */}
            <section ref={bookletRef} className="booklet-container w-full h-screen bg-hc-black flex items-center justify-center overflow-hidden relative">

                <div className="absolute inset-x-0 bottom-12 flex justify-center z-20">
                    <p className="font-mono text-xs uppercase tracking-widest text-hc-white/40 border-b border-hc-white/10 pb-4 inline-block">
                        Lyric Booklet Archive
                    </p>
                </div>

                <div className="booklet-wrapper relative w-[350px] md:w-[450px] aspect-square drop-shadow-2xl z-10">

                    {/* Loop through leaves (each leaf is 2 pages: front/back) */}
                    {Array.from({ length: Math.ceil(bookletPages.length / 2) }).map((_, i) => {
                        // Calculate leaves backwards (total leaves minus current index) so top is rendered last
                        const totalLeaves = Math.ceil(bookletPages.length / 2);
                        const leafIndex = totalLeaves - 1 - i;

                        // frontPageIndex maps to 0 for cover, 2 for page 3, etc.
                        const frontPageIndex = (leafIndex * 2);
                        // backPageIndex is the back side of that leaf (1 for inside cover, 3 for page 4, etc.)
                        const backPageIndex = (leafIndex * 2) + 1;

                        return (
                            <div key={i} className="booklet-leaf" style={{ zIndex: i + 1 }}>
                                <div className="absolute inset-0 bg-white" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                                    {/* Back side of page (Left side when open) */}
                                    {bookletPages[backPageIndex] && (
                                        <img src={bookletPages[backPageIndex]} className="w-full h-full object-cover" alt={`Page ${backPageIndex}`} />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-white" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                                    {/* Front side of page (Right side when closed) */}
                                    {bookletPages[frontPageIndex] && (
                                        <img src={bookletPages[frontPageIndex]} className="w-full h-full object-cover" alt={`Page ${frontPageIndex}`} />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
