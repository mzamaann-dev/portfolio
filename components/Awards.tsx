'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Trophy, Users, Award, Database, Code, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

export default function Awards() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');

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

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Combine awards and certifications
  const allItems = [
    ...profileData.awards.map(item => ({ ...item, category: 'awards' })),
    ...profileData.certifications.map(item => ({ ...item, category: 'certifications' }))
  ];

  // Filter items based on active filter
  const filteredItems = activeFilter === 'all' 
    ? allItems 
    : allItems.filter(item => item.type === activeFilter || item.category === activeFilter);

  const handleViewCredential = (item: any) => {
    // For now, just show an alert with the item details
    // In a real application, this could open a modal or navigate to a credential page
    alert(`${item.name} - ${item.issuer}\n\n${item.description}`);
  };

  // Get icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'users': return Users;
      case 'award': return Award;
      case 'database': return Database;
      case 'code': return Code;
      default: return FileText;
    }
  };

  // Filter options
  const filters = [
    { key: 'all', label: t('awards.all'), icon: Users },
    { key: 'award', label: t('awards.awards'), icon: Trophy },
    { key: 'achievement', label: t('awards.achievements'), icon: Award },
    { key: 'certification', label: t('awards.certifications'), icon: FileText },
  ];

  return (
    <section id="awards" className="py-20 bg-gray-50 dark:bg-dark-900">
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
            {t('awards.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('awards.subtitle')}
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <motion.button
                key={filter.key}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 border-2 border-gray-300 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Awards & Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={`${item.category}-${item.id}`}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500"
              >
                <div className="p-6">
                  {/* Header with Icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/40 rounded-xl shadow-sm">
                      <Icon className="w-7 h-7 text-primary-700 dark:text-primary-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors leading-tight">
                    {item.name}
                  </h3>

                  {/* Issuer */}
                  <p className="text-base font-semibold text-primary-600 dark:text-primary-400 mb-4">
                    {item.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-200 mb-5 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* Date */}
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-5 bg-gray-100 dark:bg-dark-700 px-3 py-2 rounded-lg inline-block">
                    {item.date}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-semibold border border-primary-200 dark:border-primary-800"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags && item.tags.length > 3 && (
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold border border-gray-300 dark:border-dark-600">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => handleViewCredential(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>{t('awards.show_credential')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
