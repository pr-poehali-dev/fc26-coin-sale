import { useState } from 'react';
import Icon from '@/components/ui/icon';

// ─── Data ────────────────────────────────────────────────────────────────────

const REVIEWS = [
  { text: '«Думал развод, но всё норм»', date: '22 апр', stars: 5 },
  { text: '«Лучший курс, всё чётко»', date: '21 апр', stars: 5 },
  { text: '«Монеты пришли за 20 минут»', date: '20 апр', stars: 5 },
  { text: '«Беру уже третий раз — всё топ»', date: '19 апр', stars: 5 },
  { text: '«Честный сервис, рекомендую»', date: '18 апр', stars: 4 },
];

const LIVE_ORDERS = [
  { ago: '25 сек назад', pack: '1M', amount: '+ 100K', idx: 4 },
  { ago: '1 мин назад', pack: '100K', amount: '+ 500K', idx: 8 },
  { ago: '2 мин назад', pack: '500K', amount: '+ 1.2M', idx: 2 },
  { ago: '5 мин назад', pack: '1.2M', amount: '', idx: 5 },
];

const RATE = 140 / 100_000;

// ─── Stars ───────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? '#3b82f6' : '#1e2d4a', fontSize: 13 }}>★</span>
      ))}
    </div>
  );
}

