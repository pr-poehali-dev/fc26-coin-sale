import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'buy', label: 'Покупка' },
  { id: 'about', label: 'О нас' },
  { id: 'faq', label: 'FAQ' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'support', label: 'Поддержка' },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="card-glass rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center glow-gold">
              <span className="text-sm font-bold text-black">◆</span>
            </div>
            <span className="font-russo text-white text-lg tracking-wide">
              ROMB <span className="text-gradient-gold">COINS</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => onNavigate('buy')}
              className="gradient-gold text-black font-bold text-sm px-5 py-2 rounded-xl glow-gold transition-all hover:scale-105 active:scale-95"
            >
              Купить монеты
            </button>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 card-glass rounded-2xl px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-gold/20 text-gold'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
