import { useState } from 'react';
import Icon from '@/components/ui/icon';

const REVIEWS = [
  { text: '«Думал развод, но всё норм»', date: '22 апр', stars: 5 },
  { text: '«Лучший курс, всё чётко»', date: '21 апр', stars: 5 },
  { text: '«Монеты пришли за 20 минут»', date: '20 апр', stars: 5 },
  { text: '«Беру уже третий раз — всё топ»', date: '19 апр', stars: 5 },
  { text: '«Честный сервис, рекомендую»', date: '18 апр', stars: 4 },
];

const LIVE_ORDERS = [
  { ago: '25 сек назад', pack: '1M',   amount: '+ 100K', idx: 4 },
  { ago: '1 мин назад',  pack: '100K', amount: '+ 500K', idx: 8 },
  { ago: '2 мин назад',  pack: '500K', amount: '+ 1.2M', idx: 2 },
  { ago: '5 мин назад',  pack: '1.2M', amount: '',        idx: 5 },
];

const RATE = 140 / 100_000;
const fmt = (n: number) => n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1_000}K`;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? '#3b82f6' : '#1a2540', fontSize: 11 }}>★</span>
      ))}
    </div>
  );
}

function LogoDiamond({ size = 90 }: { size?: number }) {
  const s = size * 0.76;
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="logo-diamond flex items-center justify-center"
        style={{ width: s, height: s }}
      >
        <span className="logo-r select-none" style={{ fontSize: s * 0.38 }}>R</span>
      </div>
      <div style={{
        position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(5,8,18,0.92)', border: '1px solid rgba(59,130,246,0.5)',
        borderRadius: '50%', width: 20, height: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 10px rgba(59,130,246,0.6)', zIndex: 10,
      }}>
        <Icon name="ShieldCheck" size={11} style={{ color: '#60a5fa' }} />
      </div>
    </div>
  );
}

// ─── Inline Calculator (right panel) ─────────────────────────────────────────
function CalcPanel() {
  const [coins, setCoins] = useState(1_000_000);
  const price = Math.ceil(coins * RATE);
  const pct = ((coins - 100_000) / 9_900_000) * 100;

  return (
    <div className="glass-panel p-6 flex flex-col h-full" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.7), transparent)', borderRadius: 9999 }} />

      <h2 className="font-orbitron font-bold mb-5" style={{ fontSize: 14, color: '#e2e8f0', letterSpacing: '0.08em' }}>
        РАССЧИТАТЬ СТОИМОСТЬ
      </h2>

      {/* Slider */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span style={{ fontSize: 11, fontFamily: 'Rajdhani', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.38)' }}>МОНЕТЫ</span>
          <span className="font-rajdhani font-bold" style={{ color: '#60a5fa', fontSize: 13 }}>{fmt(coins)}</span>
        </div>
        <input
          type="range" min={100_000} max={10_000_000} step={100_000}
          value={coins}
          onChange={e => setCoins(Number(e.target.value))}
          style={{ background: `linear-gradient(to right, #3b82f6 ${pct}%, rgba(255,255,255,0.08) ${pct}%)` }}
        />
        <div className="flex justify-between mt-1">
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', fontFamily: 'Rajdhani' }}>100K</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', fontFamily: 'Rajdhani' }}>10M</span>
        </div>
      </div>

      {/* Quick picks */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[500_000, 1_000_000, 2_000_000, 5_000_000].map(v => (
          <button
            key={v}
            onClick={() => setCoins(v)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all font-rajdhani font-semibold tracking-wider ${coins === v ? 'btn-blue text-white' : 'text-white/40 hover:text-white/70'}`}
            style={coins !== v ? { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' } : {}}
          >
            {fmt(v)}
          </button>
        ))}
      </div>

      {/* Platforms */}
      <div className="flex gap-2 mb-5">
        {['🕹️ PS', '🎮 Xbox', '🖥️ ПК'].map(p => (
          <div key={p} className="badge-pill flex-1 justify-center" style={{ fontSize: 10 }}>{p}</div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Price */}
      <div className="glass-panel-blue rounded-xl px-4 py-3 flex items-center justify-between mb-4">
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'Rajdhani', letterSpacing: '0.07em' }}>ИТОГО</span>
        <div className="flex items-baseline gap-1">
          <span className="font-orbitron font-bold glow-text" style={{ fontSize: 24 }}>{price}</span>
          <span style={{ color: '#60a5fa', fontFamily: 'Rajdhani', fontSize: 14 }}>₽</span>
        </div>
      </div>

      <button className="btn-blue w-full text-white py-3 rounded-xl flex items-center justify-center gap-2" style={{ fontSize: 13 }}>
        <span>✈</span> Оформить заказ
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const shown = reviewsExpanded ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="scene-bg">
        <div className="floor-glow" />
        <div className="streak streak-l1" />
        <div className="streak streak-l2" />
        <div className="streak streak-r1" />
        <div className="streak streak-r2" />
        <div className="spark" style={{ bottom: '38%', left: '47%', background: '#f97316', '--tx': '18px', '--ty': '-28px', animationDelay: '0s', animationDuration: '2s' } as React.CSSProperties} />
        <div className="spark" style={{ bottom: '36%', left: '52%', background: '#fb923c', '--tx': '-12px', '--ty': '-22px', animationDelay: '0.7s', animationDuration: '2.4s' } as React.CSSProperties} />
        <div className="spark" style={{ bottom: '39%', left: '50%', background: '#fbbf24', width: 2, height: 2, '--tx': '8px', '--ty': '-18px', animationDelay: '1.3s', animationDuration: '1.8s' } as React.CSSProperties} />
      </div>

      {/* PAGE WRAPPER */}
      <div className="relative z-10 min-h-screen flex flex-col" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* ── TOP NAV ── */}
        <nav className="flex items-center justify-between pt-6 pb-4 anim-1">
          <div className="flex items-center gap-3">
            <LogoDiamond size={48} />
            <div>
              <span className="font-orbitron font-bold chrome-text" style={{ fontSize: 16, letterSpacing: '0.16em' }}>ROMB COINS</span>
              <p className="font-rajdhani" style={{ fontSize: 10, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.1em', marginTop: 1 }}>ПРОДАЖА МОНЕТ FC 26</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="badge-pill" style={{ fontSize: 10 }}>
              <Icon name="Shield" size={9} style={{ color: '#60a5fa' }} />
              Comfort method
            </div>
            <div className="badge-pill" style={{ fontSize: 10 }}>
              <Icon name="Zap" size={9} style={{ color: '#60a5fa' }} />
              Без передачи аккаунтов
            </div>
            <div className="badge-pill hidden md:inline-flex" style={{ fontSize: 10 }}>
              <span style={{ color: '#4ade80', fontSize: 8 }}>●</span>
              Онлайн
            </div>
          </div>
        </nav>

        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.2), transparent)', marginBottom: 32 }} />

        {/* ── HERO + CALC (two columns) ── */}
        <div className="grid gap-6 anim-2" style={{ gridTemplateColumns: '1fr 360px', alignItems: 'start' }}>

          {/* LEFT — Hero */}
          <div className="flex flex-col gap-6">

            {/* Hero text */}
            <div>
              <p className="font-rajdhani font-semibold mb-2" style={{ fontSize: 12, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.18em' }}>
                FC 26 · ULTIMATE TEAM
              </p>
              <h1 className="chrome-text font-orbitron font-bold leading-tight mb-3" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '0.04em' }}>
                Монеты<br />без риска бана
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontFamily: 'Inter', lineHeight: 1.6, maxWidth: 420 }}>
                Быстрая доставка comfort-методом на PS, Xbox и ПК. Без передачи пароля. Работаем с 2022 года.
              </p>
            </div>

            {/* Price highlight */}
            <div className="flex items-center gap-4">
              <div className="glass-panel-blue rounded-2xl px-5 py-4 flex flex-col gap-1">
                <span style={{ fontSize: 10, fontFamily: 'Rajdhani', letterSpacing: '0.1em', color: 'rgba(147,197,253,0.5)' }}>СТАРТОВАЯ ЦЕНА</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-orbitron font-bold glow-text" style={{ fontSize: 28 }}>140</span>
                  <span style={{ color: '#60a5fa', fontFamily: 'Rajdhani', fontSize: 14 }}>₽ / 1M монет</span>
                </div>
              </div>
              <div className="glass-panel rounded-2xl px-5 py-4 flex flex-col gap-1">
                <span style={{ fontSize: 10, fontFamily: 'Rajdhani', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>ЗАКАЗОВ ЗА МЕСЯЦ</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-orbitron font-bold" style={{ fontSize: 28, color: '#e2e8f0' }}>9 820</span>
                </div>
              </div>
            </div>

            {/* Platforms */}
            <div className="flex items-center gap-2">
              {[
                { l: 'PlayStation', e: '🕹️' },
                { l: 'Xbox', e: '🎮' },
                { l: 'PC', e: '🖥️' },
              ].map((p, i) => (
                <div key={i} className="glass-panel flex items-center gap-2 px-4 py-2.5 rounded-xl">
                  <span style={{ fontSize: 16 }}>{p.e}</span>
                  <span className="font-rajdhani font-semibold" style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}>{p.l}</span>
                </div>
              ))}
            </div>

            {/* Guarantee bar */}
            <div className="glass-panel-blue rounded-2xl px-5 py-4 flex items-center gap-3">
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 15px rgba(59,130,246,0.3)',
              }}>
                <Icon name="ShieldCheck" size={20} style={{ color: '#60a5fa' }} />
              </div>
              <div>
                <p className="font-rajdhani font-bold" style={{ fontSize: 14, color: 'rgba(226,232,240,0.88)', letterSpacing: '0.06em' }}>
                  ГАРАНТИЯ ОТ БАНА
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter', marginTop: 2 }}>
                  0 заблокированных аккаунтов за всё время работы
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Calculator */}
          <div className="anim-3">
            <CalcPanel />
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.2), transparent)', margin: '36px 0' }} />

        {/* ── BOTTOM ROW: Reviews + Stats ── */}
        <div className="grid gap-5 pb-10 anim-4" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* Reviews */}
          <div className="glass-panel p-5" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)' }} />
            <h3 className="font-orbitron font-bold mb-4" style={{ fontSize: 12, color: 'rgba(226,232,240,0.85)', letterSpacing: '0.1em' }}>
              ОТЗЫВЫ КЛИЕНТОВ
            </h3>

            {shown.map((r, i) => (
              <div
                key={i}
                className={`py-2.5 flex items-start justify-between gap-3 ${i < shown.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'Inter' }}>{r.text}</p>
                  <Stars count={r.stars} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, flexShrink: 0, fontFamily: 'Rajdhani', letterSpacing: '0.04em' }}>{r.date}</span>
              </div>
            ))}

            {!reviewsExpanded && (
              <button
                onClick={() => setReviewsExpanded(true)}
                className="mt-3 font-rajdhani font-semibold hover:opacity-70 transition-opacity"
                style={{ color: '#60a5fa', fontSize: 11, letterSpacing: '0.07em' }}
              >
                ПОКАЗАТЬ ЕЩЁ →
              </button>
            )}
          </div>

          {/* Live orders / Stats */}
          <div className="glass-panel p-5" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.5), transparent)' }} />
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron font-bold" style={{ fontSize: 12, color: 'rgba(226,232,240,0.85)', letterSpacing: '0.1em' }}>
                ПОСЛЕДНИЕ ЗАКАЗЫ
              </h3>
              <div className="flex items-center gap-1.5">
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s infinite' }} />
                <span className="font-rajdhani" style={{ fontSize: 10, color: '#4ade80', letterSpacing: '0.06em' }}>LIVE</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b mb-1" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-2">
                <Icon name="BarChart2" size={12} style={{ color: '#3b82f6', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: 'Inter' }}>9 820 завершённых заказов</span>
              </div>
              <span style={{ fontSize: 10, color: '#f59e0b', fontFamily: 'Rajdhani', fontWeight: 600 }}>+36 / -26</span>
            </div>

            {LIVE_ORDERS.map((o, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-2.5 ${i < LIVE_ORDERS.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-2.5">
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.28)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 8, fontWeight: 700, color: '#93c5fd', fontFamily: 'Orbitron',
                  }}>
                    {o.idx}
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'Inter' }}>
                    {o.ago} / <span style={{ color: 'rgba(255,255,255,0.68)', fontFamily: 'Rajdhani', fontWeight: 600 }}>{o.pack}</span>
                  </span>
                </div>
                {o.amount && (
                  <span className="font-rajdhani font-semibold" style={{ fontSize: 12, color: '#60a5fa', letterSpacing: '0.03em' }}>
                    {o.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.12), transparent)', marginBottom: 20 }} />
        <p className="text-center pb-6 font-rajdhani" style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.07em' }}>
          © 2026 ROMB COINS · НЕ ЯВЛЯЕТСЯ ОФИЦИАЛЬНЫМ ПАРТНЁРОМ EA SPORTS
        </p>
      </div>
    </div>
  );
}
