export default function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-gold flex items-center justify-center">
            <span className="text-xs font-bold text-black">◆</span>
          </div>
          <span className="font-russo text-white/70 text-base">
            ROMB <span className="text-gold/70">COINS</span>
          </span>
        </div>
        <p className="text-white/25 text-xs font-golos text-center">
          © 2026 Romb Coins · Продажа монет FC26 · Не является официальным партнёром EA
        </p>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-white/60 text-sm font-golos transition-colors"
        >
          Telegram ↗
        </a>
      </div>
    </footer>
  );
}
