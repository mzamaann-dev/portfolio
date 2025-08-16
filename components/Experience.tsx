'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Calendar, MapPin, ArrowRight, Briefcase } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(14,165,233,0.1)_1px,transparent_0)] bg-[length:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
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

        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 h-full rounded-full shadow-lg"
          />

          {/* Work Experience Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 lg:space-y-16"
          >
            {profileData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col`}
              >
                {/* Timeline Dot - Mobile: top, Desktop: center */}
                <motion.div
                  variants={dotVariants}
                  className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:z-10 mb-6 lg:mb-0"
                >
                  <div className="w-6 h-6 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-dark-800 shadow-lg" />
                  <div className="absolute inset-0 w-6 h-6 bg-primary-400 rounded-full animate-ping opacity-20" />
                </motion.div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02
                  }}
                  className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}
                >
                  <div className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300">
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
                        className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg ml-4 flex-shrink-0"
                      >
                        <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </motion.div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-1"
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{exp.duration}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-1"
                      >
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{exp.location}</span>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                        {t('experience.technologies')}:
                      </h6>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-semibold border border-primary-200 dark:border-primary-800"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h6 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                        {t('experience.achievements')}:
                      </h6>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
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
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
