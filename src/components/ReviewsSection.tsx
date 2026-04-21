import { useState } from 'react';
import Icon from '@/components/ui/icon';

const REVIEWS = [
  {
    id: 1,
    name: 'Артём К.',
    avatar: '🎮',
    rating: 5,
    text: 'Купил 2 миллиона монет на PS — монеты пришли за 15 минут. Всё честно, без обмана. Рекомендую!',
    date: '20 апр 2026',
    time: '14:32',
    platform: 'PlayStation',
  },
  {
    id: 2,
    name: 'Дмитрий В.',
    avatar: '🖥️',
    rating: 5,
    text: 'Заказываю уже третий раз. Самый дешёвый курс из всех, что нашёл. Перевод безопасный — аккаунт цел.',
    date: '19 апр 2026',
    time: '22:10',
    platform: 'ПК',
  },
  {
    id: 3,
    name: 'Максим Р.',
    avatar: '🎮',
    rating: 5,
    text: 'Отличный сервис! Взял миллион монет на Xbox, всё прошло гладко. Поддержка ответила моментально.',
    date: '18 апр 2026',
    time: '18:05',
    platform: 'Xbox',
  },
  {
    id: 4,
    name: 'Иван Л.',
    avatar: '🖥️',
    rating: 4,
    text: 'Нормальный сервис, монеты пришли за 40 минут. Чуть медленнее ожидаемого, но без проблем.',
    date: '17 апр 2026',
    time: '10:20',
    platform: 'ПК',
  },
  {
    id: 5,
    name: 'Никита С.',
    avatar: '🕹️',
    rating: 5,
    text: 'Лучший сайт по монетам! Уже 5-й заказ, ни разу не подвели. Цены реально выгодные.',
    date: '16 апр 2026',
    time: '09:55',
    platform: 'PlayStation',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="Star"
          size={14}
          className={star <= rating ? 'text-gold fill-current' : 'text-white/20'}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="card-glass rounded-2xl p-6 border border-white/8 hover:border-white/15 transition-all">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-white font-golos">{review.name}</span>
            <span className="text-xs text-white/30 font-golos flex-shrink-0">{review.platform}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={review.rating} />
            <span className="text-xs text-white/30 font-golos">{review.date}, {review.time}</span>
          </div>
        </div>
      </div>
      <p className="text-white/70 text-sm font-golos leading-relaxed">{review.text}</p>
    </div>
  );
}

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? REVIEWS : REVIEWS.slice(0, 2);

  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section id="reviews" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 card-glass rounded-full px-4 py-1.5 mb-4 border border-white/10">
            <Icon name="Star" size={14} className="text-gold fill-current" />
            <span className="text-white/70 text-sm font-golos">Отзывы покупателей</span>
          </div>
          <h2 className="font-russo text-4xl md:text-5xl text-white mb-3">
            Нам <span className="text-gradient-gold">доверяют</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="font-russo text-5xl text-gradient-gold">{avgRating}</span>
            <div>
              <StarRating rating={5} />
              <p className="text-white/40 text-xs mt-1 font-golos">{REVIEWS.length} отзывов</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {displayed.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="text-white/40 hover:text-white/70 text-sm font-golos transition-colors underline underline-offset-4 decoration-white/20"
            >
              Показать все комментарии
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
