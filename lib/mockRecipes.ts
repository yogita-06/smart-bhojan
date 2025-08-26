import { Recipe, RecipeFormData } from './types';

/* ---------------------------- Data dictionaries ---------------------------- */

const MULTIWORD_WHITELIST = new Set([
  'brown rice', 'basmati rice', 'white rice',
  'red lentils', 'coconut milk', 'olive oil', 'sesame oil',
  'greek yogurt', 'whole wheat pasta', 'soy sauce',
]);

// Minimal alias map for Indian/common terms you use
const ALIAS_MAP: Record<string, string[]> = {
  dal: ['dal', 'lentils', 'red lentils', 'toor dal', 'masoor dal', 'moong dal', 'chana dal'],
  lentil: ['lentil', 'lentils', 'red lentils', 'toor dal', 'masoor dal', 'moong dal', 'chana dal'],
  rice: ['rice', 'brown rice', 'basmati rice', 'white rice'],
  curd: ['curd', 'dahi', 'yogurt', 'greek yogurt'],
  yogurt: ['yogurt', 'greek yogurt', 'curd', 'dahi'],
  paneer: ['paneer', 'cottage cheese'],
  chickpea: ['chickpea', 'chickpeas', 'chana', 'garbanzo'],
  capsicum: ['capsicum', 'bell pepper', 'bell peppers'],
  quinoa: ['quinoa'],
  tofu: ['tofu'],
  oats: ['oats'],
  spinach: ['spinach'],
  tomato: ['tomato', 'tomatoes'],
  onion: ['onion', 'onions'],
};

const cuisineIngredients = {
  indian: [
    'basmati rice', 'lentils', 'chickpeas', 'paneer', 'yogurt', 'spinach',
    'cauliflower', 'potatoes', 'tomatoes', 'onions', 'ginger', 'garlic',
    'turmeric', 'cumin', 'coriander', 'garam masala', 'coconut milk'
  ],
  mediterranean: [
    'olive oil', 'feta cheese', 'olives', 'tomatoes', 'cucumber', 'bell peppers',
    'eggplant', 'zucchini', 'quinoa', 'chickpeas', 'lemon', 'herbs', 'pasta'
  ],
  mexican: [
    'black beans', 'quinoa', 'avocado', 'bell peppers', 'corn', 'tomatoes',
    'lime', 'cilantro', 'cumin', 'paprika', 'cheese', 'tortillas'
  ],
  asian: [
    'tofu', 'brown rice', 'vegetables', 'soy sauce', 'ginger', 'garlic',
    'sesame oil', 'mushrooms', 'bok choy', 'noodles', 'coconut milk'
  ],
  continental: [
    'pasta', 'cheese', 'herbs', 'vegetables', 'olive oil', 'mushrooms',
    'cream', 'spinach', 'tomatoes', 'bell peppers'
  ]
};

const moodBasedRecipes = {
  happy: ['Festive', 'Colorful', 'Celebration', 'Party'],
  stressed: ['Comfort', 'Soothing', 'Calming', 'Simple'],
  energetic: ['Power', 'Energy', 'Vibrant', 'Protein-Rich'],
  lazy: ['One-Pot', 'Quick', 'Easy', 'No-Fuss']
};

const healthFocusedRecipes = {
  pcos: ['Anti-Inflammatory', 'Low-GI', 'Hormone-Balancing'],
  diabetes: ['Low-Sugar', 'High-Fiber', 'Blood-Sugar Friendly'],
  'weight loss': ['Low-Calorie', 'High-Protein', 'Filling'],
  thyroid: ['Iodine-Rich', 'Metabolism-Boosting', 'Anti-Inflammatory'],
  heart: ['Heart-Healthy', 'Low-Sodium', 'Omega-Rich']
};

const generateRecipeId = () => Math.random().toString(36).substr(2, 9);

/* --------------------------------- Recipes -------------------------------- */

