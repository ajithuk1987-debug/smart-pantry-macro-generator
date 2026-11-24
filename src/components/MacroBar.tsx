import { MacroNutrients } from '../types';

interface MacroBarProps {
  macros: MacroNutrients;
  compact?: boolean;
}

export default function MacroBar({ macros, compact = false }: MacroBarProps) {
  const items = [
    { label: 'Protein', value: macros.protein, unit: 'g', color: 'bg-blue-500', textColor: 'text-blue-400' },
    { label: 'Calories', value: macros.calories, unit: 'kcal', color: 'bg-orange-500', textColor: 'text-orange-400' },
    { label: 'Carbs', value: macros.carbs, unit: 'g', color: 'bg-amber-500', textColor: 'text-amber-400' },
    { label: 'Fat', value: macros.fat, unit: 'g', color: 'bg-pink-500', textColor: 'text-pink-400' },
  ];

  if (!compact && macros.fiber) {
    items.push({ label: 'Fiber', value: macros.fiber, unit: 'g', color: 'bg-emerald-500', textColor: 'text-emerald-400' });
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs">
        {items.map((item) => (
          <span key={item.label} className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
            <span className={item.textColor + ' font-semibold'}>{item.value}</span>
            <span className="text-slate-500">{item.unit}</span>
          </span>
        ))}
      </div>
    );
  }

  // Full bar with visual bars
  const maxCalDisplay = Math.max(macros.calories, 600);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const barMax = item.label === 'Calories' ? maxCalDisplay : 60;
        const percentage = Math.min((item.value / barMax) * 100, 100);

        return (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-medium">{item.label}</span>
              <span className={`${item.textColor} font-bold`}>
                {item.value} {item.unit}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
