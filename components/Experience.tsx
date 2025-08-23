'use client';

import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Award, Calendar, MapPin, ArrowRight, Briefcase, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { getProfileData } from '@/lib/profileData';
import '@/lib/i18n';

export default function Experience() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [profileData, setProfileData] = useState(getProfileData('en'));

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

  // Update profile data when language changes
  useEffect(() => {
    setProfileData(getProfileData(i18n.language));
  }, [i18n.language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const sortedExperience = useMemo(() => {
    return [...profileData.experience].sort((a, b) => {
      if (sortOrder === 'asc') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
  }, [sortOrder, profileData.experience]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <section ref={containerRef} id="experience" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
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

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('experience.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('experience.subtitle')}
          </motion.p>
        </motion.div>

        {/* Sort Order Toggle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={toggleSortOrder}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-6 py-3 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-xl border border-white/20 dark:border-dark-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {sortOrder === 'asc' ? (
              <>
                <ArrowUp className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Oldest First</span>
              </>
            ) : (
              <>
                <ArrowDown className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Newest First</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Timeline View */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-blue-600 rounded-full"></div>
          
          <div className="space-y-12">
            {sortedExperience.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.company + exp.position}
                  variants={itemVariants}
                  className={`flex items-center ${isEven ? 'flex-row rtl:!flex-row' : 'flex-row-reverse rtl:!flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full shadow-lg border-4 border-white dark:border-dark-900"></div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`flex-1 ${isEven ? 'ml-8 rtl:mr-8 rtl:ml-0' : 'mr-8 rtl:ml-8 rtl:mr-0'} max-w-lg`}
                  >
                    <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-dark-700/50">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {exp.position}
                          </h4>
                          <h5 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                            {exp.company}
                          </h5>
                        </div>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="p-2 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg ml-4 rtl:mr-4 rtl:ml-0 flex-shrink-0"
                        >
                          <Briefcase className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-1 rtl:space-x-reverse"
                        >
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">{exp.duration}</span>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center space-x-1 rtl:space-x-reverse"
                        >
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{exp.location}</span>
                        </motion.div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed text-sm">
                        {exp.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="mb-6">
                        <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                          {t('experience.technologies')}:
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, 4).map((tech) => (
                            <motion.span
                              key={tech}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-xs font-semibold border border-primary-200 dark:border-primary-800"
                            >
                              {tech}
                            </motion.span>
                          ))}
                          {exp.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold border border-gray-300 dark:border-dark-600">
                              +{exp.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                          {t('experience.achievements')}:
                        </h6>
                        <ul className="space-y-2">
                          {exp.achievements.slice(0, 3).map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="text-sm text-gray-700 dark:text-gray-200 flex items-start"
                            >
                              <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                              {achievement}
                            </motion.li>
                          ))}
                          {exp.achievements.length > 3 && (
                            <motion.li
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                            >
                              <ChevronRight className="w-4 h-4 mr-2" />
                              +{exp.achievements.length - 3} more achievements
                            </motion.li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
