'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

export default function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const skillCategories = [
    { key: 'frontend', title: t('about.skills.frontend') },
    { key: 'backend', title: t('about.skills.backend') },
    { key: 'devops', title: t('about.skills.devops') },
    { key: 'tools', title: t('about.skills.tools') },
  ];

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
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {t('about.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('about.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {profileData.personal.name}
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
            >
              {profileData.personal.bio}
            </motion.p>

            {/* Languages */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('about.languages.title')}
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profileData.languages.map((lang) => (
                  <motion.div
                    key={lang.name}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {lang.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lang.proficiency === 'Native' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        lang.proficiency === 'Fluent' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        lang.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                      }`}>
                        {lang.proficiency}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: lang.proficiency === 'Native' ? '100%' : 
                                 lang.proficiency === 'Fluent' ? '90%' : 
                                 lang.proficiency === 'Intermediate' ? '70%' : 
                                 lang.proficiency === 'Learning' ? '30%' : '50%' 
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {lang.proficiency}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-6"
            >
              {t('about.skills.title')}
            </motion.h3>
            <div className="space-y-6">
              {skillCategories.map((category) => (
                <motion.div key={category.key} variants={itemVariants}>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills[category.key as keyof typeof profileData.skills].map((skill) => (
                      <motion.span
                        key={skill}
                        variants={skillVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
