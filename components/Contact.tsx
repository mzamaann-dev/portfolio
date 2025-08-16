'use client';

import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Github, Linkedin, Globe, Clock, CheckCircle, MessageCircle, Calendar } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const socialLinks = [
    { icon: Github, href: profileData.personal.social.github, label: 'GitHub', color: 'hover:bg-gray-900 hover:text-white' },
    { icon: Linkedin, href: profileData.personal.social.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
    { icon: Globe, href: profileData.personal.social.portfolio, label: 'Portfolio', color: 'hover:bg-purple-600 hover:text-white' },
  ];

  return (
    <section ref={containerRef} id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 relative overflow-hidden">
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
            {t('contact.title')}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information & Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Contact Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-xl border border-white/20 dark:border-dark-700/50">
                <div className="flex justify-center mb-2">
                  <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{profileData.personal.responseTime}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
              </div>
              <div className="text-center p-4 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-xl border border-white/20 dark:border-dark-700/50">
                <div className="flex justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-xl border border-white/20 dark:border-dark-700/50">
                <div className="flex justify-center mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{profileData.personal.numberOfProjects}+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Projects Done</div>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg border border-white/20 dark:border-dark-700/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Get in touch
              </h3>
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.email')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{profileData.personal.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('contact.location')}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{profileData.personal.location}</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-xl border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300"
                >
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Open to opportunities</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links & Call to Action */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Social Links */}
            <motion.div variants={itemVariants} className="bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-lg border border-white/20 dark:border-dark-700/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('contact.social')}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 bg-gray-100 dark:bg-dark-700 rounded-xl transition-all duration-300 group ${social.color}`}
                    >
                      <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors mx-auto" />
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors text-center mt-2">
                        {social.label}
                      </p>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-6 lg:p-8 text-center text-white"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Ready to collaborate?
              </h3>
              <p className="text-primary-100 mb-6">
                Let's discuss your next project and bring your ideas to life.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`mailto:${profileData.personal.email}`, '_blank')}
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start a conversation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
