'use client';

import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';
import { useState, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project: string;
  date: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const testimonials: Testimonial[] = profileData.testimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleExpanded = (id: number) => {
    setExpandedTestimonial(expandedTestimonial === id ? null : id);
  };

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

     const renderStars = (rating: number) => {
     return Array.from({ length: 5 }, (_, index) => (
       <Star
         key={index}
         className={`w-6 h-6 ${
           index < rating
             ? 'text-yellow-400 fill-current'
             : 'text-gray-300'
         }`}
       />
     ));
   };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-dark-900">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Main Testimonial Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Background Quote Icon */}
            <Quote className="absolute top-4 right-4 w-16 h-16 text-primary-100 dark:text-primary-900/20" />
            
            {/* Rating */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-1">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
            </div>

                         {/* Testimonial Content */}
             <div className="text-left mb-8">
               <motion.p
                 key={currentIndex}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5 }}
                 className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed ${
                   expandedTestimonial === testimonials[currentIndex].id
                     ? ''
                     : 'line-clamp-4'
                 }`}
               >
                 "{testimonials[currentIndex].content}"
               </motion.p>
               
               {testimonials[currentIndex].content.length > 200 && (
                 <button
                   onClick={() => toggleExpanded(testimonials[currentIndex].id)}
                   className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mt-2 transition-colors duration-200"
                 >
                   {expandedTestimonial === testimonials[currentIndex].id
                     ? t('testimonials.read_less')
                     : t('testimonials.read_more')}
                 </button>
               )}
             </div>

                                      {/* Author Info */}
             <div className="flex items-start space-x-4">
               <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0">
                 <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
               </div>
               <div className="text-left">
                 <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                   {testimonials[currentIndex].name}
                 </h4>
                 <p className="text-gray-600 dark:text-gray-400">
                   {testimonials[currentIndex].position}
                 </p>
                 <p className="text-primary-600 dark:text-primary-400 font-medium">
                   {testimonials[currentIndex].company}
                 </p>
                 <div className="mt-3">
                   <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                     {t('testimonials.project')}:
                   </span>
                   <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
                     {testimonials[currentIndex].project}
                   </p>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-3 bg-white dark:bg-dark-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 dark:bg-primary-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-3 bg-white dark:bg-dark-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>
        </motion.div>

        {/* Testimonial Grid (Desktop) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden lg:grid lg:grid-cols-3 gap-6 mt-16"
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500"
            >
                             <div className="flex items-center mb-4">
                 <div className="flex space-x-1 mr-3">
                   {Array.from({ length: 5 }, (_, index) => (
                     <Star
                       key={index}
                       className={`w-4 h-4 ${
                         index < testimonial.rating
                           ? 'text-yellow-400 fill-current'
                           : 'text-gray-300'
                       }`}
                     />
                   ))}
                 </div>
                 <span className="text-sm text-gray-500 dark:text-gray-400">
                   {testimonial.date}
                 </span>
               </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">
                    {testimonial.position} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
