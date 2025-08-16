'use client';

import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ChevronDown, ArrowRight, Github, Linkedin, Code, Database, Server, Globe, Zap, Shield, Cpu, Sparkles, Star, Rocket, Target, FileCode, FileText, Terminal, Cloud, GitBranch, Settings, Palette, Smartphone, Monitor, Layers, Box } from 'lucide-react';
import profileData from '@/data/profile.json';
import Counter from '@/components/Counter';
import '@/lib/i18n';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const { t } = useTranslation();
  const [displayName, setDisplayName] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState('');
  const [isTypingName, setIsTypingName] = useState(true);
  const [isTypingTitle, setIsTypingTitle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

  // Multiple titles for animation
  const titles = [
    "Senior Full Stack Engineer",
    "React Developer",
    "Senior Software Engineer (.NET)",
    "Problem Solver"
  ];

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Spring animations for smooth movement
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  // Animated typing effect for name
  useEffect(() => {
    const name = profileData.personal.name;
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= name.length) {
        setDisplayName(name.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingName(false);
        setIsTypingTitle(true);
        clearInterval(typeInterval);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, []);

  // Animated typing effect for titles
  useEffect(() => {
    if (!isTypingTitle) return;

    const currentTitle = titles[currentTitleIndex];
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentTitle.length) {
        setDisplayTitle(currentTitle.slice(0, currentIndex));
        currentIndex++;
      } else {
        // Wait before starting next title
        setTimeout(() => {
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setDisplayTitle('');
        }, 2000);
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [isTypingTitle, currentTitleIndex]);

  // Mouse tracking for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Enhanced floating icons based on skillset
  const floatingIcons = [
    { icon: FileCode, delay: 0, duration: 8, x: 20, y: -15, rotation: 360, className: 'left-[10%] top-[15%]' },
    { icon: FileText, delay: 1, duration: 10, x: -25, y: 20, rotation: -360, className: 'left-[20%] top-[60%]' },
    { icon: Terminal, delay: 2, duration: 9, x: 30, y: -25, rotation: 180, className: 'left-[35%] top-[20%]' },
    { icon: Cloud, delay: 0.5, duration: 12, x: -20, y: 30, rotation: -180, className: 'left-[50%] top-[70%]' },
    { icon: GitBranch, delay: 1.5, duration: 7, x: 35, y: -20, rotation: 360, className: 'left-[65%] top-[30%]' },
    { icon: Settings, delay: 2.5, duration: 11, x: -30, y: 25, rotation: -360, className: 'left-[80%] top-[50%]' },
    { icon: Layers, delay: 1, duration: 9, x: 25, y: -30, rotation: 180, className: 'left-[15%] top-[80%]' },
    { icon: Palette, delay: 0.8, duration: 8.5, x: -15, y: 35, rotation: -180, className: 'left-[70%] top-[10%]' },
    { icon: Smartphone, delay: 1.2, duration: 10.5, x: 40, y: -15, rotation: 360, className: 'left-[85%] top-[25%]' },
    { icon: Monitor, delay: 0.3, duration: 9.5, x: -35, y: 40, rotation: -360, className: 'left-[25%] top-[85%]' },
    { icon: Box, delay: 1.8, duration: 8.8, x: 45, y: -25, rotation: 180, className: 'left-[90%] top-[40%]' },
    { icon: Sparkles, delay: 0.7, duration: 11.2, x: -40, y: 15, rotation: -180, className: 'left-[5%] top-[45%]' },
    { icon: Rocket, delay: 1.4, duration: 9.8, x: 30, y: 35, rotation: 360, className: 'left-[75%] top-[75%]' },
    { icon: Star, delay: 0.9, duration: 10.8, x: -25, y: -40, rotation: -360, className: 'left-[40%] top-[5%]' },
  ];

  const floatingShapes = [
    { size: 'w-4 h-4', x: 15, y: -20, duration: 8, delay: 0, className: 'left-[8%] top-[25%]' },
    { size: 'w-6 h-6', x: -25, y: 15, duration: 10, delay: 1, className: 'left-[28%] top-[8%]' },
    { size: 'w-3 h-3', x: 20, y: -25, duration: 9, delay: 2, className: 'left-[58%] top-[18%]' },
    { size: 'w-5 h-5', x: -30, y: 20, duration: 11, delay: 0.5, className: 'left-[82%] top-[35%]' },
    { size: 'w-4 h-4', x: 35, y: -15, duration: 8.5, delay: 1.2, className: 'left-[12%] top-[55%]' },
    { size: 'w-3 h-3', x: -20, y: 30, duration: 9.5, delay: 0.8, className: 'left-[68%] top-[65%]' },
  ];

  const socialLinks = [
    { icon: Github, href: profileData.personal.social.github, label: 'GitHub' },
    { icon: Linkedin, href: profileData.personal.social.linkedin, label: 'LinkedIn' },
    { icon: Globe, href: profileData.personal.social.portfolio, label: 'Portfolio' },
  ];

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-100/30 dark:from-primary-900/20 dark:via-transparent dark:to-primary-800/20" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {/* Floating Icons */}
        {floatingIcons.map((iconConfig, index) => {
          const Icon = iconConfig.icon;
          return (
            <motion.div
              key={`icon-${index}`}
              className={`absolute text-primary-400/20 dark:text-primary-500/20 pointer-events-none ${iconConfig.className}`}
              animate={{
                x: [0, iconConfig.x, 0],
                y: [0, iconConfig.y, 0],
                rotate: [0, iconConfig.rotation],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: iconConfig.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: iconConfig.delay,
              }}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
            </motion.div>
          );
        })}

        {/* Floating Shapes */}
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={`shape-${index}`}
            className={`absolute ${shape.size} bg-gradient-to-br from-primary-400/20 to-primary-600/20 dark:from-primary-500/20 dark:to-primary-700/20 rounded-full pointer-events-none blur-sm ${shape.className}`}
            animate={{
              x: [0, shape.x, 0],
              y: [0, shape.y, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            }}
          />
        ))}

        {/* Animated Particles */}
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-primary-400/40 dark:bg-primary-500/40 rounded-full pointer-events-none"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + (index % 2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Greeting Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-full border border-primary-200 dark:border-primary-800 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-700 dark:text-primary-300 font-medium">
              {t('hero.greeting')}
            </span>
          </motion.div>

                     {/* Name with Typing Effect */}
           <motion.h1
             variants={itemVariants}
             className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 dark:text-white leading-tight"
           >
                           <span className="inline-flex items-center">
                {displayName}
                <motion.span
                  className="inline-block w-1 bg-primary-600 dark:bg-primary-400 ml-2 cursor-height"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>
           </motion.h1>

           {/* Stats Counters - Modern Design */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-8 md:gap-12"
            >
              {/* Years of Experience */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {profileData.personal.yearsOfExperience}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Years of Experience
                </div>
              </div>

              {/* Separator */}
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>

              {/* Projects Counter */}
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  <Counter 
                    end={profileData.personal.numberOfProjects} 
                    duration={1.5}
                    className="font-bold"
                    suffix="+"
                  />
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  Projects Completed
                </div>
              </div>
            </motion.div>

          {/* Animated Title */}
          <motion.div
            variants={itemVariants}
            className="relative min-h-[2rem] md:min-h-[3rem] lg:min-h-[4rem] xl:min-h-[5rem] flex items-center justify-center"
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 dark:from-primary-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                              <span className="inline-flex items-center">
                {displayTitle}
                <motion.span
                  className="inline-block w-1 bg-primary-600 dark:bg-primary-400 ml-2 cursor-height"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </span>
            </h2>
           <motion.div
             className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 via-blue-600/20 to-indigo-600/20 blur-xl"
             animate={{
               opacity: [0.5, 1, 0.5],
               scale: [1, 1.1, 1],
             }}
             transition={{
               duration: 3,
               repeat: Infinity,
               ease: "easeInOut",
             }}
           />
         </motion.div>

          {/* Punchy Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Crafting digital experiences with <span className="text-primary-600 dark:text-primary-400 font-semibold">modern web technologies</span>. 
            Turning ideas into <span className="text-primary-600 dark:text-primary-400 font-semibold">scalable solutions</span> that users love.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>{t('hero.cta')}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center space-x-3 px-6 md:px-8 py-3 md:py-4 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border-2 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Target className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <span className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base">
              {t('contact.social')}
            </span>
            <div className="flex space-x-3 md:space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      rotate: 360,
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="group p-3 md:p-4 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500"
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

             {/* Scroll Indicator - Fixed positioning */}
       <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
         <motion.div
           animate={{
             y: [0, 10, 0],
           }}
           transition={{
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut",
           }}
         >
           <motion.div
             whileHover={{ scale: 1.2 }}
             className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400 cursor-pointer"
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
           >
             <span className="text-sm font-medium">{t('hero.scroll')}</span>
             <ChevronDown className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
           </motion.div>
         </motion.div>
       </div>

      {/* Interactive Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mousePosition.x * 0.01,
          y: mousePosition.y * 0.01,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-56 md:w-80 h-56 md:h-80 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
}