// ─── Calculator modal ────────────────────────────────────────────────────────
function Calculator({ onClose }: { onClose: () => void }) {
  const [coins, setCoins] = useState(1_000_000);
  const price = Math.ceil(coins * RATE);

  const fmt = (n: number) => n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1_000}K`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,8,18,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-sm p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <Icon name="X" size={18} />
        </button>

        <h3 className="text-white font-bold text-lg mb-5">Рассчитать стоимость</h3>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/50">Количество монет</span>
            <span className="text-blue-accent font-semibold">{fmt(coins)}</span>
          </div>
          <input
            type="range" min={100_000} max={10_000_000} step={100_000}
            value={coins}
            onChange={e => setCoins(Number(e.target.value))}
            className="w-full"
            style={{ background: `linear-gradient(to right, #3b82f6 ${((coins - 100_000) / 9_900_000) * 100}%, rgba(255,255,255,0.08) ${((coins - 100_000) / 9_900_000) * 100}%)` }}
          />
          <div className="flex justify-between text-xs text-white/25 mt-1">
            <span>100K</span><span>10M</span>
          </div>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          {[500_000, 1_000_000, 2_000_000, 5_000_000].map(v => (
            <button
              key={v}
              onClick={() => setCoins(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${coins === v ? 'btn-blue text-white' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
            >
              {fmt(v)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-5">
          {['🕹️ PS', '🎮 Xbox', '🖥️ ПК'].map(p => (
            <div key={p} className="badge-pill flex-1 justify-center text-white/50 text-xs">{p}</div>
          ))}
        </div>

        <div className="glass-panel-blue rounded-xl px-4 py-3 flex items-center justify-between mb-4">
          <span className="text-white/55 text-sm">Итого</span>
          <span className="text-blue-accent font-bold text-xl">{price} ₽</span>
        </div>

        <button className="btn-blue w-full text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
          <span>✈</span> Оформить заказ в Telegram
        </button>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function Index() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const shown = reviewsExpanded ? REVIEWS : REVIEWS.slice(0, 2);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="stars-bg" />

      <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

        {/* HERO */}
        <div className="text-center pt-12 pb-5 anim-1">
          <h1 className="text-white font-bold leading-snug mb-2" style={{ fontSize: 'clamp(22px, 5.5vw, 34px)' }}>
            Продажа монет{' '}
            <span className="text-blue-accent">FC 26</span>
          </h1>
          <p className="font-semibold" style={{ fontSize: 'clamp(16px, 4vw, 24px)', color: '#60a5fa' }}>
            Выгодный курс без риска бана
          </p>
        </div>

        {/* BADGES */}
        <div className="flex items-center justify-center gap-2.5 mb-4 flex-wrap anim-2">
          <div className="badge-pill">
            <Icon name="Shield" size={11} className="text-blue-accent" />
            Comfort method
          </div>
          <div className="badge-pill">
            <Icon name="Zap" size={11} className="text-blue-accent" />
            Без передачи аккаунтов
          </div>
        </div>

        {/* PRICE */}
        <div className="text-center mb-3 anim-3">
          <span className="text-white/75 text-sm">
            1,000,000 монет от <span className="text-blue-accent font-semibold">140 ₽</span>
          </span>
        </div>

        {/* CTA */}
        <div className="w-full mb-3 anim-3">
          <button
            onClick={() => setCalcOpen(true)}
            className="btn-blue w-full text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
          >
            <span>✈</span> Рассчитать стоимость
          </button>
        </div>

        {/* PLATFORMS */}
        <div className="flex items-center justify-center gap-5 mb-5 anim-4">
          {[{ l: 'PS', e: '🕹️' }, { l: 'Xbox', e: '🎮' }, { l: 'ПК', e: '🖥️' }].map(p => (
            <div key={p.l} className="flex items-center gap-1.5 text-white/30 text-xs">
              <span>{p.e}</span><span>{p.l}</span>
            </div>
          ))}
        </div>

        {/* CHEVRON */}
        <div className="mb-4 opacity-40">
          <Icon name="ChevronDown" size={18} style={{ color: '#60a5fa' }} />
        </div>

        {/* REVIEWS */}
        <div className="glass-panel w-full p-5 mb-3 anim-5">
          <h2 className="text-white font-bold text-sm mb-3">Отзывы от клиентов</h2>
          {shown.map((r, i) => (
            <div
              key={i}
              className={`py-2.5 flex items-start justify-between gap-3 ${i < shown.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
            >
              <div>
                <p className="text-white/75 text-sm">{r.text}</p>
                <Stars count={r.stars} />
              </div>
              <span className="text-white/30 text-xs flex-shrink-0">{r.date}</span>
            </div>
          ))}
          {!reviewsExpanded && (
            <button
              onClick={() => setReviewsExpanded(true)}
              className="mt-2.5 text-blue-accent text-xs hover:opacity-70 transition-opacity"
            >
              Показать ещё →
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="glass-panel w-full p-5 mb-3 anim-6">
          <h2 className="text-white font-bold text-sm mb-3">Статистика за 30 дней</h2>

          <div className="flex items-center justify-between py-2.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Icon name="BarChart2" size={14} className="text-blue-accent flex-shrink-0" />
              <span className="text-white/65 text-sm">9.820 завершённых заказов</span>
            </div>
            <span className="text-xs" style={{ color: '#f59e0b' }}>+36-/26 🖥</span>
          </div>

          {LIVE_ORDERS.map((o, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2.5 ${i < LIVE_ORDERS.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.2)', fontSize: 10, fontWeight: 700 }}
                >
                  {o.idx}
                </div>
                <span className="text-white/50 text-sm">
                  {o.ago} / <span className="text-white/70">{o.pack}</span>
                </span>
              </div>
              {o.amount && (
                <span className="text-xs text-blue-accent">
                  {o.amount} <span className="text-white/25 ml-1">🖥</span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* GUARANTEE */}
        <div className="glass-panel-blue w-full p-4 flex items-center gap-3 mb-4 anim-7">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(59,130,246,0.15)' }}
          >
            <Icon name="ShieldCheck" size={18} className="text-blue-accent" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-semibold">Гарантия от бана</p>
            <p className="text-white/40 text-xs mt-0.5">0 заблокированных аккаунтов за всё время</p>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-white/15 text-xs pb-8">
          © 2026 Romb Coins · Не является официальным партнёром EA Sports
        </p>
      </div>

      {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
    </div>
  );
}
