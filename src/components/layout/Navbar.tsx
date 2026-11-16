import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onLock: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLock }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('landing');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['landing', 'about', 'story', 'future', 'financial', 'budget', 'memories', 'letter'];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'landing', label: 'Beranda' },
    { id: 'about', label: 'Tentang Raihan' },
    { id: 'story', label: 'Kisah Kita' },
    { id: 'future', label: 'Masa Depan' },
    { id: 'financial', label: 'Rencana Tabungan' },
    { id: 'budget', label: 'Budget Pernikahan' },
    { id: 'memories', label: 'Kenangan' },
    { id: 'letter', label: 'Surat untuk Arum' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-rose-100 py-2.5'
          : 'bg-gradient-to-b from-white/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => scrollTo('landing')}
          className="flex items-center gap-2 group text-left"
        >
          <span className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-blush-600 group-hover:scale-110 transition-transform shadow-xs">
            <Heart className="w-4 h-4 fill-blush-500 text-blush-500" />
          </span>
          <div>
            <span className="font-serif font-bold text-gray-900 text-base md:text-lg block tracking-wide">
              Our Journey
            </span>
            <span className="font-script text-xs text-blush-600 block -mt-1">
              Raihan & Arum
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-full border border-rose-100/60 shadow-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blush-500 text-white shadow-xs'
                  : 'text-gray-600 hover:text-blush-600 hover:bg-rose-50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Lock presentation button */}
          <button
            onClick={onLock}
            title="Kunci Akses Presentasi"
            className="p-2 text-gray-500 hover:text-blush-600 hover:bg-rose-50 rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Kunci</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="xl:hidden p-2 text-gray-700 hover:bg-rose-50 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-md border-b border-rose-100 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5 mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blush-50 text-blush-700 font-semibold'
                    : 'text-gray-700 hover:bg-rose-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
