import Icon from '@/components/ui/icon';

const FEATURES = [
  {
    icon: 'ShieldCheck',
    title: 'Гарантия от бана',
    desc: 'Используем только безопасный метод трансфер-маркета. За всё время работы — 0 заблокированных аккаунтов.',
  },
  {
    icon: 'Zap',
    title: 'Быстрая доставка',
    desc: '67% заказов выполняется в течение 30 минут. Работаем 24/7 без выходных.',
  },
  {
    icon: 'BadgePercent',
    title: 'Выгодный курс',
    desc: 'Фиксированная цена 140 ₽ за 100 000 монет. Никаких скрытых комиссий.',
  },
  {
    icon: 'HeadphonesIcon',
    title: 'Живая поддержка',
    desc: 'Команда всегда на связи в Telegram. Среднее время ответа — 3 минуты.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-1.5 mb-4 border border-white/10">
            <Icon name="Info" size={14} className="text-purple-brand" />
            <span className="text-white/70 text-sm font-golos">О нас</span>
          </div>
          <h2 className="font-russo text-4xl md:text-5xl text-white mb-4">
            Почему выбирают <span className="text-gradient-gold">Romb Coins</span>
          </h2>
          <p className="text-white/50 font-golos max-w-xl mx-auto">
            Мы — команда геймеров, которые знают FC26 изнутри. Никаких ботов, только ручной перевод монет.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="card-glass rounded-2xl p-7 border border-white/8 hover:border-gold/20 transition-all group hover:scale-[1.01]"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={f.icon} size={22} className="text-gold" />
              </div>
              <h3 className="font-russo text-white text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm font-golos leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
