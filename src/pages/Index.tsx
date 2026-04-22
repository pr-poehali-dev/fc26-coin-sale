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
  { ago: '1 мин назад',  pack: '100K', amount: '+ 500K', idx: 8 },
  { ago: '2 мин назад',  pack: '500K', amount: '+ 1.2M', idx: 2 },
  { ago: '5 мин назад',  pack: '1.2M', amount: '',       idx: 5 },
];

const RATE = 140 / 100_000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? '#3b82f6' : '#1a2540', fontSize: 12 }}>★</span>
      ))}
    </div>
  );
}

function fmt(n: number) {
  return n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1_000}K`;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function LogoDiamond() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 0,
          background: 'transparent',
          boxShadow: '0 0 60px rgba(59,130,246,0.4)',
          transform: 'rotate(45deg) scale(0.88)',
          pointerEvents: 'none',
        }}
      />
      {/* Diamond */}
      <div className="logo-diamond flex items-center justify-center">
        <span className="logo-r select-none">R</span>
      </div>
      {/* Shield badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 2,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(5,8,18,0.9)',
          border: '1px solid rgba(59,130,246,0.5)',
          borderRadius: '50%',
          width: 22,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(59,130,246,0.6)',
          zIndex: 10,
        }}
      >
        <Icon name="ShieldCheck" size={12} style={{ color: '#60a5fa' }} />
      </div>
    </div>
  );
}

// ─── Calculator Modal ─────────────────────────────────────────────────────────
function Calculator({ onClose }: { onClose: () => void }) {
  const [coins, setCoins] = useState(1_000_000);
  const price = Math.ceil(coins * RATE);
  const pct = ((coins - 100_000) / 9_900_000) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(3,6,14,0.9)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="glass-panel w-full p-6 relative"
        style={{ maxWidth: 380 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.8), transparent)', borderRadius: 9999 }} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/25 hover:text-white/60 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>

        <h3
          className="font-orbitron font-bold mb-5"
          style={{ fontSize: 16, color: '#e2e8f0', letterSpacing: '0.06em' }}
        >
          Рассчитать стоимость
        </h3>

        {/* Slider */}
        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <span className="text-white/45" style={{ fontSize: 12, fontFamily: 'Rajdhani', letterSpacing: '0.05em' }}>МОНЕТЫ</span>
            <span className="font-rajdhani font-bold" style={{ color: '#60a5fa', fontSize: 14, letterSpacing: '0.04em' }}>{fmt(coins)}</span>
          </div>
          <input
            type="range" min={100_000} max={10_000_000} step={100_000}
            value={coins}
            onChange={e => setCoins(Number(e.target.value))}
            style={{ background: `linear-gradient(to right, #3b82f6 ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}
          />
          <div className="flex justify-between mt-1">
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani' }}>100K</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: 'Rajdhani' }}>10M</span>
          </div>
        </div>

        {/* Quick picks */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {[500_000, 1_000_000, 2_000_000, 5_000_000].map(v => (
            <button
              key={v}
              onClick={() => setCoins(v)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all font-rajdhani font-semibold tracking-wider ${
                coins === v ? 'btn-blue text-white' : 'text-white/45 hover:text-white/75'
              }`}
              style={coins !== v ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
            >
              {fmt(v)}
            </button>
          ))}
        </div>

        {/* Platform */}
        <div className="flex gap-2 mb-5">
          {['🕹️ PS', '🎮 Xbox', '🖥️ ПК'].map(p => (
            <div key={p} className="badge-pill flex-1 justify-center" style={{ fontSize: 10 }}>{p}</div>
          ))}
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.25), transparent)', marginBottom: 16 }} />

        {/* Price */}
        <div className="glass-panel-blue rounded-xl px-4 py-3 flex items-center justify-between mb-4">
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: 'Rajdhani', letterSpacing: '0.06em' }}>ИТОГО</span>
          <div>
            <span className="font-orbitron font-bold glow-text" style={{ fontSize: 22 }}>{price}</span>
            <span style={{ color: '#60a5fa', fontFamily: 'Rajdhani', marginLeft: 4, fontSize: 14 }}>₽</span>
          </div>
        </div>

        <button className="btn-blue w-full text-white py-3 rounded-xl flex items-center justify-center gap-2" style={{ fontSize: 14 }}>
          <span style={{ fontSize: 15 }}>✈</span> Оформить заказ
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [calcOpen, setCalcOpen] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const shown = reviewsExpanded ? REVIEWS : REVIEWS.slice(0, 2);

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* ── BACKGROUND ── */}
      <div className="scene-bg">
        <div className="floor-glow" />
        {/* Streaks */}
        <div className="streak streak-l1" />
        <div className="streak streak-l2" />
        <div className="streak streak-r1" />
        <div className="streak streak-r2" />
        {/* Orange sparks (like image) */}
        <div className="spark" style={{ bottom: '42%', left: '47%', background: '#f97316', '--tx': '18px', '--ty': '-28px', animationDelay: '0s', animationDuration: '2s' } as React.CSSProperties} />
        <div className="spark" style={{ bottom: '40%', left: '52%', background: '#fb923c', '--tx': '-12px', '--ty': '-22px', animationDelay: '0.7s', animationDuration: '2.4s' } as React.CSSProperties} />
        <div className="spark" style={{ bottom: '43%', left: '50%', background: '#fbbf24', width: 2, height: 2, '--tx': '8px', '--ty': '-18px', animationDelay: '1.3s', animationDuration: '1.8s' } as React.CSSProperties} />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

        {/* LOGO + HERO */}
        <div className="flex flex-col items-center text-center pt-10 pb-4 anim-1">
          <LogoDiamond />

          {/* Brand name */}
          <div className="mt-4 mb-1 flex items-center gap-2">
            <div style={{ width: 24, height: 1, background: 'linear-gradient(to left, rgba(59,130,246,0.6), transparent)' }} />
            <span
              className="font-orbitron font-bold tracking-widest chrome-text"
              style={{ fontSize: 'clamp(15px, 4vw, 20px)', letterSpacing: '0.22em' }}
            >
              ROMB COINS
            </span>
            <div style={{ width: 24, height: 1, background: 'linear-gradient(to right, rgba(59,130,246,0.6), transparent)' }} />
          </div>

          {/* Subtitle */}
          <p
            className="font-rajdhani font-semibold"
            style={{ fontSize: 'clamp(13px, 3.5vw, 16px)', color: 'rgba(147,197,253,0.7)', letterSpacing: '0.08em', marginTop: 4 }}
          >
            ПРОДАЖА МОНЕТ FC 26
          </p>
        </div>

        {/* BADGES */}
        <div className="flex items-center justify-center gap-2.5 mb-4 flex-wrap anim-2">
          <div className="badge-pill">
            <Icon name="Shield" size={10} style={{ color: '#60a5fa' }} />
            Comfort method
          </div>
          <div className="badge-pill">
            <Icon name="Zap" size={10} style={{ color: '#60a5fa' }} />
            Без передачи аккаунтов
          </div>
        </div>

        {/* PRICE HINT */}
        <div className="anim-3 mb-3 text-center">
          <span style={{ fontFamily: 'Rajdhani', fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
            1,000,000 МОНЕТ ОТ <span style={{ color: '#60a5fa', fontWeight: 700 }}>140 ₽</span>
          </span>
        </div>

        {/* CTA */}
        <div className="w-full mb-3 anim-3">
          <button
            onClick={() => setCalcOpen(true)}
            className="btn-blue w-full text-white py-3.5 rounded-xl flex items-center justify-center gap-2"
            style={{ fontSize: 14 }}
          >
            <span>✈</span> Рассчитать стоимость
          </button>
        </div>

        {/* PLATFORMS */}
        <div className="flex items-center justify-center gap-6 mb-5 anim-4">
          {[{ l: 'PS', e: '🕹️' }, { l: 'Xbox', e: '🎮' }, { l: 'ПК', e: '🖥️' }].map(p => (
            <div key={p.l} className="flex items-center gap-1.5 font-rajdhani" style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12, letterSpacing: '0.06em' }}>
              <span>{p.e}</span><span>{p.l}</span>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="w-full mb-4" style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.3), transparent)' }} />

        {/* REVIEWS */}
        <div className="glass-panel w-full p-5 mb-3 anim-5">
          {/* Top glint line */}
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)', borderRadius: 9999, marginBottom: -1 }} />

          <h2
            className="font-orbitron font-bold mb-4"
            style={{ fontSize: 13, color: 'rgba(226,232,240,0.9)', letterSpacing: '0.08em' }}
          >
            ОТЗЫВЫ
          </h2>

          {shown.map((r, i) => (
            <div
              key={i}
              className={`py-2.5 flex items-start justify-between gap-3 ${i < shown.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div>
                <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, fontFamily: 'Inter' }}>{r.text}</p>
                <Stars count={r.stars} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, flexShrink: 0, fontFamily: 'Rajdhani', letterSpacing: '0.04em' }}>{r.date}</span>
            </div>
          ))}

          {!reviewsExpanded && (
            <button
              onClick={() => setReviewsExpanded(true)}
              className="mt-2.5 font-rajdhani font-semibold tracking-wider transition-opacity hover:opacity-70"
              style={{ color: '#60a5fa', fontSize: 11, letterSpacing: '0.06em' }}
            >
              ПОКАЗАТЬ ЕЩЁ →
            </button>
          )}
        </div>

        {/* STATS */}
        <div className="glass-panel w-full p-5 mb-3 anim-6" style={{ position: 'relative' }}>
          <h2
            className="font-orbitron font-bold mb-4"
            style={{ fontSize: 13, color: 'rgba(226,232,240,0.9)', letterSpacing: '0.08em' }}
          >
            СТАТИСТИКА
          </h2>

          {/* Total */}
          <div className="flex items-center justify-between py-2.5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <Icon name="BarChart2" size={13} style={{ color: '#3b82f6', flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: 'Inter' }}>9.820 завершённых заказов</span>
            </div>
            <span style={{ fontSize: 11, color: '#f59e0b', fontFamily: 'Rajdhani', fontWeight: 600 }}>+36-/26 🖥</span>
          </div>

          {LIVE_ORDERS.map((o, i) => (
            <div
              key={i}
              className={`flex items-center justify-between py-2.5 ${i < LIVE_ORDERS.length - 1 ? 'border-b' : ''}`}
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  style={{
                    width: 20, height: 20,
                    borderRadius: '50%',
                    background: 'rgba(59,130,246,0.18)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 9, fontWeight: 700, color: '#93c5fd',
                    flexShrink: 0, fontFamily: 'Orbitron',
                  }}
                >
                  {o.idx}
                </div>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: 'Inter' }}>
                  {o.ago} /{' '}
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Rajdhani', fontWeight: 600 }}>{o.pack}</span>
                </span>
              </div>
              {o.amount && (
                <span className="font-rajdhani font-semibold" style={{ fontSize: 12, color: '#60a5fa', letterSpacing: '0.03em' }}>
                  {o.amount} <span style={{ color: 'rgba(255,255,255,0.2)' }}>🖥</span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* GUARANTEE */}
        <div className="glass-panel-blue w-full p-4 flex items-center gap-3 mb-4 anim-7">
          <div
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 15px rgba(59,130,246,0.3)',
            }}
          >
            <Icon name="ShieldCheck" size={18} style={{ color: '#60a5fa' }} />
          </div>
          <div>
            <p className="font-rajdhani font-bold" style={{ fontSize: 14, color: 'rgba(226,232,240,0.85)', letterSpacing: '0.05em' }}>
              ГАРАНТИЯ ОТ БАНА
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 1, fontFamily: 'Inter' }}>
              0 заблокированных аккаунтов за всё время
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center pb-8 font-rajdhani" style={{ fontSize: 11, color: 'rgba(255,255,255,0.13)', letterSpacing: '0.06em' }}>
          © 2026 ROMB COINS · НЕ ЯВЛЯЕТСЯ ОФИЦИАЛЬНЫМ ПАРТНЁРОМ EA SPORTS
        </p>
      </div>

      {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
    </div>
  );
}
