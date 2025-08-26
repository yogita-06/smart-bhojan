import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, GroceryItem, WeekPlan, PlannerDay } from './types';

interface AppState {
  // Recipes
  savedRecipes: Recipe[];
  generatedRecipes: Recipe[];
  
  // Planner
  weekPlan: WeekPlan;
  
  // Grocery
  groceryItems: GroceryItem[];
  
  // Actions
  addSavedRecipe: (recipe: Recipe) => void;
  setGeneratedRecipes: (recipes: Recipe[]) => void;
  setPlannerMeal: (day: keyof WeekPlan, meal: keyof PlannerDay, recipe: Recipe | null) => void;
  removePlannerMeal: (day: keyof WeekPlan, meal: keyof PlannerDay) => void;
  clearWeekPlan: () => void;
  
  // Grocery actions
  setGroceryItems: (items: GroceryItem[]) => void;
  toggleGroceryItem: (id: string) => void;
  clearGrocery: () => void;
  regenerateListFromPlanner: () => void;
  
  // Utility
  resetAll: () => void;
}

const createEmptyDay = (): PlannerDay => ({
  breakfast: {},
  lunch: {},
  dinner: {},
});

const createEmptyWeekPlan = (): WeekPlan => ({
  monday: createEmptyDay(),
  tuesday: createEmptyDay(),
  wednesday: createEmptyDay(),
  thursday: createEmptyDay(),
  friday: createEmptyDay(),
  saturday: createEmptyDay(),
  sunday: createEmptyDay(),
});

const generateGroceryId = () => Math.random().toString(36).substr(2, 9);

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      savedRecipes: [],
      generatedRecipes: [],
      weekPlan: createEmptyWeekPlan(),
      groceryItems: [],

      addSavedRecipe: (recipe) =>
        set((state) => {
          const exists = state.savedRecipes.find((r) => r.id === recipe.id);
          if (exists) return state;
          return {
            savedRecipes: [...state.savedRecipes, recipe],
          };
        }),

      setGeneratedRecipes: (recipes) =>
        set({ generatedRecipes: recipes }),

      setPlannerMeal: (day, meal, recipe) =>
        set((state) => ({
          weekPlan: {
            ...state.weekPlan,
            [day]: {
              ...state.weekPlan[day],
              [meal]: recipe ? { recipeId: recipe.id, recipe } : {},
            },
          },
        })),

      removePlannerMeal: (day, meal) =>
        set((state) => ({
          weekPlan: {
            ...state.weekPlan,
            [day]: {
              ...state.weekPlan[day],
              [meal]: {},
            },
          },
        })),

      clearWeekPlan: () => set({ weekPlan: createEmptyWeekPlan() }),

      setGroceryItems: (items) => set({ groceryItems: items }),

      toggleGroceryItem: (id) =>
        set((state) => ({
          groceryItems: state.groceryItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        })),

      clearGrocery: () => set({ groceryItems: [] }),

      regenerateListFromPlanner: () => {
        const { weekPlan } = get();
        const ingredientMap = new Map<string, GroceryItem>();

        Object.values(weekPlan).forEach((day) => {
          Object.values(day).forEach((meal) => {
            if (meal.recipe) {
              meal.recipe.ingredients.forEach((ingredient) => {
                const normalized = ingredient.toLowerCase().trim();
                const existing = ingredientMap.get(normalized);
                
                if (existing) {
                  existing.quantity += 1;
                } else {
                  ingredientMap.set(normalized, {
                    id: generateGroceryId(),
                    name: ingredient,
                    quantity: 1,
                    unit: 'portion',
                    checked: false,
                  });
                }
              });
            }
          });
        });

        set({ groceryItems: Array.from(ingredientMap.values()) });
      },

      resetAll: () =>
        set({
          savedRecipes: [],
          generatedRecipes: [],
          weekPlan: createEmptyWeekPlan(),
          groceryItems: [],
        }),
    }),
    {
      name: 'smart-bhojan-storage',
      partialize: (state) => ({
        savedRecipes: state.savedRecipes,
        weekPlan: state.weekPlan,
        groceryItems: state.groceryItems,
      }),
    }
  )
);