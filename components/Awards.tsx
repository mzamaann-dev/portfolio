'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo, useEffect } from 'react';
import { Award, Calendar, ArrowRight, ChevronRight, ArrowUp, ArrowDown, Database, Code, Users, Trophy, FileText, X, ExternalLink } from 'lucide-react';
import { getProfileData } from '@/lib/profileData';
import '@/lib/i18n';

function Awards() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'showcase' | 'timeline'>('showcase');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [profileData, setProfileData] = useState(getProfileData(i18n.language));

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

  // Parse date string to Date object
  const parseDate = (dateString: string): Date => {
    // Handle various date formats
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }

    // Handle "Month Year" format (e.g., "January 2024")
    const monthYearMatch = dateString.match(/(\w+)\s+(\d{4})/);
    if (monthYearMatch) {
      const month = monthYearMatch[1];
      const year = parseInt(monthYearMatch[2]);
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      return new Date(year, monthIndex, 1);
    }

    // Fallback to current date if parsing fails
    return new Date();
  };

  // Combine awards and certifications with parsed dates
  const allItems = useMemo(() => {
    const items = [
      ...profileData.awards.map(item => ({ ...item, category: 'awards', parsedDate: parseDate(item.date) })),
      ...profileData.certifications.map(item => ({ ...item, category: 'certifications', parsedDate: parseDate(item.date) }))
    ];

    // Sort by date based on sort order
    return items.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.parsedDate.getTime() - b.parsedDate.getTime();
      } else {
        return b.parsedDate.getTime() - a.parsedDate.getTime();
      }
    });
  }, [sortOrder, profileData.awards, profileData.certifications]);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    return activeFilter === 'all'
      ? allItems
      : allItems.filter(item => item.type === activeFilter || item.category === activeFilter);
  }, [allItems, activeFilter]);

  const handleViewCredential = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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

  // Achievement statistics
  const stats = [
    { label: 'Total Achievements', value: allItems.length, icon: Trophy },
    { label: 'Awards Won', value: profileData.awards.length, icon: Award },
    { label: 'Certifications', value: profileData.certifications.length, icon: FileText },
    { label: 'Years of Excellence', value: '5+', icon: Calendar },
  ];

  return (
    <section key={i18n.language} ref={containerRef} id="awards" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
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
            {t('awards.title')}
          </motion.h2>
                     <motion.p
             variants={itemVariants}
             className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
           >
             {t('awards.subtitle')}
           </motion.p>
        </motion.div>

        {/* Achievement Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 dark:border-dark-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-xl p-2 border border-white/20 dark:border-dark-700/50 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('showcase')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${viewMode === 'showcase'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
              >
                {t("awards.view.showcase")}
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${viewMode === 'timeline'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                  }`}
              >
                {t("awards.view.timeline")}
              </button>
            </div>
          </div>
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${activeFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white/80 dark:bg-dark-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-dark-700 border border-white/20 dark:border-dark-700/50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Sort Order Toggle (only visible in timeline view) */}
        {viewMode === 'timeline' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center mb-8"
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
        )}

        {/* Showcase View */}
        {viewMode === 'showcase' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {/* Featured Achievement - Hero Card */}
            {filteredItems.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden"
              >
                <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                          {React.createElement(getIcon(filteredItems[0].icon), { className: "w-8 h-8 text-white" })}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white/80 uppercase tracking-wide">
                            Featured Achievement
                          </div>
                          <div className="text-lg font-semibold text-white/90">
                            {filteredItems[0].date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          {filteredItems[0].category}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                      {filteredItems[0].name}
                    </h3>
                    <p className="text-xl font-semibold text-white/90 mb-6">
                      {filteredItems[0].issuer}
                    </p>
                    <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-3xl">
                      {filteredItems[0].description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {filteredItems[0].tags?.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => handleViewCredential(filteredItems[0])}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-3 bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span>{t("awards.view_details")}</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid Layout for Other Achievements */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.slice(1).map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={`${item.category}-${item.id}`}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative h-full"
                  >
                    {/* Card Background with Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-600 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative bg-white/95 dark:bg-dark-800/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-dark-700/50 overflow-hidden h-full flex flex-col">
                      {/* Top Section */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl shadow-lg">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                            {item.category}
                          </div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.date}
                          </div>
                        </div>
                      </div>

                      {/* Content Section - Flex grow to fill available space */}
                      <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors leading-tight line-clamp-2">
                          {item.name}
                        </h3>

                        <p className="text-base font-semibold text-primary-600 dark:text-primary-400">
                          {item.issuer}
                        </p>

                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Tags Section */}
                      <div className="flex flex-wrap gap-2 mt-6 mb-6">
                        {item.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-xs font-semibold border border-primary-200 dark:border-primary-800"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags && item.tags.length > 2 && (
                          <span className="px-3 py-1.5 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold border border-gray-300 dark:border-dark-600">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Action Button - Fixed at bottom */}
                      <motion.button
                        onClick={() => handleViewCredential(item)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-2xl mt-auto"
                      >
                        <span>{t("awards.view_details")}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No achievements found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your filters to see more achievements and certifications.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 to-blue-600 rounded-full"></div>

            <div className="space-y-12">
              {filteredItems.map((item, index) => {
                const Icon = getIcon(item.icon);
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={`${item.category}-${item.id}`}
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
                      className={`flex-1 ${isEven ? 'ml-8 rtl:mr-8 rtl:ml-0' : 'mr-8 rtl:ml-8 rtl:mr-0'} max-w-md`}
                    >
                      <div className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-dark-700/50">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                          <div className="p-2 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                              {item.category}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {item.date}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
                          {item.issuer}
                        </p>
                        <p className="text-gray-700 dark:text-gray-200 text-sm mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-xs font-semibold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <motion.button
                          onClick={() => handleViewCredential(item)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center space-x-2 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-300"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedItem ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${selectedItem ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: selectedItem ? 1 : 0.95, opacity: selectedItem ? 1 : 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedItem && (
            <>
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl">
                      {React.createElement(getIcon(selectedItem.icon), { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedItem.name}
                      </h2>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold">
                        {selectedItem.issuer}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Date</h3>
                    <p className="text-gray-700 dark:text-gray-300">{selectedItem.date}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Type</h3>
                    <p className="text-gray-700 dark:text-gray-300 capitalize">{selectedItem.type}</p>
                  </div>
                </div>

                {selectedItem.tags && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {'url' in selectedItem && selectedItem.url && (
                  <div className="pt-6 border-t border-gray-200 dark:border-dark-700">
                    <a
                      href={selectedItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Credential</span>
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default React.memo(Awards);
