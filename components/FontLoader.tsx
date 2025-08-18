'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Function to load a font with the correct base path
    const loadFont = (fontFamily: string, fontPath: string, fontWeight: string, fontStyle: string = 'normal') => {
      const basePath = window.location.pathname.startsWith('/portfolio') ? '/portfolio' : '';
      const fullPath = `${basePath}${fontPath}`;
      
      // Create a new font face
      const fontFace = new FontFace(fontFamily, `url(${fullPath})`, {
        weight: fontWeight,
        style: fontStyle,
        display: 'swap',
        unicodeRange: 'U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF'
      });

      // Load the font
      fontFace.load().then(() => {
        document.fonts.add(fontFace);
      }).catch((error) => {
        console.error(`Failed to load font ${fontFamily}:`, error);
      });
    };

    // Load all Arabic fonts
    loadFont('GumelaArabic', '/fonts/gumela-arabic-regular.otf', '400');
    loadFont('GumelaArabic', '/fonts/gumela-arabic-light.otf', '300');
    loadFont('GumelaArabic', '/fonts/gumela-arabic-bold.otf', '700');
  }, []);

  return null;
}
