import Icon from '@/components/ui/icon';

export default function SupportSection() {
  return (
    <section id="support" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-1.5 mb-4 border border-white/10">
            <Icon name="Headphones" size={14} className="text-purple-brand" />
            <span className="text-white/70 text-sm font-golos">Поддержка</span>
          </div>
          <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">
            Мы всегда <span className="text-gradient-purple">на связи</span>
          </h2>
          <p className="text-white/50 font-golos">Среднее время ответа — 3 минуты</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Telegram */}
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass rounded-2xl p-8 flex flex-col items-center text-center gap-4 border border-white/8 hover:border-blue-400/40 transition-all hover:scale-[1.02] group"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              ✈
            </div>
            <div>
              <h3 className="font-russo text-white text-xl mb-1">Telegram</h3>
              <p className="text-white/45 text-sm font-golos">Самый быстрый способ связаться с нами</p>
            </div>
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              Написать <Icon name="ArrowRight" size={14} />
            </div>
          </a>

          {/* Info card */}
          <div className="card-glass rounded-2xl p-8 border border-white/8 flex flex-col justify-between">
            <div>
              <h3 className="font-russo text-white text-xl mb-4">Часы работы</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm font-golos">Пн — Пт</span>
                  <span className="text-white font-semibold text-sm font-golos">09:00 — 02:00</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-sm font-golos">Сб — Вс</span>
                  <span className="text-white font-semibold text-sm font-golos">Круглосуточно</span>
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 card-glass-gold rounded-xl px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/70 text-sm font-golos">Сейчас онлайн</span>
            </div>
          </div>
        </div>

        {/* Guarantee banner */}
        <div className="relative overflow-hidden rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(255,165,0,0.08) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(255,165,0,0.15)' }}>
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, hsl(35,100%,55%) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(270,80%,65%) 0%, transparent 50%)`
            }} />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="font-russo text-white text-2xl mb-2">Гарантия возврата</h3>
            <p className="text-white/55 font-golos text-sm max-w-md mx-auto">
              Если по нашей вине возникнет проблема с заказом — полностью возместим стоимость или повторим доставку монет бесплатно.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
