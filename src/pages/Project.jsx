import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import LetsTalk from '../components/LetsTalk';
import WebDesign from '../components/modules/WebDesign';
import LogoDesign from '../components/modules/LogoDesign';
import PrintDesign from '../components/modules/PrintDesign';
import JewelcaseDesign from '../components/modules/JewelcaseDesign';
import ProjectCarousel from '../components/ProjectCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    if (!project) return;

    let ctx = gsap.context(() => {
      gsap.fromTo('.project-reveal',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Map the correct module components
  const renderModule = (module, index) => {
    switch (module.type) {
      case 'WebDesign':
        return <WebDesign key={index} data={module} />;
      case 'LogoDesign':
        return <LogoDesign key={index} data={module} />;
      case 'PrintDesign':
        return <PrintDesign key={index} data={module} />;
      case 'JewelcaseDesign':
        return <JewelcaseDesign key={index} data={module} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-hc-black text-hc-white pt-40 overflow-hidden">

      {/* Project Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">

        {/* Agency Disclaimer */}
        {project.agencyContract && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-hc-white/40 mb-12 project-reveal border border-hc-white/10 inline-block px-4 py-2">
            Status: {project.agencyContract}
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-16 lg:items-end justify-between">
          <div className="lg:w-2/3">
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85] project-reveal text-hc-white flex flex-col">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'text-hc-red' : ''}>{word}</span>
              ))}
            </h1>
            {project.subtitle && (
              <h2 className="font-heading text-3xl md:text-4xl uppercase tracking-tight text-hc-white mt-8 project-reveal">
                {project.subtitle}
              </h2>
            )}
          </div>

          <div className="lg:w-1/3 flex flex-col gap-8 project-reveal">

            {/* Tags Mapping */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-hc-red mb-4">Tactical Matrix</p>
              <ul className="flex flex-wrap gap-2">
                {project.tags.slice().sort().map((tag, i) => (
                  <li key={i} className="font-mono text-xs text-hc-white/60 uppercase tracking-widest border border-hc-white/10 px-3 py-1.5 bg-hc-white/5">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Mapping */}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-hc-red mb-4">Primary Directives</p>
              <ul className="flex flex-wrap gap-2">
                {project.categories.slice().sort().map((cat, i) => (
                  <li key={i} className="font-mono text-xs text-hc-white/60 uppercase tracking-widest border border-hc-red/30 px-3 py-1.5">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Labels Mapping */}
            {project.labels && project.labels.length > 0 && (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-hc-red mb-4">Labels</p>
                <div className="flex flex-wrap gap-6 items-center">
                  {project.labels.slice().sort().map((labelSrc, i) => (
                    <img
                      key={i}
                      src={labelSrc}
                      alt="Label Logo"
                      className={`object-contain brightness-0 invert opacity-80 ${labelSrc.includes('Concord') ? 'h-4 md:h-5' : 'h-8 md:h-10'}`}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Modular Content Sections */}
      <div className="project-modules-container">
        {project.modules.map((module, index) => renderModule(module, index))}
      </div>

      {/* Up Next Carousel */}
      <ProjectCarousel currentSlug={project.slug} />

      {/* Global CTA */}
      <LetsTalk />

    </main>
  );
}
