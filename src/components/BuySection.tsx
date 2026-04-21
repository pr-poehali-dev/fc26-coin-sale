import { useState } from 'react';
import Icon from '@/components/ui/icon';

const RATE = 140 / 100000;
const MIN_COINS = 100000;
const MAX_COINS = 10000000;

const PLATFORMS = [
  { id: 'pc', label: 'ПК', icon: '🖥️' },
  { id: 'xbox', label: 'Xbox', icon: '🎮' },
  { id: 'ps', label: 'PlayStation', icon: '🕹️' },
];

const TRANSFER_STEPS = [
  { num: '01', text: 'Выставляй игрока на трансфер-маркет по заниженной цене' },
  { num: '02', text: 'Мы выкупаем его — монеты поступают вам мгновенно' },
  { num: '03', text: 'Безопасный метод без риска блокировки аккаунта' },
];

export default function BuySection() {
  const [mode, setMode] = useState<'choice' | 'calculator'>('choice');
  const [platform, setPlatform] = useState('');
  const [coins, setCoins] = useState(500000);
  const [inputValue, setInputValue] = useState('500 000');
  const [showTransfer, setShowTransfer] = useState(false);

  const price = Math.ceil(coins * RATE);

  const formatCoins = (val: number) =>
    val.toLocaleString('ru-RU').replace(/,/g, ' ');

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCoins(val);
    setInputValue(formatCoins(val));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setInputValue(raw);
    const num = Math.min(Math.max(Number(raw), MIN_COINS), MAX_COINS);
    if (!isNaN(num)) setCoins(num);
  };

  const handleInputBlur = () => {
    setInputValue(formatCoins(coins));
  };

  const handlePlatformSelect = (id: string) => {
    setPlatform(id);
    setMode('calculator');
  };

  return (
    <section id="buy" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 card-glass-gold rounded-full px-4 py-1.5 mb-4">
            <span className="text-gold text-sm font-medium">◆ Покупка монет</span>
          </div>
          <h2 className="font-russo text-4xl md:text-5xl text-white mb-3">
            Рассчитать <span className="text-gradient-gold">стоимость</span>
          </h2>
          <p className="text-white/50 font-golos">100 000 монет = 140 ₽</p>
        </div>

        {mode === 'choice' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-scale-in">
            {/* Telegram */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass rounded-2xl p-8 text-center border border-white/8 hover:border-blue-400/40 transition-all hover:scale-[1.02] group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform text-3xl">
                ✈
              </div>
              <h3 className="font-russo text-white text-xl mb-2">Telegram</h3>
              <p className="text-white/50 text-sm font-golos">Быстро и удобно через бота. Все те же функции.</p>
              <div className="mt-5 inline-flex items-center gap-2 text-blue-400 text-sm font-semibold">
                Перейти в бот <Icon name="ArrowRight" size={14} />
              </div>
            </a>

            {/* Website */}
            <button
              onClick={() => setMode('calculator')}
              className="card-glass rounded-2xl p-8 text-center border border-white/8 hover:border-gold/40 transition-all hover:scale-[1.02] group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <Icon name="Globe" size={28} className="text-gold" />
              </div>
              <h3 className="font-russo text-white text-xl mb-2">На сайте</h3>
              <p className="text-white/50 text-sm font-golos">Выбери платформу и рассчитай цену прямо здесь.</p>
              <div className="mt-5 inline-flex items-center gap-2 text-gold text-sm font-semibold">
                Рассчитать <Icon name="ArrowRight" size={14} />
              </div>
            </button>
          </div>
        )}

        {mode === 'calculator' && (
          <div className="animate-scale-in">
            {/* Platform selector */}
            {!platform && (
              <div>
                <p className="text-white/60 text-sm mb-4 text-center font-golos">Выберите платформу:</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePlatformSelect(p.id)}
                      className="card-glass rounded-2xl p-5 flex flex-col items-center gap-2 border border-white/8 hover:border-gold/40 hover:bg-gold/5 transition-all hover:scale-105 group"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform">{p.icon}</span>
                      <span className="font-russo text-white text-sm">{p.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setMode('choice')}
                  className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  <Icon name="ArrowLeft" size={14} /> Назад
                </button>
              </div>
            )}

            {platform && (
              <div>
                {/* Platform badge + back */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setPlatform('')}
                    className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm transition-colors"
                  >
                    <Icon name="ArrowLeft" size={14} /> Назад
                  </button>
                  <div className="card-glass-gold rounded-full px-4 py-1.5 flex items-center gap-2">
                    <span>{PLATFORMS.find(p => p.id === platform)?.icon}</span>
                    <span className="text-gold font-semibold text-sm">{PLATFORMS.find(p => p.id === platform)?.label}</span>
                  </div>
                </div>

                {/* Calculator card */}
                <div className="card-glass rounded-3xl p-8 border border-white/8">
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1">
                      <label className="text-white/50 text-xs font-golos mb-2 block">Количество монет</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={inputValue}
                          onChange={handleInput}
                          onBlur={handleInputBlur}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-golos text-lg focus:outline-none focus:border-gold/50 transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">монет</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-white/50 text-xs font-golos mb-2 block">Стоимость</label>
                      <div className="bg-gold/10 border border-gold/30 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="font-russo text-3xl text-gradient-gold">{price} ₽</span>
                      </div>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="mb-8">
                    <input
                      type="range"
                      min={MIN_COINS}
                      max={MAX_COINS}
                      step={100000}
                      value={coins}
                      onChange={handleSlider}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, hsl(35,100%,55%) 0%, hsl(35,100%,55%) ${((coins - MIN_COINS) / (MAX_COINS - MIN_COINS)) * 100}%, rgba(255,255,255,0.1) ${((coins - MIN_COINS) / (MAX_COINS - MIN_COINS)) * 100}%, rgba(255,255,255,0.1) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/30 mt-2 font-golos">
                      <span>100K</span>
                      <span>10M</span>
                    </div>
                  </div>

                  {/* Quick picks */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {[500000, 1000000, 2000000, 5000000].map((val) => (
                      <button
                        key={val}
                        onClick={() => { setCoins(val); setInputValue(formatCoins(val)); }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-golos transition-all ${
                          coins === val
                            ? 'gradient-gold text-black font-semibold'
                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`}
                      </button>
                    ))}
                  </div>

                  {/* Method of transfer */}
                  <button
                    onClick={() => setShowTransfer(!showTransfer)}
                    className="w-full flex items-center justify-between card-glass-gold rounded-xl px-5 py-4 border border-gold/20 hover:border-gold/40 transition-all mb-4"
                  >
                    <span className="font-semibold text-gold font-golos flex items-center gap-2">
                      <Icon name="ArrowLeftRight" size={16} /> Метод перевода
                    </span>
                    <Icon name={showTransfer ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-gold/60" />
                  </button>

                  {showTransfer && (
                    <div className="mb-4 card-glass rounded-xl p-5 border border-white/5 animate-fade-in">
                      <p className="text-white/50 text-sm mb-4 font-golos">Как происходит перевод монет:</p>
                      <div className="flex flex-col gap-3">
                        {TRANSFER_STEPS.map((step) => (
                          <div key={step.num} className="flex items-start gap-3">
                            <span className="font-russo text-gold/60 text-sm min-w-[24px]">{step.num}</span>
                            <p className="text-white/70 text-sm font-golos">{step.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pay button */}
                  <button className="w-full gradient-gold text-black font-russo text-lg py-4 rounded-2xl glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Перейти к оплате — {price} ₽
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
