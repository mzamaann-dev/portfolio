'use client';

import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Github, ArrowRight, ChevronRight, Eye, Grid, Clock, Database, Code, Globe, Users, Zap, Star, Shield, Search, List, X, User, Award, BookOpen } from 'lucide-react';
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

type ViewMode = 'featured' | 'all';
type FilterType = 'all' | 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'web';

export default function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('featured');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  const projects: Project[] = profileData.projects;

  // Featured projects (first 3-4 most impressive)
  const featuredProjects = projects.slice(0, 3);

  // Filtered projects based on search and category
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (filterType !== 'all') {
      filtered = filtered.filter(project => {
        const techs = project.technologies.map(t => t.toLowerCase());
        switch (filterType) {
          case 'frontend':
            return techs.some(t => ['react', 'vue', 'angular', 'html', 'css', 'javascript', 'typescript'].includes(t));
          case 'backend':
            return techs.some(t => ['node.js', 'python', 'java', 'c#', '.net', 'php', 'ruby'].includes(t));
          case 'fullstack':
            return techs.some(t => ['react', 'vue', 'angular']) && techs.some(t => ['node.js', 'python', 'java', 'c#', '.net']);
          case 'mobile':
            return techs.some(t => ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios'].includes(t));
          case 'web':
            return techs.some(t => ['html', 'css', 'javascript', 'react', 'vue', 'angular'].includes(t));
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, filterType, searchQuery]);

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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const getTechnologyIcon = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <Code className="w-4 h-4" />;
    if (techLower.includes('node')) return <Database className="w-4 h-4" />;
    if (techLower.includes('python')) return <Database className="w-4 h-4" />;
    if (techLower.includes('c#')) return <Shield className="w-4 h-4" />;
    if (techLower.includes('javascript')) return <Code className="w-4 h-4" />;
    return <Code className="w-4 h-4" />;
  };

  const ProjectCard = ({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500 overflow-hidden cursor-pointer ${
        isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-1' : ''
      }`}
      onClick={() => openModal(project)}
    >
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-primary-400 dark:text-primary-500">
            {getTechnologyIcon(project.technologies[0])}
          </div>
        </div>
        {isFeatured && (
          <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
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
              openModal(project);
            }}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center group/btn"
          >
            <Eye className="w-4 h-4 mr-2" />
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-900">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={cardVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('projects.title')}
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>

        {/* Featured Projects Section */}
        {viewMode === 'featured' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-16"
          >
            <motion.h3
              variants={cardVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              Featured Projects
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} isFeatured={true} />
              ))}
            </div>
            
            {/* View All Projects Button */}
            <motion.div
              variants={cardVariants}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('all')}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* All Projects Section */}
        {viewMode === 'all' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Controls */}
            <div className="mb-8 space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2">
                  {(['all', 'frontend', 'backend', 'fullstack', 'mobile', 'web'] as FilterType[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterType(filter)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        filterType === filter
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredProjects.length} projects found
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setDisplayMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      displayMode === 'grid'
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDisplayMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      displayMode === 'list'
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects Grid/List */}
            {displayMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500 p-6 cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl flex items-center justify-center">
                        {getTechnologyIcon(project.technologies[0])}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(project);
                          }}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <div className="flex space-x-2">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
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
                              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                            >
                              <Globe className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Back to Featured */}
            <motion.div
              variants={cardVariants}
              className="text-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('featured')}
                className="inline-flex items-center space-x-3 px-6 py-3 bg-white dark:bg-dark-800 border-2 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl font-semibold transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Featured</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                    {t('projects.technologies')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Key Features */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                    {t('projects.features')}
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Architecture */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                    {t('projects.architecture')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </motion.div>

                {/* Performance */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                    {t('projects.performance')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedProject.performance}
                  </p>
                </motion.div>

                {/* Challenges & Solutions */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-red-600 dark:text-red-400" />
                      {t('projects.challenges')}
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
                      {t('projects.solutions')}
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Lessons Learned */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
                    {t('projects.lessons_learned')}
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.lessons_learned.map((lesson, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Project Links */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-dark-700">
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      <span>{t('projects.view_code_btn')}</span>
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300"
                    >
                      <Globe className="w-5 h-5" />
                      <span>{t('projects.live_demo_btn')}</span>
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
