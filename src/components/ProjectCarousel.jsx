import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCarousel({ currentSlug, subtitleOverride, titleOverride }) {
  const containerRef = useRef(null);
  const [loopingProjects, setLoopingProjects] = React.useState([]);

  useEffect(() => {
    // Filter out the current project and randomize the order only once on mount
    const otherProjects = [...projects]
      .filter(p => p.slug !== currentSlug)
      .sort(() => 0.5 - Math.random());

    // Duplicate for seamless looping
    setLoopingProjects([...otherProjects, ...otherProjects]);
  }, [currentSlug]);

  useEffect(() => {
    // Wait for the random loop to instantiate so we don't try animating 0 nodes
    if (loopingProjects.length === 0) return;

    let ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.carousel-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%'
          }
        }
      );

      // Infinite loop strictly applied globally now
      const carouselInner = document.querySelector('.carousel-inner');
      if (carouselInner) {
        gsap.to(carouselInner, {
          xPercent: -50,
          ease: 'none',
          duration: 60, // Slow, ambient loop speed
          repeat: -1
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, [currentSlug, loopingProjects]);

  if (loopingProjects.length === 0) return null;

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-hc-black pt-24 pb-32 border-t border-hc-white/10 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <p className="font-mono text-sm uppercase tracking-widest text-hc-red mb-4">
          {subtitleOverride || "Continue the Sequence"}
        </p>
        <h2 className="font-heading text-5xl md:text-7xl text-hc-white uppercase tracking-tighter">
          {titleOverride || "Up Next"}
        </h2>
      </div>

      {/* Horizontal Scroll Layout for Carousel */}
      <div className="w-full overflow-x-auto overflow-y-hidden pb-12 hide-scrollbar">
        <div className="carousel-inner flex gap-8 px-6 md:px-0 w-max mx-auto md:mx-0">
          {loopingProjects.map((project, i) => (
            <Link
              to={`/work/${project.slug}`}
              key={i}
              className="carousel-item group block relative w-[85vw] md:w-[28rem] aspect-[4/5] bg-hc-white/5 border border-hc-white/10 hover:border-hc-white/20 transition-colors duration-500 overflow-hidden interactive flex-shrink-0"
            >

              <div className="absolute inset-0 z-0">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hc-black via-hc-black/50 to-transparent"></div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-xs uppercase tracking-widest text-hc-red mb-3">
                  <ScrambleText text={project.client} />
                </p>
                <h3 className="font-heading text-3xl md:text-4xl text-hc-white uppercase tracking-tighter">
                  {project.title}
                </h3>
              </div>

            </Link>
          ))}
        </div>
      </div>

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
