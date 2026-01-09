import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../types';

const MotionDiv = motion.div as any;

const projectsData: Project[] = [
  {
    id: 1,
    title: "AI Dashboard Analytics",
    description: "A comprehensive dashboard for visualizing AI model performance metrics with real-time data updates and interactive charts.",
    tags: ["React", "TypeScript", "D3.js", "Tailwind"],
    image: "https://picsum.photos/800/600?random=1",
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with cart functionality, user authentication, and Stripe payment integration.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    image: "https://picsum.photos/800/600?random=2",
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management tool with drag-and-drop boards, team workspaces, and real-time notifications.",
    tags: ["React", "Redux", "Node.js", "Socket.io"],
    image: "https://picsum.photos/800/600?random=3",
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Crypto Portfolio Tracker",
    description: "Mobile-first application to track cryptocurrency investments, viewing historical data and market trends.",
    tags: ["React Native", "Firebase", "CoinGecko API"],
    image: "https://picsum.photos/800/600?random=4",
    link: "#",
    github: "#"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="group relative bg-card rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:-translate-y-1 h-full"
  >
    <div className="aspect-video overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
        <a
          href={project.link}
          className="p-3 bg-white text-dark rounded-full hover:bg-primary hover:text-white transition-colors"
          title="View Live"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
        <a
          href={project.github}
          className="p-3 bg-dark border border-white/20 text-white rounded-full hover:bg-white hover:text-dark transition-colors"
          title="View Code"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </MotionDiv>
);

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const initialProjects = projectsData.slice(0, 2);
  const moreProjects = projectsData.slice(2);

  const handleToggle = () => {
    if (showAll) {
      // Scroll back up to the section top with offset for navbar
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
         const navbarHeight = 80; // Approximate navbar height + padding
         const targetPosition = projectsSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
         
         window.scrollTo({ 
            top: targetPosition, 
            behavior: 'smooth' 
         });
      }
    }
    setShowAll(!showAll);
  };

  return (
    <section id="projects" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl">
            Here are some of the projects I've worked on recently. Each project represents a unique challenge and learning opportunity.
          </p>
        </MotionDiv>

        {/* First 2 projects always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Expandable section for the rest */}
        <AnimatePresence>
          {showAll && (
            <MotionDiv
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Using pt-8 instead of mt-8 prevents margin collapse issues during height animation */}
              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {moreProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index + 2} />
                ))}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
        
        <div className="mt-12 text-center">
            {projectsData.length > 2 && (
              <button 
                onClick={handleToggle}
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-gray-700 hover:bg-gray-700/50 hover:border-primary/50 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                {showAll ? (
                    <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /></>
                ) : (
                    <>View All Projects <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /></>
                )}
              </button>
            )}
        </div>
      </div>
    </section>
  );
};

export default Projects;