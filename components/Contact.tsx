import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-dismiss errors after 4 seconds
  useEffect(() => {
    const hasErrors = Object.values(errors).some(val => val !== '');
    if (hasErrors) {
      const timer = setTimeout(() => {
        setErrors({ name: '', email: '', message: '' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing (immediate feedback)
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);
    
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    // Name validation: at least 2 characters
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
       newErrors.email = 'Email is required';
       isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Message validation: at least 5 characters
    if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setIsSubmitting(true);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const errorAnimation = {
    initial: { opacity: 0, height: 0, marginTop: 0 },
    animate: { opacity: 1, height: 'auto', marginTop: 4 },
    exit: { opacity: 0, height: 0, marginTop: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-dark to-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
                <p className="text-gray-400">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <MotionDiv
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-white">Email</h4>
                                <p className="text-gray-400">rafli.setiawan@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-white">Phone</h4>
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-white">Location</h4>
                                <p className="text-gray-400">San Francisco, CA</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-card rounded-2xl border border-gray-800">
                        <p className="text-gray-300 italic">
                            "Innovation distinguishes between a leader and a follower."
                        </p>
                        <p className="text-gray-500 mt-2">— Steve Jobs</p>
                    </div>
                </MotionDiv>

                <MotionDiv
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card p-8 rounded-2xl border border-gray-800 shadow-xl"
                >
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-dark border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                                        errors.name 
                                        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
                                        : 'border-gray-700 focus:ring-primary/50 focus:border-primary'
                                    }`}
                                    placeholder="Your name"
                                />
                                <AnimatePresence>
                                    {errors.name && (
                                        <MotionDiv 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                        </MotionDiv>
                                    )}
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {errors.name && (
                                    <MotionP 
                                        {...errorAnimation}
                                        className="text-sm text-red-500 overflow-hidden"
                                    >
                                        {errors.name}
                                    </MotionP>
                                )}
                            </AnimatePresence>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-dark border rounded-lg focus:outline-none focus:ring-2 transition-all text-white placeholder-gray-500 ${
                                        errors.email 
                                        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
                                        : 'border-gray-700 focus:ring-primary/50 focus:border-primary'
                                    }`}
                                    placeholder="your@email.com"
                                />
                                <AnimatePresence>
                                    {errors.email && (
                                        <MotionDiv 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                        </MotionDiv>
                                    )}
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {errors.email && (
                                    <MotionP 
                                        {...errorAnimation}
                                        className="text-sm text-red-500 overflow-hidden"
                                    >
                                        {errors.email}
                                    </MotionP>
                                )}
                            </AnimatePresence>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                Message
                            </label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 bg-dark border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none text-white placeholder-gray-500 ${
                                        errors.message 
                                        ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' 
                                        : 'border-gray-700 focus:ring-primary/50 focus:border-primary'
                                    }`}
                                    placeholder="How can I help you?"
                                ></textarea>
                                <AnimatePresence>
                                    {errors.message && (
                                        <MotionDiv 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            className="absolute right-4 top-3 text-red-500"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                        </MotionDiv>
                                    )}
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {errors.message && (
                                    <MotionP 
                                        {...errorAnimation}
                                        className="text-sm text-red-500 overflow-hidden"
                                    >
                                        {errors.message}
                                    </MotionP>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3.5 font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                                isSubmitting 
                                ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
                            }`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                            {!isSubmitting && <Send className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                            {isSuccess && (
                                <MotionDiv
                                    initial={{ opacity: 0, y: 10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-500 overflow-hidden"
                                >
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">Message sent successfully!</span>
                                </MotionDiv>
                            )}
                        </AnimatePresence>
                    </form>
                </MotionDiv>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;