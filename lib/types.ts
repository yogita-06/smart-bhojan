export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookTime: number;
  servings: number;
  tags: string[];
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
}

export interface GroceryItem {
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  id: string;
}

export interface PlannerMeal {
  recipeId?: string;
  recipe?: Recipe;
}

export interface PlannerDay {
  breakfast: PlannerMeal;
  lunch: PlannerMeal;
  dinner: PlannerMeal;
}

export interface WeekPlan {
  monday: PlannerDay;
  tuesday: PlannerDay;
  wednesday: PlannerDay;
  thursday: PlannerDay;
  friday: PlannerDay;
  saturday: PlannerDay;
  sunday: PlannerDay;
}

export interface BMIData {
  height: number;
  weight: number;
  age: number;
  sex: 'male' | 'female';
  bmi?: number;
  category?: string;
}

export interface CaloriesData {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fat: { grams: number; calories: number };
  };
}

export interface RecipeFormData {
  calories: number;
  cuisine: string;
  timeLimit: number;
  mood: string;
  healthFocus: string;
  includeIngredients: string;
  excludeIngredients: string;
}