import { RecipeMatch } from '../types';
import MacroBar from './MacroBar';
import { Clock, ChefHat, Users, ArrowLeft, Check, ShoppingBag, Lightbulb } from 'lucide-react';

interface RecipeDetailProps {
  recipe: RecipeMatch;
  onBack: () => void;
}

export default function RecipeDetail({ recipe, onBack }: RecipeDetailProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-56 sm:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${
                recipe.matchPercentage >= 80
                  ? 'bg-emerald-500/80 text-white'
                  : recipe.matchPercentage >= 50
                  ? 'bg-yellow-500/80 text-white'
                  : 'bg-orange-500/80 text-white'
              }`}
            >
              {recipe.matchPercentage}% pantry match
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/70 text-slate-200 backdrop-blur-sm capitalize">
              {recipe.category}
            </span>
            {recipe.tags.includes('vegetarian') && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-green-900/70 text-green-300 backdrop-blur-sm">
                🌱 Vegetarian
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {recipe.title}
          </h1>
        </div>
      </div>

      {/* Meta cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <Clock className="w-5 h-5 mx-auto text-teal-400 mb-1" />
          <p className="text-lg font-bold text-slate-100">
            {recipe.prepTimeMinutes + recipe.cookTimeMinutes}
          </p>
          <p className="text-xs text-slate-500">minutes</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <ChefHat className="w-5 h-5 mx-auto text-violet-400 mb-1" />
          <p className="text-lg font-bold text-slate-100">{recipe.difficulty}</p>
          <p className="text-xs text-slate-500">difficulty</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <Users className="w-5 h-5 mx-auto text-pink-400 mb-1" />
          <p className="text-lg font-bold text-slate-100">{recipe.servings}</p>
          <p className="text-xs text-slate-500">serving{recipe.servings > 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 leading-relaxed">{recipe.description}</p>

      {/* Macros */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          📊 Nutrition per Serving
        </h2>
        <MacroBar macros={recipe.macros} />
      </div>

      {/* Ingredients */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          🧺 Ingredients
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => {
            const inPantry = recipe.matchingIngredients.some(
              (m) => m.toLowerCase() === ing.name.toLowerCase()
            );
            const isMissing = recipe.missingIngredients.some(
              (m) => m.toLowerCase() === ing.name.toLowerCase()
            );

            return (
              <li
                key={i}
                className={`flex items-start gap-3 py-2 px-3 rounded-xl text-sm transition-colors ${
                  inPantry
                    ? 'bg-emerald-500/10 border border-emerald-500/15'
                    : isMissing
                    ? 'bg-orange-500/10 border border-orange-500/15'
                    : 'bg-white/[0.02]'
                }`}
              >
                <span className="mt-0.5">
                  {inPantry ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : isMissing ? (
                    <ShoppingBag className="w-4 h-4 text-orange-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 inline-block" />
                  )}
                </span>
                <div className="flex-1">
                  <span className={`font-medium ${inPantry ? 'text-emerald-300' : isMissing ? 'text-orange-300' : 'text-slate-200'}`}>
                    {ing.name}
                  </span>
                  {ing.optional && (
                    <span className="ml-2 text-xs text-slate-500 italic">(optional)</span>
                  )}
                </div>
                <span className="text-slate-400 text-xs whitespace-nowrap">{ing.amount}</span>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4 pt-2 text-xs">
          <span className="flex items-center gap-1 text-emerald-400">
            <Check className="w-3 h-3" /> In your pantry
          </span>
          <span className="flex items-center gap-1 text-orange-400">
            <ShoppingBag className="w-3 h-3" /> Need to buy
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          👨‍🍳 Step-by-Step Instructions
        </h2>
        <ol className="space-y-4">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-sm font-bold text-white shadow-sm">
                {i + 1}
              </div>
              <p className="text-slate-300 leading-relaxed pt-1 flex-1">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Chef's tip */}
      {recipe.chefTips && (
        <div className="glass-card rounded-2xl p-5 border-l-4 border-amber-500/50">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-400 mb-1">Chef's Tip</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{recipe.chefTips}</p>
            </div>
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="text-center pt-4 pb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 glass-pill text-slate-300 hover:text-emerald-400 rounded-xl transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>
      </div>
    </div>
  );
}
