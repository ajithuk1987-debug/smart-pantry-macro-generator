import { useState, useCallback } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IngredientInput from './components/IngredientInput';
import MacroFilters from './components/MacroFilters';
import RecipeResults from './components/RecipeResults';
import RecipeDetail from './components/RecipeDetail';
import ShoppingList from './components/ShoppingList';
import Footer from './components/Footer';
import { IngredientItem, MacroTargets, RecipeMatch, ShoppingItem } from './types';
import { findMatchingRecipes, generateShoppingList } from './engine/recipeEngine';

type View = 'home' | 'results' | 'detail' | 'shopping';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [pantryItems, setPantryItems] = useState<IngredientItem[]>([]);
  const [macroTargets, setMacroTargets] = useState<MacroTargets>({
    minProtein: 0,
    maxCalories: 0,
    dietFilter: 'all',
  });
  const [recipes, setRecipes] = useState<RecipeMatch[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeMatch | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [selectedForShopping, setSelectedForShopping] = useState<Set<string>>(new Set());

  const handleSearch = useCallback(() => {
    const names = pantryItems.map((i) => i.name);
    const matches = findMatchingRecipes(names, macroTargets);
    setRecipes(matches);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pantryItems, macroTargets]);

  const handleViewRecipe = useCallback((recipe: RecipeMatch) => {
    setSelectedRecipe(recipe);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleShoppingRecipe = useCallback((recipeId: string) => {
    setSelectedForShopping((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
      } else {
        next.add(recipeId);
      }
      return next;
    });
  }, []);

  const handleGenerateShoppingList = useCallback(() => {
    const selected = recipes.filter((r) => selectedForShopping.has(r.id));
    if (selected.length === 0) return;
    const list = generateShoppingList(selected);
    setShoppingList(list);
    setView('shopping');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [recipes, selectedForShopping]);

  const handleToggleShoppingItem = useCallback((id: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const handleBackToResults = useCallback(() => {
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onLogoClick={handleBackToHome}
        showBack={view !== 'home'}
        onBack={view === 'detail' ? handleBackToResults : view === 'shopping' ? handleBackToResults : handleBackToHome}
      />

      <main className="flex-1 pb-safe">
        {view === 'home' && (
          <>
            <HeroSection />
            <div className="max-w-4xl mx-auto px-4 space-y-8 pb-12">
              <IngredientInput
                pantryItems={pantryItems}
                onPantryChange={setPantryItems}
              />
              <MacroFilters
                targets={macroTargets}
                onChange={setMacroTargets}
              />
              <div className="text-center pt-4">
                <button
                  onClick={handleSearch}
                  disabled={pantryItems.length === 0}
                  className="relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
                >
                  <span className="text-2xl">🍽️</span>
                  Find My Meals
                  {pantryItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {pantryItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {view === 'results' && (
          <RecipeResults
            recipes={recipes}
            onViewRecipe={handleViewRecipe}
            selectedForShopping={selectedForShopping}
            onToggleShoppingRecipe={handleToggleShoppingRecipe}
            onGenerateShoppingList={handleGenerateShoppingList}
            onBackHome={handleBackToHome}
            pantryCount={pantryItems.length}
          />
        )}

        {view === 'detail' && selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={handleBackToResults}
          />
        )}

        {view === 'shopping' && (
          <ShoppingList
            items={shoppingList}
            onToggleItem={handleToggleShoppingItem}
            onBack={handleBackToResults}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
