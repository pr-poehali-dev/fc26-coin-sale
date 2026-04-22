import { useState } from 'react';
import Icon from '@/components/ui/icon';

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Platform = 'PS' | 'Xbox' | 'PC';
type Amount = '100k' | '300k' | '500k' | '1M' | 'custom';

const RATES: Record<Platform, Record<string, number>> = {
  PS:   { '100k': 14,  '300k': 40,  '500k': 62,  '1M': 120 },
  Xbox: { '100k': 13,  '300k': 38,  '500k': 59,  '1M': 115 },
  PC:   { '100k': 12,  '300k': 36,  '500k': 56,  '1M': 110 },
};

const AMOUNTS: { label: string; key: Amount }[] = [
  { label: '100k', key: '100k' },
  { label: '300k', key: '300k' },
  { label: '500k', key: '500k' },
  { label: '1M',   key: '1M' },
  { label: 'Своё', key: 'custom' },
];

// ─── Icons inline SVG ─────────────────────────────────────────────────────────

function PSIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.996.637.194.763.84.763 1.53v5.877c2.073.95 3.704-.13 3.704-3.424 0-3.384-1.146-4.927-4.508-6.022-1.195-.39-3.382-.94-4.668-1.057zM2 18.806l4.93 1.395V16.56l-4.93-1.395v3.64zm17.857-9.274c-1.692-.515-3.887-.376-5.306.23v2.634c1.198-.497 3.462-.676 3.462.852 0 1.44-1.867 1.664-3.462 1.04v2.699c2.38.537 5.306-.004 5.306-3.455 0-1.664-.69-2.618-2-3zm-5.306 9.768l4.93-1.395v-3.64l-4.93 1.395v3.64z"/>
    </svg>
  );
}

function XboxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.102 6.195C2.77 7.768 2 9.791 2 12c0 4.236 2.77 7.836 6.617 9.094-1.206-.83-4.687-4.332-4.515-14.9zM12 2a9.978 9.978 0 0 0-5.93 1.945c1.046-.76 3.523-1.25 5.93 1.502 2.407-2.751 4.884-2.262 5.93-1.502A9.978 9.978 0 0 0 12 2zm5.383 4.195c.172 10.568-3.309 14.07-4.515 14.9C16.715 19.836 19.485 16.236 19.485 12c0-2.209-.77-4.232-2.102-5.805zM12 7.123c-3.16 2.648-4.697 5.82-4.697 7.52 0 2.59 2.1 4.692 4.697 4.692s4.697-2.102 4.697-4.693c0-1.699-1.537-4.872-4.697-7.519z"/>
    </svg>
  );
}

function PCIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7v2H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-2h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 12H5V5h14v10z"/>
    </svg>
  );
}

function TgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v2H4V6h16zm0 12H4v-6h16v6zm-3 0v-2h2v2h-2zm-4 0v-2h2v2h-2z"/>
    </svg>
  );
}

function DiamondIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="#3b82f6">
      <polygon points="5,0 10,5 5,10 0,5" />
    </svg>
  );
}

