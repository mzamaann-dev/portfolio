import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

// Lazy load heavy components that don't need to be immediately visible
const LazyAwards = dynamic(() => import('@/components/Awards'), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>,
  ssr: false
});

const LazyTestimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>,
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <LazyAwards />
      <LazyTestimonials />
      <Contact />
    </main>
  );
}
