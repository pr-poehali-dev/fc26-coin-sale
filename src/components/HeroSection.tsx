interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 gradient-hero" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: 'radial-gradient(circle, hsl(270,80%,65%) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-float"
          style={{ animationDelay: '3s', background: 'radial-gradient(circle, hsl(35,100%,55%) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(220,80%,50%) 0%, transparent 70%)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,165,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 card-glass-gold rounded-full px-4 py-2 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium text-gold/90">266 заказов за 30 дней • 0 банов</span>
        </div>

        {/* Heading */}
        <h1 className="font-russo text-5xl md:text-7xl leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: '0.1s' }}>
          <span className="text-white">ПРОДАЖА МОНЕТ</span>
          <br />
          <span className="text-gradient-gold">FC 26</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/70 mb-4 font-golos animate-fade-in"
          style={{ animationDelay: '0.2s' }}>
          Выгодный курс с <span className="text-gold font-semibold">гарантией от бана</span>
        </p>

        <p className="text-base text-white/40 mb-12 font-golos animate-fade-in"
          style={{ animationDelay: '0.3s' }}>
          100 000 монет = 140 ₽ &nbsp;·&nbsp; ПК, Xbox, PlayStation
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => onNavigate('buy')}
            className="group relative overflow-hidden gradient-gold text-black font-bold text-lg px-10 py-4 rounded-2xl glow-gold transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              ◆ Рассчитать стоимость
            </span>
          </button>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass border border-white/10 text-white font-semibold text-lg px-10 py-4 rounded-2xl transition-all hover:scale-105 hover:border-white/20 active:scale-95 w-full sm:w-auto flex items-center gap-2 justify-center"
          >
            <span>✈</span> Купить в Telegram
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in"
          style={{ animationDelay: '0.5s' }}>
          {[
            { value: '266', label: 'заказов' },
            { value: '460M', label: 'монет продано' },
            { value: '0', label: 'банов' },
          ].map((s) => (
            <div key={s.label} className="card-glass rounded-xl py-3 px-2 text-center">
              <div className="font-russo text-2xl text-gradient-gold">{s.value}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/50" />
        <span className="text-xs text-white/50">прокрути вниз</span>
      </div>
    </section>
  );
}
