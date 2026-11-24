import { MacroTargets } from '../types';

interface MacroFiltersProps {
  targets: MacroTargets;
  onChange: (targets: MacroTargets) => void;
}

export default function MacroFilters({ targets, onChange }: MacroFiltersProps) {
  return (
    <section className="glass-card rounded-2xl p-6 space-y-5">
      <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <span className="text-xl">🎯</span>
        Macro & Diet Filters
        <span className="text-xs text-slate-500 font-normal">(optional)</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Min Protein */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Min Protein
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              value={targets.minProtein || ''}
              onChange={(e) =>
                onChange({ ...targets, minProtein: Number(e.target.value) || 0 })
              }
              placeholder="0"
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              g / serving
            </span>
          </div>
        </div>

        {/* Max Calories */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-orange-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            Max Calories
          </label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={2000}
              step={50}
              value={targets.maxCalories || ''}
              onChange={(e) =>
                onChange({ ...targets, maxCalories: Number(e.target.value) || 0 })
              }
              placeholder="0"
              className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              kcal / serving
            </span>
          </div>
        </div>

        {/* Diet Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Diet Style
          </label>
          <select
            value={targets.dietFilter}
            onChange={(e) =>
              onChange({ ...targets, dietFilter: e.target.value as MacroTargets['dietFilter'] })
            }
            className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
          >
            <option value="all">🍽️ All Recipes</option>
            <option value="high-protein">💪 High Protein</option>
            <option value="low-carb">🥬 Low Carb</option>
            <option value="vegetarian">🌱 Vegetarian</option>
            <option value="quick">⚡ Quick (&lt;15 min)</option>
          </select>
        </div>
      </div>

      {/* Quick macro presets */}
      <div>
        <p className="text-xs text-slate-500 mb-2">Quick presets:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '🏋️ Muscle Gain', p: 30, c: 600, d: 'high-protein' as const },
            { label: '🏃 Lean & Fit', p: 25, c: 450, d: 'all' as const },
            { label: '🌱 Veggie Power', p: 15, c: 500, d: 'vegetarian' as const },
            { label: '⚡ Quick Meals', p: 0, c: 0, d: 'quick' as const },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() =>
                onChange({
                  minProtein: preset.p,
                  maxCalories: preset.c,
                  dietFilter: preset.d,
                })
              }
              className="glass-pill rounded-lg px-3 py-1.5 text-xs text-slate-400 hover:text-emerald-300 hover:border-emerald-500/30 transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