const sampleRecipes: Omit<Recipe, 'id'>[] = [
  {
    title: 'Protein-Rich Quinoa Buddha Bowl',
    ingredients: ['quinoa', 'chickpeas', 'avocado', 'spinach', 'bell peppers', 'tahini', 'lemon'],
    calories: 450,
    protein: 18,
    carbs: 52,
    fat: 16,
    cookTime: 25,
    servings: 2,
    tags: ['High-Protein', 'Gluten-Free', 'Vegan'],
    cuisine: 'continental',
    difficulty: 'Easy',
    instructions: [
      'Cook quinoa according to package directions',
      'Roast chickpeas with spices',
      'Prepare vegetables',
      'Make tahini dressing',
      'Assemble bowl and serve'
    ]
  },
  {
    title: 'Spiced Lentil Dal with Brown Rice',
    ingredients: ['red lentils', 'brown rice', 'turmeric', 'cumin', 'ginger', 'tomatoes', 'spinach'],
    calories: 380,
    protein: 16,
    carbs: 58,
    fat: 8,
    cookTime: 30,
    servings: 3,
    tags: ['Comfort', 'High-Fiber', 'Anti-Inflammatory'],
    cuisine: 'indian',
    difficulty: 'Easy',
    instructions: [
      'Cook lentils with spices',
      'Prepare brown rice',
      'Add vegetables to dal',
      'Simmer until thick',
      'Serve hot with rice'
    ]
  },
  {
    title: 'Mediterranean Stuffed Bell Peppers',
    ingredients: ['bell peppers', 'quinoa', 'feta cheese', 'olives', 'tomatoes', 'herbs', 'olive oil'],
    calories: 320,
    protein: 12,
    carbs: 38,
    fat: 14,
    cookTime: 45,
    servings: 4,
    tags: ['Mediterranean', 'Colorful', 'Heart-Healthy'],
    cuisine: 'mediterranean',
    difficulty: 'Medium',
    instructions: [
      'Prepare bell peppers',
      'Cook quinoa filling',
      'Stuff peppers with mixture',
      'Bake until tender',
      'Garnish and serve'
    ]
  },
  {
    title: 'Asian Tofu Stir-Fry with Brown Rice',
    ingredients: ['tofu', 'brown rice', 'bok choy', 'mushrooms', 'soy sauce', 'ginger', 'sesame oil'],
    calories: 340,
    protein: 20,
    carbs: 42,
    fat: 12,
    cookTime: 20,
    servings: 2,
    tags: ['Quick', 'High-Protein', 'Vegan'],
    cuisine: 'asian',
    difficulty: 'Easy',
    instructions: [
      'Press and cube tofu',
      'Cook brown rice',
      'Stir-fry tofu until golden',
      'Add vegetables and sauce',
      'Serve over rice'
    ]
  },
  {
    title: 'Mexican Black Bean Power Bowl',
    ingredients: ['black beans', 'quinoa', 'avocado', 'corn', 'bell peppers', 'lime', 'cilantro'],
    calories: 420,
    protein: 15,
    carbs: 62,
    fat: 14,
    cookTime: 25,
    servings: 2,
    tags: ['Power', 'High-Fiber', 'Energizing'],
    cuisine: 'mexican',
    difficulty: 'Easy',
    instructions: [
      'Cook quinoa and black beans',
      'Prepare fresh vegetables',
      'Make lime dressing',
      'Layer ingredients in bowl',
      'Top with avocado and cilantro'
    ]
  },
  {
    title: 'Creamy Spinach and Mushroom Pasta',
    ingredients: ['whole wheat pasta', 'spinach', 'mushrooms', 'cream cheese', 'garlic', 'herbs'],
    calories: 380,
    protein: 14,
    carbs: 56,
    fat: 12,
    cookTime: 20,
    servings: 3,
    tags: ['Comfort', 'Creamy', 'Quick'],
    cuisine: 'continental',
    difficulty: 'Easy',
    instructions: [
      'Cook pasta al dente',
      'Sauté mushrooms and garlic',
      'Add spinach until wilted',
      'Stir in cream and herbs',
      'Toss with pasta and serve'
    ]
  }
];

/* ------------------------------- Utilities --------------------------------- */

// Basic singularization for simple matches (chickpeas -> chickpea)
function singularize(token: string) {
  if (token.endsWith('ies')) return token.slice(0, -3) + 'y';
  if (token.endsWith('ses')) return token.slice(0, -2);
  if (token.endsWith('s') && !token.endsWith('ss')) return token.slice(0, -1);
  return token;
}

function expandAliases(token: string): string[] {
  const base = token.toLowerCase().trim();
  const key = singularize(base);
  const aliases = new Set<string>([base, key]);
  if (ALIAS_MAP[key]) ALIAS_MAP[key].forEach((a) => aliases.add(a.toLowerCase()));
  return Array.from(aliases);
}

