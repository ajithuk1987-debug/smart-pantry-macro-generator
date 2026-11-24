import { RecipeMatch, MacroTargets, ShoppingItem } from '../types';
import { RECIPES } from '../data/recipes';

/**
 * Core recipe matching engine.
 * Matches user's pantry ingredients against the recipe database,
 * filters by macro targets, and generates a minimal top-up shopping list.
 */

function normalizeIngredientName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Check if a pantry item matches a recipe ingredient */
function ingredientMatches(pantryName: string, recipeIngName: string): boolean {
  const pantry = normalizeIngredientName(pantryName);
  const recipe = normalizeIngredientName(recipeIngName);

  // Direct match
  if (pantry === recipe) return true;

  // Partial match (either contains the other)
  if (pantry.includes(recipe) || recipe.includes(pantry)) return true;

  // Word-level match — if any significant word matches
  const pantryWords = pantry.split(' ').filter((w) => w.length > 2);
  const recipeWords = recipe.split(' ').filter((w) => w.length > 2);

  for (const pw of pantryWords) {
    for (const rw of recipeWords) {
      if (pw === rw || pw.includes(rw) || rw.includes(pw)) return true;
    }
  }

  return false;
}

/** Find matching recipes ranked by ingredient overlap */
export function findMatchingRecipes(
  pantryItems: string[],
  targets: MacroTargets
): RecipeMatch[] {
  const results: RecipeMatch[] = [];

  for (const recipe of RECIPES) {
    // Required (non-optional) ingredients
    const requiredIngredients = recipe.ingredients.filter((i) => !i.optional);
    const allIngredients = recipe.ingredients;

    const matching: string[] = [];
    const missing: string[] = [];

    for (const ri of allIngredients) {
      const isInPantry = pantryItems.some((p) => ingredientMatches(p, ri.name));
      if (isInPantry) {
        matching.push(ri.name);
      } else if (!ri.optional) {
        missing.push(ri.name);
      }
    }

    // Must match at least 1 ingredient
    if (matching.length === 0) continue;

    const matchPercentage = requiredIngredients.length > 0
      ? Math.round(
          (matching.filter((m) =>
            requiredIngredients.some((ri) => ingredientMatches(m, ri.name))
          ).length /
            requiredIngredients.length) *
            100
        )
      : 0;

    // Apply macro filters
    if (targets.minProtein > 0 && recipe.macros.protein < targets.minProtein) continue;
    if (targets.maxCalories > 0 && recipe.macros.calories > targets.maxCalories) continue;

    // Diet filter
    if (targets.dietFilter === 'vegetarian' && !recipe.tags.includes('vegetarian')) continue;
    if (targets.dietFilter === 'high-protein' && !recipe.tags.includes('high-protein')) continue;
    if (targets.dietFilter === 'low-carb' && !recipe.tags.includes('low-carb')) continue;
    if (targets.dietFilter === 'quick' && !recipe.tags.includes('quick')) continue;

    results.push({
      ...recipe,
      matchingIngredients: matching,
      missingIngredients: missing,
      matchPercentage,
    });
  }

  // Sort: highest match percentage first, then by protein
  return results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    return b.macros.protein - a.macros.protein;
  });
}

/** Generate a minimal shopping list from missing ingredients across selected recipes */
export function generateShoppingList(
  selectedRecipes: RecipeMatch[]
): ShoppingItem[] {
  const itemMap = new Map<string, ShoppingItem>();

  for (const recipe of selectedRecipes) {
    for (const missing of recipe.missingIngredients) {
      const key = normalizeIngredientName(missing);

      if (!itemMap.has(key)) {
        // Find the category from recipe ingredient list
        const recipeIng = recipe.ingredients.find((i) =>
          ingredientMatches(missing, i.name)
        );

        itemMap.set(key, {
          id: key.replace(/\s+/g, '-'),
          name: missing,
          amount: recipeIng?.amount,
          recipeName: recipe.title,
          checked: false,
          category: recipeIng?.category || 'pantry',
        });
      }
    }
  }

  return Array.from(itemMap.values()).sort((a, b) =>
    a.category.localeCompare(b.category)
  );
}
