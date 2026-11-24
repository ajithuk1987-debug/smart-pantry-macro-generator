import { COMMON_INGREDIENTS } from '../data/ingredients';
import { IngredientItem } from '../types';

/**
 * Lightweight client-side image → ingredient detection.
 * Uses the browser's built-in Canvas API + simple color/shape heuristics.
 * 
 * This is a *rule-based* recogniser (no paid API, no ML model download).
 * It analyses average colour of image regions and matches against known
 * colour profiles for common food items.
 * 
 * For a production app you'd swap this with a free on-device model like
 * TensorFlow.js MobileNet, but that adds ~5 MB download and doesn't
 * always recognise individual grocery items well.
 * 
 * Our approach: We ask the user to confirm / correct after detection,
 * making the UX forgiving of imperfect detection.
 */

interface ColorProfile {
  ingredientId: string;
  r: [number, number]; // min-max red
  g: [number, number]; // min-max green
  b: [number, number]; // min-max blue
  keywords: string[];
}

// Approximate colour profiles for common pantry items
const COLOR_PROFILES: ColorProfile[] = [
  { ingredientId: 'tomato', r: [160, 255], g: [20, 100], b: [20, 80], keywords: ['red', 'round'] },
  { ingredientId: 'eggs', r: [180, 255], g: [160, 230], b: [120, 200], keywords: ['oval', 'white', 'brown'] },
  { ingredientId: 'banana', r: [200, 255], g: [180, 240], b: [30, 120], keywords: ['yellow', 'long'] },
  { ingredientId: 'broccoli', r: [20, 100], g: [80, 180], b: [20, 100], keywords: ['green', 'tree'] },
  { ingredientId: 'carrot', r: [200, 255], g: [100, 180], b: [0, 80], keywords: ['orange', 'long'] },
  { ingredientId: 'spinach', r: [20, 100], g: [80, 160], b: [20, 80], keywords: ['dark green', 'leaf'] },
  { ingredientId: 'bell_pepper', r: [140, 255], g: [40, 200], b: [0, 80], keywords: ['pepper', 'colorful'] },
  { ingredientId: 'onion', r: [150, 220], g: [100, 180], b: [60, 140], keywords: ['round', 'brown'] },
  { ingredientId: 'lemon', r: [220, 255], g: [200, 255], b: [0, 100], keywords: ['yellow', 'citrus'] },
  { ingredientId: 'apple', r: [140, 255], g: [30, 130], b: [20, 80], keywords: ['red', 'round', 'fruit'] },
  { ingredientId: 'avocado', r: [30, 100], g: [60, 120], b: [20, 70], keywords: ['dark green', 'oval'] },
  { ingredientId: 'chicken_breast', r: [200, 255], g: [160, 220], b: [140, 200], keywords: ['pink', 'meat'] },
  { ingredientId: 'mushroom', r: [160, 220], g: [140, 200], b: [120, 180], keywords: ['brown', 'white'] },
  { ingredientId: 'potato', r: [160, 220], g: [120, 180], b: [60, 130], keywords: ['brown', 'round'] },
  { ingredientId: 'cucumber', r: [30, 110], g: [100, 180], b: [30, 100], keywords: ['green', 'long'] },
  { ingredientId: 'berries', r: [60, 150], g: [20, 80], b: [80, 180], keywords: ['blue', 'purple', 'small'] },
];

function getAverageColor(
  imageData: ImageData,
  startX: number,
  startY: number,
  regionW: number,
  regionH: number
): [number, number, number] {
  let r = 0, g = 0, b = 0, count = 0;
  const { data, width } = imageData;

  for (let y = startY; y < startY + regionH && y < imageData.height; y++) {
    for (let x = startX; x < startX + regionW && x < width; x++) {
      const idx = (y * width + x) * 4;
      r += data[idx];
      g += data[idx + 1];
      b += data[idx + 2];
      count++;
    }
  }

  return count > 0 ? [r / count, g / count, b / count] : [0, 0, 0];
}

function matchColorToIngredient(
  r: number,
  g: number,
  b: number
): string | null {
  let bestMatch: string | null = null;
  let bestScore = Infinity;

  for (const profile of COLOR_PROFILES) {
    const rInRange = r >= profile.r[0] && r <= profile.r[1];
    const gInRange = g >= profile.g[0] && g <= profile.g[1];
    const bInRange = b >= profile.b[0] && b <= profile.b[1];

    if (rInRange && gInRange && bInRange) {
      // Distance from center of range
      const rCenter = (profile.r[0] + profile.r[1]) / 2;
      const gCenter = (profile.g[0] + profile.g[1]) / 2;
      const bCenter = (profile.b[0] + profile.b[1]) / 2;
      const dist = Math.sqrt((r - rCenter) ** 2 + (g - gCenter) ** 2 + (b - bCenter) ** 2);

      if (dist < bestScore) {
        bestScore = dist;
        bestMatch = profile.ingredientId;
      }
    }
  }

  return bestMatch;
}

export async function detectIngredientsFromImage(
  imageFile: File
): Promise<IngredientItem[]> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxDim = 400; // Downsample for speed
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve([]);
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Divide image into a grid of regions and analyse each
      const gridCols = 4;
      const gridRows = 4;
      const regionW = Math.floor(canvas.width / gridCols);
      const regionH = Math.floor(canvas.height / gridRows);

      const detectedIds = new Set<string>();

      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const [r, g, b] = getAverageColor(
            imageData,
            col * regionW,
            row * regionH,
            regionW,
            regionH
          );

          const match = matchColorToIngredient(r, g, b);
          if (match) {
            detectedIds.add(match);
          }
        }
      }

      // Map to full ingredient objects
      const detected = COMMON_INGREDIENTS.filter((ing) =>
        detectedIds.has(ing.id)
      );

      URL.revokeObjectURL(url);
      resolve(detected);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve([]);
    };

    img.src = url;
  });
}

/**
 * Text-based ingredient detection from comma-separated text.
 * Falls back to fuzzy matching using synonyms.
 */
export function detectIngredientsFromText(input: string): IngredientItem[] {
  const terms = input
    .toLowerCase()
    .split(/[,;\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const matched = new Set<string>();
  const results: IngredientItem[] = [];

  for (const term of terms) {
    for (const ing of COMMON_INGREDIENTS) {
      if (matched.has(ing.id)) continue;

      const nameMatch = ing.name.toLowerCase().includes(term) || term.includes(ing.name.toLowerCase());
      const synonymMatch = ing.synonyms?.some(
        (s) => s.toLowerCase().includes(term) || term.includes(s.toLowerCase())
      );

      if (nameMatch || synonymMatch) {
        matched.add(ing.id);
        results.push(ing);
      }
    }
  }

  return results;
}
