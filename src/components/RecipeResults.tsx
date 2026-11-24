import { RecipeMatch } from '../types';
import MacroBar from './MacroBar';
import { Clock, ChefHat, ShoppingCart, Check, ArrowLeft } from 'lucide-react';

interface RecipeResultsProps {
  recipes: RecipeMatch[];
  onViewRecipe: (recipe: RecipeMatch) => void;
  selectedForShopping: Set<string>;
  onToggleShoppingRecipe: (id: string) => void;
  onGenerateShoppingList: () => void;
  onBackHome: () => void;
  pantryCount: number;
}

export default function RecipeResults({
  recipes,
  onViewRecipe,
  selectedForShopping,
  onToggleShoppingRecipe,
  onGenerateShoppingList,
  onBackHome,
  pantryCount,
}: RecipeResultsProps) {
  if (recipes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="text-6xl">🤷‍♂️</div>
        <h2 className="text-2xl font-bold text-slate-200">No Recipes Found</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          We couldn't find recipes matching your ingredients and filters.
          Try adding more items or relaxing your macro targets.
        </p>
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Adjust Ingredients
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Results header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            🍽️ {recipes.length} Recipe{recipes.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Matched from {pantryCount} pantry item{pantryCount !== 1 ? 's' : ''} — sorted by ingredient match %
          </p>
        </div>
        {selectedForShopping.size > 0 && (
          <button
            onClick={onGenerateShoppingList}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            Shopping List ({selectedForShopping.size})
          </button>
        )}
      </div>

      {/* Recipe cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {recipes.map((recipe) => {
          const isSelected = selectedForShopping.has(recipe.id);
          return (
            <div
              key={recipe.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Match badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${
                      recipe.matchPercentage >= 80
                        ? 'bg-emerald-500/80 text-white'
                        : recipe.matchPercentage >= 50
                        ? 'bg-yellow-500/80 text-white'
                        : 'bg-orange-500/80 text-white'
                    }`}
                  >
                    {recipe.matchPercentage}% match
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/70 text-slate-200 backdrop-blur-sm capitalize">
                    {recipe.category}
                  </span>
                </div>

                {/* Add to shopping toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleShoppingRecipe(recipe.id);
                  }}
                  className={`absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                      : 'bg-slate-900/60 text-slate-300 backdrop-blur-sm hover:bg-pink-500/50'
                  }`}
                  title={isSelected ? 'Remove from shopping list' : 'Add to shopping list'}
                >
                  {isSelected ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 space-y-3">
                <h3 className="text-lg font-bold text-slate-100 leading-tight">
                  {recipe.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {recipe.description}
                </p>

                {/* Quick meta */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5" />
                    {recipe.difficulty}
                  </span>
                  <span>🍽️ {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
                </div>

                {/* Macro bar */}
                <MacroBar macros={recipe.macros} compact />

                {/* Missing ingredients */}
                {recipe.missingIngredients.length > 0 && (
                  <div className="pt-1">
                    <p className="text-xs text-orange-400/80 font-medium mb-1">
                      🛒 Need to buy ({recipe.missingIngredients.length}):
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {recipe.missingIngredients.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* View button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => onViewRecipe(recipe)}
                  className="w-full py-2.5 bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-300 rounded-xl text-sm font-medium transition-all border border-white/5 hover:border-emerald-500/20"
                >
                  View Recipe →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
