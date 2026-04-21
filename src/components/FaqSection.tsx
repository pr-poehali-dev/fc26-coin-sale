import { useState } from 'react';
import Icon from '@/components/ui/icon';

const FAQ = [
  {
    q: 'Безопасно ли покупать монеты?',
    a: 'Да. Мы используем исключительно метод трансфер-маркета — вы выставляете карточку на продажу, мы её выкупаем. За всё время работы — 0 заблокированных аккаунтов.',
  },
  {
    q: 'Как быстро придут монеты?',
    a: '67% заказов выполняются за 30 минут, 98% — за 1 час. В редких случаях доставка занимает чуть дольше — мы всегда предупреждаем об этом.',
  },
  {
    q: 'Какие платформы поддерживаются?',
    a: 'Мы работаем с ПК (EA App), Xbox Series X/S, Xbox One, PlayStation 4 и PlayStation 5.',
  },
  {
    q: 'Какой минимальный заказ?',
    a: 'Минимальный заказ — 100 000 монет (140 ₽). Максимальный заказ за один раз — 10 000 000 монет.',
  },
  {
    q: 'Как проходит оплата?',
    a: 'Принимаем оплату через популярные российские платёжные системы. Все платежи защищены и обрабатываются мгновенно.',
  },
  {
    q: 'Что если у меня возникнет проблема?',
    a: 'Напишите нам в Telegram — ответим в течение нескольких минут. Если по нашей вине что-то пошло не так, вернём деньги или повторим перевод.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-1.5 mb-4 border border-white/10">
            <Icon name="HelpCircle" size={14} className="text-gold" />
            <span className="text-white/70 text-sm font-golos">Частые вопросы</span>
          </div>
          <h2 className="font-russo text-4xl md:text-5xl text-white">
            <span className="text-gradient-gold">FAQ</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.map((item, idx) => (
            <div
              key={idx}
              className={`card-glass rounded-2xl border transition-all ${
                openIndex === idx ? 'border-gold/30' : 'border-white/8 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left gap-4"
              >
                <span className={`font-golos font-semibold text-sm sm:text-base transition-colors ${
                  openIndex === idx ? 'text-gold' : 'text-white/80'
                }`}>
                  {item.q}
                </span>
                <Icon
                  name={openIndex === idx ? 'Minus' : 'Plus'}
                  size={18}
                  className={`flex-shrink-0 transition-colors ${openIndex === idx ? 'text-gold' : 'text-white/30'}`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="text-white/55 font-golos text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
