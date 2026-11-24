import { ShoppingItem } from '../types';
import { CATEGORY_LABELS } from '../data/ingredients';
import { Check, ArrowLeft, Share2 } from 'lucide-react';
import { useCallback } from 'react';

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onBack: () => void;
}

export default function ShoppingList({ items, onToggleItem, onBack }: ShoppingListProps) {
  const checkedCount = items.filter((i) => i.checked).length;

  // Group by category
  const grouped = items.reduce<Record<string, ShoppingItem[]>>((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const handleShare = useCallback(async () => {
    const text = items
      .map((i) => `${i.checked ? '✅' : '⬜'} ${i.name}${i.amount ? ` — ${i.amount}` : ''}`)
      .join('\n');

    const shareText = `🛒 NutriPantry Shopping List\n\n${text}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'NutriPantry Shopping List', text: shareText });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert('Shopping list copied to clipboard!');
    }
  }, [items]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            🛒 Shopping List
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {checkedCount} of {items.length} items checked
          </p>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 glass-pill rounded-xl text-sm text-slate-300 hover:text-emerald-400 transition-colors"
          title="Share or copy list"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
          style={{ width: items.length ? `${(checkedCount / items.length) * 100}%` : '0%' }}
        />
      </div>

      {/* Grouped items */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, catItems]) => {
          const catInfo = CATEGORY_LABELS[cat] || { label: cat, icon: '📦' };
          return (
            <div key={cat}>
              <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                <span>{catInfo.icon}</span> {catInfo.label}
              </h3>
              <ul className="space-y-2">
                {catItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => onToggleItem(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      item.checked
                        ? 'bg-emerald-500/10 border border-emerald-500/15'
                        : 'glass-card hover:border-emerald-500/20'
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                        item.checked
                          ? 'bg-emerald-500 text-white'
                          : 'border-2 border-slate-600'
                      }`}
                    >
                      {item.checked && <Check className="w-4 h-4" />}
                    </div>

                    {/* Item info */}
                    <div className="flex-1 min-w-0">
                      <span
                        className={`font-medium transition-all ${
                          item.checked ? 'line-through text-slate-500' : 'text-slate-200'
                        }`}
                      >
                        {item.name}
                      </span>
                      {item.recipeName && (
                        <p className="text-xs text-slate-500 truncate">
                          For: {item.recipeName}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    {item.amount && (
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {item.amount}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* All done message */}
      {checkedCount === items.length && items.length > 0 && (
        <div className="text-center py-6 space-y-2">
          <div className="text-5xl">🎉</div>
          <p className="text-lg font-bold text-emerald-400">All items checked!</p>
          <p className="text-sm text-slate-400">Time to start cooking 👨‍🍳</p>
        </div>
      )}

      {/* Back button */}
      <div className="text-center pt-4 pb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 glass-pill text-slate-300 hover:text-emerald-400 rounded-xl transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </button>
      </div>
    </div>
  );
}
