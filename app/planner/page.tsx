'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { DayMealCell } from '@/components/day-meal-cell';
import { PlannerDayPickerDialog } from '@/components/planner-day-picker-dialog';
import { EmptyState } from '@/components/empty-state';
import { useAppStore } from '@/lib/store';
import { WeekPlan, PlannerDay, Recipe } from '@/lib/types';
import { exportPlanToJSON, downloadJSON } from '@/lib/pdf';
import { Calendar, Download, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

const days: { key: keyof WeekPlan; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

const meals: { key: keyof PlannerDay; label: string }[] = [
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export default function PlannerPage() {
  const { weekPlan, generatedRecipes, savedRecipes, setPlannerMeal, removePlannerMeal, clearWeekPlan } = useAppStore();
  const [selectedMeal, setSelectedMeal] = useState<{ day: keyof WeekPlan; meal: keyof PlannerDay } | null>(null);
  
  const allRecipes = [...generatedRecipes, ...savedRecipes];
  
  const handleAssignMeal = (day: keyof WeekPlan, meal: keyof PlannerDay) => {
    setSelectedMeal({ day, meal });
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    if (selectedMeal) {
      setPlannerMeal(selectedMeal.day, selectedMeal.meal, recipe);
      setSelectedMeal(null);
      toast.success(`Added ${recipe.title} to ${selectedMeal.day} ${selectedMeal.meal}`);
    }
  };

  const handleRemoveMeal = (day: keyof WeekPlan, meal: keyof PlannerDay) => {
    removePlannerMeal(day, meal);
    toast.success('Meal removed from plan');
  };

  const handleClearWeek = () => {
    clearWeekPlan();
    toast.success('Week plan cleared');
  };

  const handleSavePlan = () => {
    // In a real app, this would save to a backend
    toast.success('Meal plan saved successfully!');
  };

  const handleExportPlan = () => {
    try {
      const jsonData = exportPlanToJSON(weekPlan);
      downloadJSON(jsonData, `meal-plan-${new Date().toISOString().split('T')[0]}.json`);
      toast.success('Meal plan exported successfully!');
    } catch (error) {
      toast.error('Failed to export meal plan');
    }
  };

  const getTotalMeals = () => {
    return Object.values(weekPlan).reduce((total, day) => {
      return total + Object.values(day).filter(meal => meal.recipe).length;
    }, 0);
  };

  const getTotalCalories = () => {
    return Object.values(weekPlan).reduce((total, day) => {
      return total + Object.values(day).reduce((dayTotal, meal) => {
        return dayTotal + (meal.recipe?.calories || 0);
      }, 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="7-Day Meal Planner"
          description="Plan your weekly vegetarian meals with organized breakfast, lunch, and dinner schedules"
        >
          <div className="flex items-center gap-2">
            <Button onClick={handleSavePlan} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Plan
            </Button>
            <Button onClick={handleExportPlan} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleClearWeek} variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Week
            </Button>
          </div>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{getTotalMeals()}</div>
              <div className="text-sm text-gray-600">Meals Planned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{getTotalCalories()}</div>
              <div className="text-sm text-gray-600">Total Calories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">{allRecipes.length}</div>
              <div className="text-sm text-gray-600">Available Recipes</div>
            </CardContent>
          </Card>
        </div>

        {/* Planner Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Meal Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allRecipes.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No Recipes Available"
                description="Generate or save some recipes first to start planning your meals."
              >
                <Button asChild>
                  <a href="/dashboard">Generate Recipes</a>
                </Button>
              </EmptyState>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="overflow-x-auto"
              >
                <div className="min-w-[800px]">
                  {/* Header Row */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="font-semibold text-gray-700">Day</div>
                    {meals.map((meal) => (
                      <div key={meal.key} className="font-semibold text-gray-700 text-center">
                        {meal.label}
                      </div>
                    ))}
                  </div>

                  {/* Meal Grid */}
                  {days.map((day) => (
                    <motion.div
                      key={day.key}
                      variants={itemVariants}
                      className="grid grid-cols-4 gap-4 mb-4"
                    >
                      <div className="flex items-center font-medium text-gray-900">
                        {day.label}
                      </div>
                      {meals.map((meal) => (
                        <DayMealCell
                          key={`${day.key}-${meal.key}`}
                          recipe={weekPlan[day.key][meal.key].recipe}
                          onAssign={() => handleAssignMeal(day.key, meal.key)}
                          onRemove={() => handleRemoveMeal(day.key, meal.key)}
                          mealName={meal.label}
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Recipe Selection Modal */}
        {selectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">
                  Select Recipe for {selectedMeal.day} {selectedMeal.meal}
                </h3>
                <Button
                  onClick={() => setSelectedMeal(null)}
                  variant="ghost"
                  className="absolute top-4 right-4"
                >
                  ✕
                </Button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {allRecipes.map((recipe) => (
                  <div key={recipe.id} onClick={() => handleSelectRecipe(recipe)} className="cursor-pointer">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{recipe.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600">
                          {recipe.calories} kcal • {recipe.cookTime} min
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}