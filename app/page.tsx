import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Awards from '@/components/Awards';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Awards />
      <Testimonials />
      <Contact />
    </main>
  );
}
