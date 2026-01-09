import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-dark relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="https://picsum.photos/600/600"
                alt="Profile"
                loading="lazy"
                className="relative rounded-2xl shadow-2xl w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Me
            </h2>
            <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
            
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                Hello! I'm M Rafli Setiawan, a passionate software engineer who loves creating web applications that live on the internet. My interest in web development started back in 2018 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS is pretty fun!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, and a huge corporation. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
              <p>
                When I'm not at the computer, I'm usually hanging out with my cat, reading sci-fi novels, or running.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
               <div>
                  <h3 className="text-white font-semibold mb-2">Experience</h3>
                  <p className="text-gray-400">5+ Years</p>
               </div>
               <div>
                  <h3 className="text-white font-semibold mb-2">Projects</h3>
                  <p className="text-gray-400">50+ Completed</p>
               </div>
               <div>
                  <h3 className="text-white font-semibold mb-2">Clients</h3>
                  <p className="text-gray-400">30+ Global</p>
               </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default About;