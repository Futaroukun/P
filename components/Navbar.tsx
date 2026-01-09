import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Home, User, Laptop, Mail, Cpu, Github, Twitter, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionAside = motion.aside as any;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      
      // Check if we're at the bottom of the page to highlight the last section
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home size={20} /> },
    { name: 'About', href: '#about', icon: <User size={20} /> },
    { name: 'Skills', href: '#skills', icon: <Cpu size={20} /> },
    { name: 'Projects', href: '#projects', icon: <Laptop size={20} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-6">
      {/* Logo */}
      <a 
        href="#home" 
        className="flex items-center space-x-3 mb-10 group" 
        onClick={(e) => handleNavClick(e, '#home')}
      >
        <div className="p-2.5 bg-gradient-to-r from-primary to-secondary rounded-xl group-hover:rotate-3 transition-transform shadow-lg shadow-primary/20">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 leading-none">
            RAFF
          </span>
          <span className="text-xs text-gray-500 font-medium">Portfolio</span>
        </div>
      </a>

      {/* Links */}
      <div className="flex-1 flex flex-col space-y-2">
        {navLinks.map((link) => {
           const isActive = activeSection === link.name.toLowerCase();
           return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 group ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`}>
                {link.icon}
              </span>
              <span className="relative z-10 font-medium tracking-wide">{link.name}</span>
              
              {isActive && (
                <MotionDiv
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="pt-6 border-t border-gray-800/50">
        <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                <img 
                  src="https://picsum.photos/200" 
                  alt="User" 
                  loading="lazy"
                  className="w-full h-full rounded-full object-cover border-2 border-dark" 
                />
            </div>
            <div>
                <p className="text-sm font-semibold text-white">M Rafli</p>
                <p className="text-xs text-gray-500">Developer</p>
            </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-600/10 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <p className="text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} RAFF. All rights reserved.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-5 right-5 z-50 p-3 rounded-full bg-dark/80 backdrop-blur-md border border-gray-800 text-white shadow-xl md:hidden hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-dark border-r border-gray-800/50 z-40 flex-col overflow-y-auto">
         <SidebarContent />
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <MotionAside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-screen w-72 bg-dark border-r border-gray-800 z-50 md:hidden overflow-y-auto"
            >
              <SidebarContent />
            </MotionAside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;