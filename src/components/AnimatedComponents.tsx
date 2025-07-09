import React from 'react';
import { motion } from 'framer-motion';

// FadeIn component
export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// CardReveal component
export const CardReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 p-8"
  >
    {children}
  </motion.div>
);

// SlideIn component
export const SlideIn: React.FC<{ 
  children: React.ReactNode; 
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}> = ({ children, direction = 'up', delay = 0 }) => {
  const variants = {
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 }
  };

  return (
    <motion.div
      initial={variants[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Collapsible component
export const Collapsible: React.FC<{ 
  children: React.ReactNode; 
  title: string;
  isOpen?: boolean;
  onToggle?: () => void;
}> = ({ children, title, isOpen = false, onToggle }) => (
  <motion.div className="overflow-hidden">
    <motion.button
      onClick={onToggle}
      className="w-full px-6 py-6 text-left font-semibold flex justify-between items-center hover:bg-white/5 transition-all duration-300 text-white"
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
    >
      <span className="text-xl">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-purple-300"
      >
        ▼
      </motion.div>
    </motion.button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-6">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

// HoverCard component
export const HoverCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 ${className}`}
    whileHover={{ 
      scale: 1.02, 
      y: -5,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
    }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// StaggeredGrid component
export const StaggeredGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {children}
  </motion.div>
);

// StaggeredItem component
export const StaggeredItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: { opacity: 1, y: 0, scale: 1 }
    }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
); 