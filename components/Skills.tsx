import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Terminal, Cpu, Globe } from 'lucide-react';

const MotionDiv = motion.div as any;

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Layout className="w-6 h-6" />,
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion', 'Redux'],
    },
    {
      title: 'Backend',
      icon: <Database className="w-6 h-6" />,
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Prisma'],
    },
    {
      title: 'DevOps & Tools',
      icon: <Terminal className="w-6 h-6" />,
      skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Linux'],
    },
    {
      title: 'Other',
      icon: <Globe className="w-6 h-6" />,
      skills: ['UI/UX Design', 'SEO', 'Web Accessibility', 'Performance Optimization'],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-dark/50">
      <div className="container mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to bring ideas to life.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <MotionDiv
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-2xl border border-gray-800 hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;