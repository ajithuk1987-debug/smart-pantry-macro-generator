export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 px-4">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Animated emoji row */}
        <div className="flex justify-center gap-3 text-4xl md:text-5xl">
          {['🥚', '🍅', '🥦', '🍗', '🥑'].map((emoji, i) => (
            <span
              key={emoji}
              className="inline-block animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2s' }}
            >
              {emoji}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Smart Pantry
          </span>
          <br />
          <span className="text-slate-200">&amp; Macro Meal Generator</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Snap a photo of your ingredients or type them in →
          Get <span className="text-emerald-400 font-semibold">delicious recipes</span> filtered by
          your <span className="text-blue-400 font-semibold">protein</span> &amp;
          <span className="text-orange-400 font-semibold"> calorie</span> targets,
          plus a minimal <span className="text-pink-400 font-semibold">top-up shopping list</span>.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {[
            { icon: '📸', label: 'Snap Ingredients' },
            { icon: '🎯', label: 'Macro Targets' },
            { icon: '🧑‍🍳', label: 'Easy Recipes' },
            { icon: '🛒', label: 'Shopping List' },
          ].map((f) => (
            <div
              key={f.label}
              className="glass-pill rounded-full px-4 py-2 flex items-center gap-2 text-sm text-slate-300"
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
