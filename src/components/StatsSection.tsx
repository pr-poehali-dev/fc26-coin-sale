import Icon from '@/components/ui/icon';

const STATS = [
  { icon: 'ShoppingBag', value: '266', label: 'заказов за 30 дней', color: 'gold' },
  { icon: 'Coins', value: '460M', label: 'монет переведено', color: 'gold' },
  { icon: 'ShieldCheck', value: '0', label: 'банов аккаунтов', color: 'green' },
];

const SPEED_STATS = [
  { time: '< 30 мин', orders: 180, color: '#22c55e' },
  { time: '< 1 час', orders: 82, color: '#f59e0b' },
  { time: '> 1 час', orders: 4, color: '#ef4444' },
];

export default function StatsSection() {
  const total = SPEED_STATS.reduce((sum, s) => sum + s.orders, 0);

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-1.5 mb-4 border border-white/10">
            <Icon name="BarChart3" size={14} className="text-purple-brand" />
            <span className="text-white/70 text-sm font-golos">Статистика за 30 дней</span>
          </div>
          <h2 className="font-russo text-4xl md:text-5xl text-white">
            Наши <span className="text-gradient-purple">результаты</span>
          </h2>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className={`card-glass rounded-2xl p-5 text-center border transition-all hover:scale-[1.02] ${
                stat.color === 'green'
                  ? 'border-green-500/20 hover:border-green-500/40'
                  : 'border-gold/15 hover:border-gold/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                stat.color === 'green'
                  ? 'bg-green-500/15'
                  : 'bg-gold/15'
              }`}>
                <Icon
                  name={stat.icon}
                  size={20}
                  className={stat.color === 'green' ? 'text-green-400' : 'text-gold'}
                />
              </div>
              <div className={`font-russo text-2xl md:text-3xl mb-1 ${
                stat.color === 'green' ? 'text-green-400' : 'text-gradient-gold'
              }`}>
                {stat.value}
              </div>
              <div className="text-white/40 text-xs font-golos">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Speed stats */}
        <div className="card-glass rounded-2xl p-6 border border-white/8">
          <h3 className="font-russo text-white text-lg mb-5 flex items-center gap-2">
            <Icon name="Zap" size={18} className="text-gold" />
            Скорость выполнения
          </h3>

          <div className="flex flex-col gap-4">
            {SPEED_STATS.map((s) => (
              <div key={s.time}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-golos text-sm text-white/70">{s.time}</span>
                  <span className="font-russo text-sm" style={{ color: s.color }}>
                    {s.orders} заказов
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(s.orders / total) * 100}%`,
                      backgroundColor: s.color,
                      boxShadow: `0 0 8px ${s.color}80`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-xs mt-5 font-golos text-center">
            {Math.round((SPEED_STATS[0].orders / total) * 100)}% заказов выполняются за 30 минут
          </p>
        </div>
      </div>
    </section>
  );
}