// ─── Calculator ───────────────────────────────────────────────────────────────
function Calculator() {
  const [platform, setPlatform] = useState<Platform>('PS');
  const [amount, setAmount]     = useState<Amount>('100k');
  const [custom, setCustom]     = useState('');

  const price = amount === 'custom'
    ? (parseInt(custom || '0') * (RATES[platform]['100k'] / 100_000)) | 0
    : RATES[platform][amount];

  const platforms: { key: Platform; label: string; icon: React.ReactNode }[] = [
    { key: 'PS',   label: 'PS',   icon: <PSIcon /> },
    { key: 'Xbox', label: 'Xbox', icon: <XboxIcon /> },
    { key: 'PC',   label: 'PC',   icon: <PCIcon /> },
  ];

  return (
    <div className="card-calc p-6 flex flex-col gap-5">
      {/* Title */}
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(148,163,184,0.6)', textTransform: 'uppercase' }}>
        Калькулятор
      </p>

      {/* Platform */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(148,163,184,0.55)', textTransform: 'uppercase', marginBottom: 8 }}>
          Платформа
        </p>
        <div className="flex gap-2">
          {platforms.map(p => (
            <button
              key={p.key}
              onClick={() => setPlatform(p.key)}
              className={`plat-btn ${platform === p.key ? 'active' : ''}`}
            >
              <span style={{ color: platform === p.key ? '#3b82f6' : 'rgba(148,163,184,0.5)' }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(148,163,184,0.55)', textTransform: 'uppercase', marginBottom: 8 }}>
          Количество монет
        </p>
        <div className="flex gap-2">
          {AMOUNTS.map(a => (
            <button
              key={a.key}
              onClick={() => setAmount(a.key)}
              className={`amt-btn ${amount === a.key ? 'active' : ''}`}
            >
              {a.label}
            </button>
          ))}
        </div>
        {amount === 'custom' && (
          <input
            type="number"
            placeholder="Введите количество"
            value={custom}
            onChange={e => setCustom(e.target.value)}
            style={{
              marginTop: 10,
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 7,
              padding: '9px 14px',
              color: '#e2e8f0',
              fontSize: 13,
              fontFamily: 'Inter',
              outline: 'none',
            }}
          />
        )}
      </div>

      {/* Total */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, paddingBottom: 14 }}>
        <span style={{ fontSize: 13, color: 'rgba(148,163,184,0.6)' }}>Итого</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: '#e2e8f0' }}>
          {price ? `${price} ₽` : '—'}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2.5">
        <button className="btn-primary">
          <TgIcon /> Купить через Telegram
        </button>
        <button className="btn-secondary">
          <CardIcon /> Купить на сайте
        </button>
      </div>

      {/* Payment note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
        <Icon name="Lock" size={12} style={{ color: 'rgba(148,163,184,0.4)' }} />
        <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.4)' }}>Оплата картой или криптой (USDT)</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="page-bg" />

      <div className="relative" style={{ zIndex: 1, maxWidth: 1160, margin: '0 auto', padding: '0 32px' }}>

        {/* ── NAV ── */}
        <nav className="anim-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 52 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DiamondIcon size={10} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: '#e2e8f0', textTransform: 'uppercase' }}>
              FC26 Coins
            </span>
          </div>

          {/* Platform links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(148,163,184,0.7)', fontSize: 13 }}>
              <PSIcon /> PS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(148,163,184,0.7)', fontSize: 13 }}>
              <XboxIcon /> Xbox
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(148,163,184,0.7)', fontSize: 13 }}>
              <PCIcon /> PC
            </div>
          </div>
        </nav>

        {/* ── HERO + CALC ── */}
        <div className="anim-2" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48, alignItems: 'start', marginBottom: 72 }}>

          {/* LEFT */}
          <div>
            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 700, lineHeight: 1.2, color: '#e2e8f0', marginBottom: 24 }}>
              Продажа монет{' '}
              <em style={{ fontStyle: 'italic', color: '#3b82f6', fontWeight: 700 }}>FC 26</em>
              <br />
              с гарантией{' '}
              <span style={{ color: '#3b82f6' }}>от бана</span>
              <br />
              по <span style={{ color: '#3b82f6' }}>выгодной цене</span>
            </h1>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              <div className="badge">
                <Icon name="Lock" size={11} style={{ color: 'rgba(148,163,184,0.6)' }} />
                Comfort method
              </div>
              <div className="badge">
                <Icon name="Zap" size={11} style={{ color: 'rgba(148,163,184,0.6)' }} />
                Без передачи через рынок
              </div>
            </div>

            {/* Price tiers */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 36 }}>
              {[
                { amount: '100k', price: 'от 12 ₽' },
                { amount: '500k', price: 'от 58 ₽' },
                { amount: '1M',   price: 'от 103 ₽' },
              ].map(t => (
                <div key={t.amount}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.1 }}>{t.amount}</div>
                  <div style={{ fontSize: 12, color: 'rgba(148,163,184,0.55)', marginTop: 2 }}>{t.price}</div>
                </div>
              ))}
            </div>

            {/* Buy options */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div className="buy-card active" style={{ flex: 1 }}>
                <div className="buy-card-icon" style={{ background: 'rgba(29,161,242,0.15)' }}>
                  <TgIcon />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Купить через Telegram</div>
                  <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginTop: 2 }}>Быстрый заказ</div>
                </div>
              </div>

              <span style={{ color: 'rgba(148,163,184,0.3)', fontSize: 12 }}>или</span>

              <div className="buy-card" style={{ flex: 1 }}>
                <div className="buy-card-icon" style={{ background: 'rgba(148,163,184,0.08)' }}>
                  <CardIcon />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Купить на сайте</div>
                  <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.5)', marginTop: 2 }}>Оплата онлайн</div>
                </div>
              </div>
            </div>

            {/* Trust line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="ShieldCheck" size={13} style={{ color: 'rgba(148,163,184,0.4)' }} />
              <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.45)', letterSpacing: '0.02em' }}>
                Безопасно • Быстро • Поддержка 24/7
              </span>
            </div>
          </div>

          {/* RIGHT — Calc */}
          <div className="anim-3">
            <Calculator />
          </div>
        </div>

        {/* ── BOTTOM 3-COL SECTION ── */}
        <div className="anim-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48, paddingBottom: 48 }}>

          {/* Как это работает */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 20 }}>Как это работает</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { n: 1, title: 'Выбираете монеты' },
                { n: 2, title: 'Оплачиваете на сайте или в TG' },
                { n: 3, title: 'Передаёте данные' },
                { n: 4, title: 'Получаете монеты' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="step-num">{s.n}</div>
                  <span style={{ fontSize: 13, color: 'rgba(203,213,225,0.75)' }}>{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Гарантия безопасности */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Icon name="ShieldCheck" size={15} style={{ color: '#3b82f6' }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Гарантия безопасности</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Comfort method',
                'Минимальный риск бана',
                'Данные не сохраняются',
                'Выход после выполнения',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#3b82f6', marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(203,213,225,0.75)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Почему выгодно */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Icon name="Tag" size={15} style={{ color: '#3b82f6' }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Почему выгодно</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Прямая доставка без посредников',
                'Цены ниже среднего по рынку',
                'Чем больше объём — тем дешевле курс',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#3b82f6', marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'rgba(203,213,225,0.75)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.35)' }}>© 2025 FC26 Coins</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DiamondIcon size={8} />
            <span style={{ fontSize: 11, color: 'rgba(148,163,184,0.35)' }}>Comfort Method</span>
          </div>
        </div>
      </div>
    </div>
  );
}
