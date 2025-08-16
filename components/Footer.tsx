'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter } from 'lucide-react';
import profileData from '@/data/profile.json';
import '@/lib/i18n';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'GitHub', url: profileData.personal.social.github, icon: Github },
    { name: 'LinkedIn', url: profileData.personal.social.linkedin, icon: Linkedin },
    { name: 'Portfolio', url: profileData.personal.social.portfolio, icon: Linkedin },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 mb-4 md:mb-0"
          >
            <span className="text-gray-400">
              {t('footer.made_with')}
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-500" />
            </motion.div>
            <span className="text-gray-400">
              {t('footer.by')} {profileData.personal.name}
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-4"
          >
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
                  className="p-2 bg-gray-800 dark:bg-dark-700 rounded-lg hover:bg-primary-600 transition-colors group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Copyright Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 pt-8 border-t border-gray-800 dark:border-dark-700"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {profileData.personal.name}. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
