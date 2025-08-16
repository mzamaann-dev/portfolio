'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Calendar, Users, Code, Globe, X, ArrowRight, Award, Zap, Shield, Database, Server, BookOpen, ChevronRight, Star, Clock, User } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  duration: string;
  team_size: string;
  role: string;
  challenges: string[];
  solutions: string[];
  features: string[];
  architecture: string;
  performance: string;
  lessons_learned: string[];
}

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Get icon component based on technology
  const getTechIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return Code;
    if (techLower.includes('node') || techLower.includes('express')) return Server;
    if (techLower.includes('database') || techLower.includes('sql') || techLower.includes('mongo')) return Database;
    if (techLower.includes('aws') || techLower.includes('cloud')) return Globe;
    if (techLower.includes('docker') || techLower.includes('kubernetes')) return Shield;
    if (techLower.includes('webpack') || techLower.includes('vite')) return Zap;
    return Code;
  };

  return (
    <>
      <section id="projects" className="py-20 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={cardVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {t('projects.title')}
            </motion.h2>
            <motion.p
              variants={cardVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              {t('projects.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {profileData.projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500 cursor-pointer"
                onClick={() => openModal(project as Project)}
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl text-primary-600 dark:text-primary-400 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                    {project.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium border border-primary-200 dark:border-primary-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-300 dark:border-dark-600">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(project as Project);
                      }}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center group/btn"
                    >
                      <span className="mr-2">View Details</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                    
                    <div className="flex space-x-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-8 rounded-t-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.h2 
                      variants={itemVariants}
                      className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
                    >
                      {selectedProject.title}
                    </motion.h2>
                    <motion.p 
                      variants={itemVariants}
                      className="text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {selectedProject.description}
                    </motion.p>
                  </div>
                  <motion.button
                    variants={itemVariants}
                    onClick={closeModal}
                    className="p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:bg-white/50 dark:hover:bg-dark-700/50 rounded-xl ml-4"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <motion.div 
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="p-8 space-y-8 overflow-y-auto max-h-[calc(95vh-200px)]"
              >
                {/* Project Overview */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex items-center space-x-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800"
                  >
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Duration</p>
                      <p className="font-bold text-gray-900 dark:text-white">{selectedProject.duration}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex items-center space-x-4 p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <div className="p-3 bg-green-500 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">Team Size</p>
                      <p className="font-bold text-gray-900 dark:text-white">{selectedProject.team_size}</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex items-center space-x-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800"
                  >
                    <div className="p-3 bg-purple-500 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Role</p>
                      <p className="font-bold text-gray-900 dark:text-white">{selectedProject.role}</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Technologies */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="p-2 bg-primary-500 rounded-lg mr-3">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    Technologies & Tools
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProject.technologies.map((tech, index) => {
                      const TechIcon = getTechIcon(tech);
                      return (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                        >
                          <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                            <TechIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {tech}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="p-2 bg-yellow-500 rounded-lg mr-3">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
                      >
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-200 font-medium">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Architecture */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="p-2 bg-indigo-500 rounded-lg mr-3">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    Architecture & Technical Details
                  </h3>
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                      {selectedProject.architecture}
                    </p>
                  </div>
                </motion.div>

                {/* Performance */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="p-2 bg-emerald-500 rounded-lg mr-3">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    Performance & Optimization
                  </h3>
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                      {selectedProject.performance}
                    </p>
                  </div>
                </motion.div>

                {/* Challenges & Solutions */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <div className="p-2 bg-red-500 rounded-lg mr-3">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      Challenges Faced
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.challenges.map((challenge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: 5 }}
                          className="flex items-start space-x-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800"
                        >
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-red-700 dark:text-red-300 text-sm font-medium">{challenge}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                      <div className="p-2 bg-green-500 rounded-lg mr-3">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      Solutions Implemented
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.solutions.map((solution, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ x: -5 }}
                          className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-green-700 dark:text-green-300 text-sm font-medium">{solution}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Lessons Learned */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="p-2 bg-blue-500 rounded-lg mr-3">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    Lessons Learned
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.lessons_learned.map((lesson, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">{lesson}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Project Links */}
                <motion.div 
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-6 pt-8 border-t border-gray-200 dark:border-dark-700"
                >
                  {selectedProject.github_url && (
                    <motion.a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </motion.a>
                  )}
                  {selectedProject.live_url && (
                    <motion.a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
