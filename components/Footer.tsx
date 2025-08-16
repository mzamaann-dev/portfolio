'use client';

import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Github, Linkedin, Globe, Mail, MapPin, ArrowUp, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

export default function Footer() {
  const { t } = useTranslation();

  // Parallax effects
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const socialLinks = [
    { name: 'GitHub', url: profileData.personal.social.github, icon: Github, color: 'hover:bg-gray-900 hover:text-white' },
    { name: 'LinkedIn', url: profileData.personal.social.linkedin, icon: Linkedin, color: 'hover:bg-blue-600 hover:text-white' },
    { name: 'Portfolio', url: profileData.personal.social.portfolio, icon: Globe, color: 'hover:bg-purple-600 hover:text-white' },
  ];

  const quickLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.awards'), href: '#awards' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 text-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: springY }}
          className="absolute top-10 left-10 w-32 h-32 bg-primary-400/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: springY }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{profileData.personal.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{profileData.personal.name}</h3>
                  <p className="text-gray-400">{profileData.personal.title}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {profileData.personal.bio}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{profileData.personal.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{profileData.personal.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{profileData.personal.responseTime}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="block text-gray-300 hover:text-primary-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Stats & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex justify-center mb-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-sm font-bold text-white">100%</div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="flex justify-center mb-1">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-sm font-bold text-white">{profileData.personal.numberOfProjects}+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-300 group ${social.color}`}
                    >
                      <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/20 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-gray-400 text-sm">
                {t('footer.made_with')}
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              <span className="text-gray-400 text-sm">
                {t('footer.by')} {profileData.personal.name}
              </span>
            </div>

            {/* Copyright Text */}
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {profileData.personal.name}. {t('footer.rights')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
