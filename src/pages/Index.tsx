import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BuySection from '@/components/BuySection';
import StatsSection from '@/components/StatsSection';
import ReviewsSection from '@/components/ReviewsSection';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import SupportSection from '@/components/SupportSection';
import Footer from '@/components/Footer';

const SECTIONS = ['hero', 'buy', 'reviews', 'about', 'faq', 'support'];

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'hero');
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (section: string) => {
    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'hsl(220, 20%, 6%)' }}>
      {/* Global bg glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(35,100%,55%) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(270,80%,65%) 0%, transparent 70%)' }}
        />
      </div>

      <Navbar activeSection={activeSection} onNavigate={scrollTo} />

      <div id="hero" ref={(el) => { sectionRefs.current['hero'] = el; }}>
        <HeroSection onNavigate={scrollTo} />
      </div>

      <div className="relative z-10">
        <BuySection />
        <StatsSection />
        <ReviewsSection />
        <AboutSection />
        <FaqSection />
        <SupportSection />
        <Footer />
      </div>
    </div>
  );
}
