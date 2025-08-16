'use client';

import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { User, Code, Globe, Award, Star, TrendingUp, Users, Zap, Target, Heart, Sparkles } from 'lucide-react';
import { getProfileData } from '@/lib/profileData';
import Counter from '@/components/Counter';
import '@/lib/i18n';

export default function About() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeSkillCategory, setActiveSkillCategory] = useState('frontend');
  const [isClient, setIsClient] = useState(false);
  const [profileData, setProfileData] = useState(getProfileData('en'));
  const [title, setTitle] = useState('About Me');
  const [subtitle, setSubtitle] = useState('Passionate about creating innovative solutions');
  const [languagesTitle, setLanguagesTitle] = useState('Languages');
  const [skillsTitle, setSkillsTitle] = useState('Skills & Technologies');
  const [skillCategories, setSkillCategories] = useState([
    { key: 'frontend', title: 'Frontend', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { key: 'backend', title: 'Backend', icon: Code, color: 'from-green-500 to-emerald-500' },
    { key: 'devops', title: 'DevOps', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { key: 'tools', title: 'Tools', icon: Target, color: 'from-orange-500 to-red-500' },
  ]);

  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update translations and profile data after i18n is initialized
  useEffect(() => {
    if (isClient) {
      setTitle(t('about.title'));
      setSubtitle(t('about.subtitle'));
      setLanguagesTitle(t('about.languages.title'));
      setSkillsTitle(t('about.skills.title'));
      setSkillCategories([
        { key: 'frontend', title: t('about.skills.frontend'), icon: Code, color: 'from-blue-500 to-cyan-500' },
        { key: 'backend', title: t('about.skills.backend'), icon: Code, color: 'from-green-500 to-emerald-500' },
        { key: 'devops', title: t('about.skills.devops'), icon: Zap, color: 'from-purple-500 to-pink-500' },
        { key: 'tools', title: t('about.skills.tools'), icon: Target, color: 'from-orange-500 to-red-500' },
      ]);

      // Update profile data based on current language
      setProfileData(getProfileData(i18n.language));
    }
  }, [t, i18n.language, isClient]);

  const containerVariants = {
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

  return (
    <section ref={containerRef} id="about" className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: springY1 }}
          className="absolute top-20 left-10 w-32 h-32 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: springY2 }}
          className="absolute top-40 right-20 w-40 h-40 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: springY3 }}
          className="absolute bottom-20 left-1/3 w-36 h-36 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <div ref={ref} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Bento Grid Layout - Restructured for better balance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6 auto-rows-auto"
        >
          {/* Profile Card - Large */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 lg:row-span-2 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-dark-700/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                <div className="p-3 lg:p-4 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl">
                  <User className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    {profileData.personal.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold text-base lg:text-lg">
                    {profileData.personal.title}
                  </p>
                </div>
              </div>
              
                                                           <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 lg:mb-8">
                  {t('about.bio')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-3 lg:p-4 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-2xl border border-primary-200 dark:border-primary-800"
              >
                <div className="flex justify-center mb-2">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {profileData.personal.yearsOfExperience}
                </div>
                                 <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                   {t('experience.years')} of Experience
                 </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-3 lg:p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
              >
                <div className="flex justify-center mb-2">
                  <Code className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  <Counter 
                    end={parseInt(profileData.personal.numberOfProjects)} 
                    duration={1.5}
                    className="font-bold"
                    suffix="+"
                  />
                </div>
                                 <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                   {t('experience.projectsCompleted')}
                 </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Languages Card - Small */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-dark-700/50"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {languagesTitle}
              </h4>
            </div>
            <div className="space-y-1.5">
              {profileData.languages.map((lang) => (
                <motion.div
                  key={lang.name}
                  variants={cardVariants}
                  whileHover={{ y: -1, scale: 1.01 }}
                  className="flex items-center justify-between p-1.5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-600 rounded-lg border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                >
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {lang.name}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs font-semibold ${
                    lang.proficiency === 'Native' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    lang.proficiency === 'Fluent' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    lang.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                  }`}>
                    {lang.proficiency === 'Native' ? 'Native' : 
                     lang.proficiency === 'Fluent' ? 'Fluent' : 
                     lang.proficiency === 'Intermediate' ? 'Int.' : 
                     lang.proficiency === 'Learning' ? 'Learn.' : 'Basic'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Passion Card - Small */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold">Passion</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Building products that make a difference in people's lives.
            </p>
          </motion.div>

          {/* Innovation Card - Small */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold">Innovation</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Exploring new technologies and pushing boundaries in web development.
            </p>
          </motion.div>

          {/* Problem Solver Card - Small */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold">Problem Solver</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Turning complex challenges into elegant, scalable solutions that drive business growth.
            </p>
          </motion.div>

          {/* Team Player Card - Small */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold">Team Player</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Collaborative leader who thrives in cross-functional teams and mentors junior developers.
            </p>
          </motion.div>

          {/* Continuous Learner Card - Small */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h4 className="text-sm font-semibold">Always Learning</h4>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              Constantly updating skills and staying ahead of industry trends and best practices.
            </p>
          </motion.div>

          {/* Skills Card - Large */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 lg:row-span-2 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-dark-700/50"
          >
            <div className="flex items-center space-x-3 mb-4 lg:mb-6">
              <div className="p-2 lg:p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Award className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                {skillsTitle}
              </h3>
            </div>

            {/* Skill Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
              {skillCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.key}
                    onClick={() => setActiveSkillCategory(category.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg font-medium transition-all duration-300 text-xs lg:text-sm ${
                      activeSkillCategory === category.key
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                    }`}
                  >
                    <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span>{category.title}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Skills Display */}
            <div className="space-y-3 lg:space-y-4">
              {skillCategories.map((category) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: activeSkillCategory === category.key ? 1 : 0,
                    height: activeSkillCategory === category.key ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`overflow-hidden ${activeSkillCategory === category.key ? 'block' : 'hidden'}`}
                >
                  <div className="flex flex-wrap gap-1.5 lg:gap-2">
                    {profileData.skills[category.key as keyof typeof profileData.skills].map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-2 lg:px-3 py-1 lg:py-1.5 bg-gradient-to-r ${category.color} text-white rounded-full text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats Card - Medium */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-dark-700/50 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-6 lg:mb-8">
                <div className="p-2 lg:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Star className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h4 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
                  Quick Highlights
                </h4>
              </div>
              
              {/* Compact Grid Layout */}
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Support Available</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">Expert</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Problem Solving</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">5+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Team Leadership</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">99.9%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Performance</div>
                </div>
                <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">Fast</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Delivery</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
