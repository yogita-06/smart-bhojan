'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/page-header';
import { RecipeCard } from '@/components/recipe-card';
import { PlannerDayPickerDialog } from '@/components/planner-day-picker-dialog';
import { EmptyState } from '@/components/empty-state';
import { useAppStore } from '@/lib/store';
import { generateMockRecipes } from '@/lib/mockRecipes';
import type { Recipe } from '@/lib/types';
import { Sparkles, Loader2, ChefHat, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

/* ----------------------------- Validation Schema ---------------------------- */

const formSchema = z.object({
  calories: z
    .number({ error: 'Enter a number' })
    .min(200, 'Min 200 kcal')
    .max(3000, 'Max 3000 kcal'),
  cuisine: z.string().min(1, 'Pick a cuisine'),
  timeLimit: z
    .number({ error: 'Enter minutes' })
    .min(10, 'At least 10 minutes')
    .max(180, 'Max 180 minutes'),
  mood: z.string().min(1, 'Pick a mood'),
  healthFocus: z.string().min(1, 'Pick a health focus'),
  includeIngredients: z.string(),
  excludeIngredients: z.string(),
});

type RecipeFormData = z.infer<typeof formSchema>;

/* --------------------------- Animation (subtle, nice) ----------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

/* ------------------------------- Helpers ----------------------------------- */

// Normalize "include/exclude" text to a clean, comma-separated list:
// - Treats ",", "and", "&", newlines as separators
// - Trims spaces, lowercases, removes duplicates
function normalizeList(input: string): string {
  if (!input?.trim()) return '';
  const replaced = input.replace(/\band\b|&|\n/gi, ',');
  const items = replaced
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.toLowerCase());
  // de-duplicate while keeping order
  const seen = new Set<string>();
  const unique = items.filter((x) => (seen.has(x) ? false : (seen.add(x), true)));
  return unique.join(', ');
}

/* --------------------------------- Page ------------------------------------ */

