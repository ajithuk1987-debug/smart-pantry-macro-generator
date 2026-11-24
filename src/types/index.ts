export type Category = 
  | 'protein' 
  | 'vegetable' 
  | 'fruit' 
  | 'dairy' 
  | 'grain' 
  | 'pantry' 
  | 'condiment';

export interface IngredientItem {
  id: string;
  name: string;
  category: Category;
  emoji: string;
  defaultUnit?: string;
  synonyms?: string[];
}

export interface MacroNutrients {
  calories: number; // kcal
  protein: number;  // g
  carbs: number;    // g
  fat: number;      // g
  fiber?: number;   // g
  sodium?: number;  // mg
  potassium?: number; // mg
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  category?: Category;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  difficulty: 'Easy' | 'Medium' | 'Quick';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  macros: MacroNutrients;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  imageUrl: string;
  chefTips?: string;
}

export interface RecipeMatch extends Recipe {
  matchingIngredients: string[];
  missingIngredients: string[];
  matchPercentage: number;
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount?: string;
  recipeName?: string;
  checked: boolean;
  category: Category;
}

export interface MacroTargets {
  minProtein: number;
  maxCalories: number;
  dietFilter: 'all' | 'high-protein' | 'low-carb' | 'vegetarian' | 'quick';
}
