import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, ChevronsDown } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const Hero: React.FC = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Fade out the indicator as user scrolls down 300px
      const newOpacity = Math.max(0, 1 - scrollPosition / 300);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier
      }
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 md:pt-0 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

      <div className="container mx-auto px-6 z-10">
        <MotionDiv 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionDiv
            variants={itemVariants}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
          >
            <span className="text-gray-300 text-sm font-medium">✨ Available for freelance work</span>
          </MotionDiv>

          <MotionH1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Building digital
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
              experiences that matter.
            </span>
          </MotionH1>

          <MotionP
            variants={itemVariants}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I'm a Full Stack Developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on building accessible, human-centered products.
          </MotionP>

          <MotionDiv
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, '#projects')}
              className="px-8 py-4 rounded-lg bg-white text-dark font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-8 py-4 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors w-full sm:w-auto font-medium"
            >
              Contact Me
            </a>
          </MotionDiv>

          <MotionDiv
            variants={itemVariants}
            className="mt-16 flex justify-center space-x-6"
          >
            {[Github, Linkedin, Twitter].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-gray-600 hover:-translate-y-1"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Scroll Down Indicator */}
      <MotionDiv
        style={{ opacity: scrollOpacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">Scroll</span>
        <ChevronsDown className="w-6 h-6 text-primary" />
      </MotionDiv>
    </section>
  );
};

export default Hero;