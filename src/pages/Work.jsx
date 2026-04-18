import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { projects } from '../data/projects';
import ScrambleText from '../components/ScrambleText';

export default function Work() {
  const [randomizedProjects, setRandomizedProjects] = React.useState([]);

  useEffect(() => {
    // Randomize projects only once when the component mounts
    setRandomizedProjects([...projects].sort(() => 0.5 - Math.random()));

    let ctx = gsap.context(() => {
      gsap.fromTo('.gallery-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-hc-black pt-40 pb-32 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <h1 className="font-heading text-6xl md:text-8xl text-hc-white uppercase tracking-tighter mb-4">
          Tactical<br />Index
        </h1>
        <p className="font-mono text-sm text-hc-white/60 uppercase tracking-widest">
          Classified Operations // {projects.length} Files Found
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {randomizedProjects.map((project, i) => (
            <Link to={`/work/${project.slug}`} key={i} className="gallery-item group block relative overflow-hidden bg-hc-white/5 border border-hc-white/10 interactive">

              {/* Image Container */}
              <div className="w-full aspect-[4/5] overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-hc-red mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-hc-black via-hc-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              </div>

              {/* Data Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 bg-gradient-to-t from-hc-black to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-xs uppercase tracking-widest text-hc-red mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ScrambleText text={project.categories.join(' // ')} />
                </p>
                <h3 className="font-heading text-3xl text-hc-white uppercase tracking-tighter">
                  {project.title}
                </h3>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-hc-white/20 group-hover:border-hc-red transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-hc-white/20 group-hover:border-hc-red transition-colors duration-300"></div>

            </Link>
          ))}

        </div>
      </div>

    </main>
  );
}