export default function DashboardPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { generatedRecipes, savedRecipes, setGeneratedRecipes, addSavedRecipe } = useAppStore();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calories: 400,
      cuisine: 'any',
      timeLimit: 30,
      mood: 'any',
      healthFocus: 'general',
      includeIngredients: '',
      excludeIngredients: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (raw: RecipeFormData) => {
    setIsGenerating(true);
    // Small UX delay (optional) to mimic network
    await new Promise((r) => setTimeout(r, 600));

    try {
      const data: RecipeFormData = {
        ...raw,
        includeIngredients: normalizeList(raw.includeIngredients || ''),
        excludeIngredients: normalizeList(raw.excludeIngredients || ''),
      };

      const recipes = generateMockRecipes(data as any);
      setGeneratedRecipes(recipes);
      toast.success(`Generated ${recipes.length} personalized recipes!`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate recipes. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    addSavedRecipe(recipe);
    toast.success('Recipe saved successfully!');
  };

  const isRecipeSaved = (recipeId: string) => savedRecipes.some((r) => r.id === recipeId);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="AI Recipe Generator"
          description="Generate personalized vegetarian recipes based on your preferences and health goals"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ------------------------------- Form -------------------------------- */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Recipe Preferences
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Calories */}
                  <div>
                    <Label htmlFor="calories">Target Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      inputMode="numeric"
                      min={200}
                      max={3000}
                      placeholder="e.g., 400"
                      aria-invalid={!!errors.calories}
                      {...register('calories', { valueAsNumber: true })}
                    />
                    {errors.calories && (
                      <p className="mt-1 text-sm text-red-600">{errors.calories.message}</p>
                    )}
                  </div>

                  {/* Cuisine */}
                  <div>
                    <Label htmlFor="cuisine">Cuisine Type</Label>
                    <Controller
                      control={control}
                      name="cuisine"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="cuisine">
                            <SelectValue placeholder="Select cuisine" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Cuisine</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="mediterranean">Mediterranean</SelectItem>
                            <SelectItem value="mexican">Mexican</SelectItem>
                            <SelectItem value="asian">Asian</SelectItem>
                            <SelectItem value="continental">Continental</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.cuisine && (
                      <p className="mt-1 text-sm text-red-600">{errors.cuisine.message}</p>
                    )}
                  </div>

                  {/* Time Limit */}
                  <div>
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      inputMode="numeric"
                      min={10}
                      max={180}
                      placeholder="e.g., 30"
                      aria-invalid={!!errors.timeLimit}
                      {...register('timeLimit', { valueAsNumber: true })}
                    />
                    {errors.timeLimit && (
                      <p className="mt-1 text-sm text-red-600">{errors.timeLimit.message}</p>
                    )}
                  </div>

                  {/* Mood */}
                  <div>
                    <Label htmlFor="mood">Current Mood</Label>
                    <Controller
                      control={control}
                      name="mood"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="mood">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="stressed">Stressed</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="lazy">Lazy</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.mood && (
                      <p className="mt-1 text-sm text-red-600">{errors.mood.message}</p>
                    )}
                  </div>

                  {/* Health Focus */}
                  <div>
                    <Label htmlFor="healthFocus">Health Focus</Label>
                    <Controller
                      control={control}
                      name="healthFocus"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger id="healthFocus">
                            <SelectValue placeholder="Select health focus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Health</SelectItem>
                            <SelectItem value="pcos">PCOS</SelectItem>
                            <SelectItem value="diabetes">Diabetes</SelectItem>
                            <SelectItem value="weight loss">Weight Loss</SelectItem>
                            <SelectItem value="thyroid">Thyroid</SelectItem>
                            <SelectItem value="heart">Heart Health</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.healthFocus && (
                      <p className="mt-1 text-sm text-red-600">{errors.healthFocus.message}</p>
                    )}
                  </div>

                  {/* Include Ingredients */}
                  <div>
                    <Label htmlFor="includeIngredients">Include Ingredients</Label>
                    <Textarea
                      id="includeIngredients"
                      placeholder="e.g., dal and rice  •  oats & yogurt  •  paneer, spinach"
                      {...register('includeIngredients')}
                      onBlur={(e) => {
                        // live-normalize on blur for a cleaner UX
                        const cleaned = normalizeList(e.target.value || '');
                        setValue('includeIngredients', cleaned);
                      }}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Tip: Use commas, “and”, “&” or new lines. We’ll clean it up for you.
                    </p>
                  </div>

                  {/* Exclude Ingredients */}
                  <div>
                    <Label htmlFor="excludeIngredients">Exclude Ingredients</Label>
                    <Textarea
                      id="excludeIngredients"
                      placeholder="e.g., mushrooms, eggplant"
                      {...register('excludeIngredients')}
                      onBlur={(e) => {
                        const cleaned = normalizeList(e.target.value || '');
                        setValue('excludeIngredients', cleaned);
                      }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="w-full" disabled={isGenerating || isSubmitting}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating Recipes...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Recipes
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="shrink-0"
                      onClick={() =>
                        reset({
                          calories: 400,
                          cuisine: 'any',
                          timeLimit: 30,
                          mood: 'any',
                          healthFocus: 'general',
                          includeIngredients: '',
                          excludeIngredients: '',
                        })
                      }
                      disabled={isGenerating || (!isDirty && generatedRecipes.length === 0)}
                      title="Reset form"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* ------------------------------ Results ------------------------------ */}
          <div className="lg:col-span-2">
            {isGenerating ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
                    <div className="h-3 bg-gray-300 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : generatedRecipes.length > 0 ? (
              <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Generated Recipes ({generatedRecipes.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {generatedRecipes.map((recipe) => (
                    <motion.div key={recipe.id} variants={itemVariants}>
                      <RecipeCard
                        recipe={recipe}
                        onAddToPlanner={(recipe) => (
                          <PlannerDayPickerDialog
                            recipe={recipe}
                            trigger={<div>Add to Planner</div>}
                          />
                        )}
                        onSave={handleSaveRecipe}
                        saved={isRecipeSaved(recipe.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <EmptyState
                icon={ChefHat}
                title="Ready to Generate Recipes"
                description="Fill in your preferences on the left and click 'Generate Recipes' to get personalized vegetarian recipes powered by AI."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