// Split on commas, connectors, etc. Keep known multi-word items intact.
// If an item has spaces and is NOT whitelisted, split into separate single-word tokens.
function normalizeToList(input: string): string[] {
  if (!input?.trim()) return [];
  const replaced = input
    .replace(/\s*\bwith\b\s*/gi, ',')
    .replace(/\s*(?:,|;|\+|\band\b|&|\n)\s*/gi, ',');
  const raw = replaced.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  const out: string[] = [];
  for (const item of raw) {
    if (item.includes(' ') && !MULTIWORD_WHITELIST.has(item)) {
      // e.g., "dal rice" → ["dal", "rice"]; but "brown rice" stays as one (whitelisted)
      item.split(/\s+/).forEach(w => { if (w) out.push(w); });
    } else {
      out.push(item);
    }
  }

  // de-duplicate while preserving order
  const seen = new Set<string>();
  return out.filter(x => (seen.has(x) ? false : (seen.add(x), true)));
}

function recipeMatchesAnyAliases(recipe: Omit<Recipe, 'id'>, aliases: string[]) {
  const ing = recipe.ingredients.map(i => i.toLowerCase());
  return aliases.some(alias => ing.some(r => r.includes(alias)));
}

/* --------------------------------- Main ------------------------------------ */

export function generateMockRecipes(formData: RecipeFormData): Recipe[] {
  const { calories, cuisine, timeLimit, mood, healthFocus } = formData;

  // Flexible parsing for both include/exclude
  const includeInput = (formData.includeIngredients || '').trim();
  const excludeInput = (formData.excludeIngredients || '').trim();

  const includeTokens = normalizeToList(includeInput);
  const excludeTokens = normalizeToList(excludeInput);

  // Expand each token to aliases set
  const includeAliasesList = includeTokens.map(expandAliases);
  const excludeAliasesList = excludeTokens.map(expandAliases);

  // Filter base recipes
  let filtered = sampleRecipes.filter((recipe) => {
    // Time
    if (recipe.cookTime > timeLimit) return false;

    // Cuisine
    if (cuisine !== 'any' && recipe.cuisine !== cuisine) return false;

    // Include (if user provided any → at least one must match)
    if (includeAliasesList.length > 0) {
      const hasRequired = includeAliasesList.some(aliases => recipeMatchesAnyAliases(recipe, aliases));
      if (!hasRequired) return false;
    }

    // Exclude (if any alias matches → reject)
    if (excludeAliasesList.length > 0) {
      const hasExcluded = excludeAliasesList.some(aliases => recipeMatchesAnyAliases(recipe, aliases));
      if (hasExcluded) return false;
    }

    return true;
  });

  // If too few, fall back to all (so UI never looks empty)
  if (filtered.length < 3) {
    filtered = [...sampleRecipes];
  }

  // Rank: closest to target kcal → higher protein → shorter time
  filtered.sort((a, b) => {
    const da = Math.abs(a.calories - calories);
    const db = Math.abs(b.calories - calories);
    if (da !== db) return da - db;
    if (a.protein !== b.protein) return b.protein - a.protein;
    return a.cookTime - b.cookTime;
  });

  // Build final 6 results (with variations & tags for mood/health)
  const results: Recipe[] = [];
  const baseCount = Math.min(filtered.length, 6);

  for (let i = 0; i < 6; i++) {
    const base = filtered[i % baseCount];
    const variation = { ...base };

    // Scale macros linearly to match requested calories
    const ratio = calories / base.calories;
    if (ratio && Math.abs(ratio - 1) > 0.05) {
      variation.calories = Math.round(base.calories * ratio);
      variation.protein = Math.round(base.protein * ratio);
      variation.carbs   = Math.round(base.carbs   * ratio);
      variation.fat     = Math.round(base.fat     * ratio);
    }

    // Add tags by mood/health (take 1 each to keep tags clean)
    let tags = [...variation.tags];
    if (mood !== 'any' && (mood as keyof typeof moodBasedRecipes) in moodBasedRecipes) {
      tags = [...tags, moodBasedRecipes[mood as keyof typeof moodBasedRecipes][0]];
    }
    if (healthFocus !== 'general' && (healthFocus as keyof typeof healthFocusedRecipes) in healthFocusedRecipes) {
      tags = [...tags, healthFocusedRecipes[healthFocus as keyof typeof healthFocusedRecipes][0]];
    }

    // Make a slight variation for later items (faster cook time)
    let title = variation.title;
    let cookTime = variation.cookTime;
    if (i >= baseCount) {
      title = `${title} (Variation ${i - baseCount + 2})`;
      cookTime = Math.max(10, cookTime - 5);
    }

    results.push({
      ...variation,
      id: generateRecipeId(),
      tags: Array.from(new Set(tags)),
      cookTime,
      title,
    });
  }

  return results.slice(0, 6);
}
