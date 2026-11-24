import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onLogoClick: () => void;
  showBack: boolean;
  onBack: () => void;
}

export default function Header({ onLogoClick, showBack, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Back button or spacer */}
        <div className="w-10">
          {showBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform">🥗</span>
          <span className="font-extrabold text-lg bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            NutriPantry
          </span>
        </button>

        {/* Right spacer for centering */}
        <div className="w-10" />
      </div>
    </header>
  );
}
