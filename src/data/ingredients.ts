import { IngredientItem } from '../types';

export const COMMON_INGREDIENTS: IngredientItem[] = [
  // Proteins
  { id: 'eggs', name: 'Eggs', category: 'protein', emoji: '🥚', defaultUnit: 'pcs', synonyms: ['egg', 'boiled egg', 'scrambled egg'] },
  { id: 'chicken_breast', name: 'Chicken Breast', category: 'protein', emoji: '🍗', defaultUnit: 'g', synonyms: ['chicken', 'chicken meat', 'poultry'] },
  { id: 'salmon', name: 'Salmon Fillet', category: 'protein', emoji: '🐟', defaultUnit: 'g', synonyms: ['salmon', 'fish', 'trout'] },
  { id: 'canned_tuna', name: 'Canned Tuna', category: 'protein', emoji: '🥫', defaultUnit: 'can', synonyms: ['tuna', 'tuna can'] },
  { id: 'tofu', name: 'Tofu / Paneer', category: 'protein', emoji: '🧈', defaultUnit: 'g', synonyms: ['tofu', 'firm tofu', 'paneer', 'cottage cheese'] },
  { id: 'ground_beef', name: 'Ground Beef / Turkey', category: 'protein', emoji: '🥩', defaultUnit: 'g', synonyms: ['beef', 'ground meat', 'mince', 'turkey'] },
  { id: 'greek_yogurt', name: 'Greek Yogurt', category: 'protein', emoji: '🥣', defaultUnit: 'g', synonyms: ['yogurt', 'curd', 'skyr'] },
  { id: 'chickpeas', name: 'Chickpeas / Garbanzo', category: 'protein', emoji: '🧆', defaultUnit: 'can', synonyms: ['chickpea', 'canned chickpeas', 'chana'] },
  { id: 'black_beans', name: 'Black / Kidney Beans', category: 'protein', emoji: '🫘', defaultUnit: 'can', synonyms: ['beans', 'black bean', 'kidney beans'] },
  { id: 'protein_powder', name: 'Protein Powder (Whey/Plant)', category: 'protein', emoji: '🥤', defaultUnit: 'scoop', synonyms: ['whey', 'plant protein'] },
  { id: 'prawns', name: 'Prawns / Shrimp', category: 'protein', emoji: '🦐', defaultUnit: 'g', synonyms: ['shrimp', 'prawn', 'seafood'] },

  // Vegetables
  { id: 'tomato', name: 'Tomatoes', category: 'vegetable', emoji: '🍅', defaultUnit: 'pcs', synonyms: ['tomato', 'cherry tomato', 'roma tomato'] },
  { id: 'spinach', name: 'Spinach / Greens', category: 'vegetable', emoji: '🥬', defaultUnit: 'handful', synonyms: ['spinach', 'baby spinach', 'kale', 'lettuce'] },
  { id: 'broccoli', name: 'Broccoli', category: 'vegetable', emoji: '🥦', defaultUnit: 'head', synonyms: ['broccoli', 'brocolli'] },
  { id: 'bell_pepper', name: 'Bell Peppers', category: 'vegetable', emoji: '🫑', defaultUnit: 'pcs', synonyms: ['pepper', 'sweet pepper', 'capsicum', 'red pepper'] },
  { id: 'onion', name: 'Onions', category: 'vegetable', emoji: '🧅', defaultUnit: 'pcs', synonyms: ['onion', 'red onion', 'white onion'] },
  { id: 'garlic', name: 'Garlic', category: 'vegetable', emoji: '🧄', defaultUnit: 'cloves', synonyms: ['garlic', 'garlic bulb'] },
  { id: 'mushroom', name: 'Mushrooms', category: 'vegetable', emoji: '🍄', defaultUnit: 'g', synonyms: ['mushroom', 'button mushroom', 'portobello'] },
  { id: 'avocado', name: 'Avocado', category: 'vegetable', emoji: '🥑', defaultUnit: 'pcs', synonyms: ['avocado', 'avocados'] },
  { id: 'cucumber', name: 'Cucumber', category: 'vegetable', emoji: '🥒', defaultUnit: 'pcs', synonyms: ['cucumber', 'cuke'] },
  { id: 'carrot', name: 'Carrots', category: 'vegetable', emoji: '🥕', defaultUnit: 'pcs', synonyms: ['carrot', 'baby carrots'] },
  { id: 'zucchini', name: 'Zucchini / Courgette', category: 'vegetable', emoji: '🥒', defaultUnit: 'pcs', synonyms: ['zucchini', 'courgette'] },

  // Grains & Carbs
  { id: 'rice', name: 'Rice (Basmati / Jasmine / Brown)', category: 'grain', emoji: '🍚', defaultUnit: 'cups', synonyms: ['rice', 'cooked rice', 'white rice'] },
  { id: 'oats', name: 'Rolled Oats', category: 'grain', emoji: '🥣', defaultUnit: 'cups', synonyms: ['oats', 'oatmeal'] },
  { id: 'pasta', name: 'Pasta / Noodles', category: 'grain', emoji: '🍝', defaultUnit: 'g', synonyms: ['pasta', 'spaghetti', 'penne', 'noodles'] },
  { id: 'bread', name: 'Whole Grain Bread / Toast', category: 'grain', emoji: '🍞', defaultUnit: 'slices', synonyms: ['bread', 'toast', 'sourdough'] },
  { id: 'quinoa', name: 'Quinoa', category: 'grain', emoji: '🌾', defaultUnit: 'cups', synonyms: ['quinoa'] },
  { id: 'potato', name: 'Potatoes / Sweet Potatoes', category: 'grain', emoji: '🥔', defaultUnit: 'pcs', synonyms: ['potato', 'sweet potato', 'spuds'] },
  { id: 'tortilla', name: 'Tortilla / Wraps', category: 'grain', emoji: '🫓', defaultUnit: 'pcs', synonyms: ['tortilla', 'wrap', 'pita'] },

  // Dairy
  { id: 'milk', name: 'Milk (Dairy / Almond / Oat)', category: 'dairy', emoji: '🥛', defaultUnit: 'ml', synonyms: ['milk', 'almond milk', 'cow milk'] },
  { id: 'cheddar_cheese', name: 'Cheddar / Mozzarella', category: 'dairy', emoji: '🧀', defaultUnit: 'g', synonyms: ['cheese', 'cheddar', 'mozzarella'] },
  { id: 'feta', name: 'Feta Cheese', category: 'dairy', emoji: '🧀', defaultUnit: 'g', synonyms: ['feta', 'goat cheese'] },
  { id: 'butter', name: 'Butter / Ghee', category: 'dairy', emoji: '🧈', defaultUnit: 'tbsp', synonyms: ['butter', 'ghee'] },

  // Fruits
  { id: 'banana', name: 'Bananas', category: 'fruit', emoji: '🍌', defaultUnit: 'pcs', synonyms: ['banana', 'ripe banana'] },
  { id: 'apple', name: 'Apples', category: 'fruit', emoji: '🍎', defaultUnit: 'pcs', synonyms: ['apple', 'green apple'] },
  { id: 'berries', name: 'Berries (Blueberries/Strawberries)', category: 'fruit', emoji: '🫐', defaultUnit: 'g', synonyms: ['blueberry', 'strawberry', 'berries'] },
  { id: 'lemon', name: 'Lemon / Lime', category: 'fruit', emoji: '🍋', defaultUnit: 'pcs', synonyms: ['lemon', 'lime', 'citrus'] },

  // Pantry & Condiments
  { id: 'olive_oil', name: 'Olive Oil / Cooking Oil', category: 'condiment', emoji: '🫒', defaultUnit: 'tbsp', synonyms: ['olive oil', 'oil', 'vegetable oil'] },
  { id: 'soy_sauce', name: 'Soy Sauce / Tamari', category: 'condiment', emoji: '🥢', defaultUnit: 'tbsp', synonyms: ['soy sauce', 'tamari'] },
  { id: 'peanut_butter', name: 'Peanut / Almond Butter', category: 'pantry', emoji: '🥜', defaultUnit: 'tbsp', synonyms: ['peanut butter', 'almond butter'] },
  { id: 'honey', name: 'Honey / Maple Syrup', category: 'condiment', emoji: '🍯', defaultUnit: 'tbsp', synonyms: ['honey', 'maple syrup'] },
  { id: 'chia_seeds', name: 'Chia / Flax Seeds', category: 'pantry', emoji: '🌱', defaultUnit: 'tbsp', synonyms: ['chia', 'chia seeds', 'flaxseeds'] },
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  protein: { label: 'Proteins', icon: '🥩' },
  vegetable: { label: 'Veggies', icon: '🥦' },
  grain: { label: 'Grains & Carbs', icon: '🌾' },
  dairy: { label: 'Dairy & Eggs', icon: '🧀' },
  fruit: { label: 'Fruits', icon: '🍎' },
  pantry: { label: 'Pantry Staples', icon: '🥜' },
  condiment: { label: 'Oils & Sauces', icon: '🫒' },
};
