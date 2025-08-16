# Modern Portfolio Website

A beautiful, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include multi-language support (English with future Arabic support), RTL support, dark/light theme switching, smooth animations, and easy data management.

## ✨ Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Multi-language Support**: English (with future Arabic support)
- **RTL Support**: Full right-to-left layout support for Arabic
- **Theme Switching**: Light, dark, and system preference modes
- **Smooth Animations**: Framer Motion for micro-interactions
- **Responsive Design**: Mobile-first approach
- **Easy Data Management**: JSON-based content (no rebuilds needed)
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **GitHub Pages Ready**: Static export configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Personal Information

Edit `data/profile.json` to update your personal information:

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Full Stack Engineer",
    "email": "your.email@example.com",
    "location": "City, Country",
    "bio": "Your bio here...",
    "social": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername",
      "twitter": "https://twitter.com/yourusername"
    }
  }
}
```

### Adding New Content

- **Experience**: Add new entries to the `experience` array
- **Projects**: Add new entries to the `projects` array
- **Certifications**: Add new entries to the `certifications` array
- **Skills**: Update the `skills` object with your technologies

### Styling

- Colors: Modify the color palette in `tailwind.config.js`
- Animations: Adjust animation settings in components
- Layout: Update component styles in individual files

## 🌐 Multi-language Support

The portfolio currently supports:
- English (en) - LTR layout

Future support planned:
- Arabic (ar) - RTL layout

Translation files are located in `locales/`. To add Arabic support in the future:

1. Create `locales/ar.json` with Arabic translations
2. Uncomment the Arabic language configuration in `lib/i18n.ts`
3. Uncomment the Arabic language option in `components/Header.tsx`

## 🎨 Themes

Three theme options are available:
- **Light**: Clean, bright interface
- **Dark**: Easy on the eyes
- **System**: Automatically matches your OS preference

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🚀 Deployment

### GitHub Pages

1. Update `next.config.js` with your repository name:
```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

2. Build and export:
```bash
npm run export
```

3. Deploy the `out` folder to GitHub Pages.

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy automatically on push

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `out` folder to Netlify

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Internationalization**: i18next
- **RTL Support**: Custom CSS with direction-aware layouts
- **Deployment**: Static Export

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles (includes RTL support)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header (with RTL support)
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Experience.tsx     # Experience section
│   ├── Projects.tsx       # Projects section
│   ├── Contact.tsx        # Contact section
│   ├── Footer.tsx         # Footer
│   └── ThemeProvider.tsx  # Theme context
├── data/                  # Content data
│   └── profile.json       # Personal information
├── lib/                   # Utilities
│   ├── i18n.ts           # Internationalization
│   └── utils.ts          # Helper functions
├── locales/              # Translation files
│   └── en.json           # English (Arabic to be added)
└── public/               # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me directly

---

Made with ❤️ by [Your Name]
