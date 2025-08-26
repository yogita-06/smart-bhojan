'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Recipe, WeekPlan, PlannerDay } from '@/lib/types';
import { useAppStore } from '@/lib/store';

interface PlannerDayPickerDialogProps {
  recipe: Recipe;
  trigger: React.ReactNode;
}

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

export function PlannerDayPickerDialog({ recipe, trigger }: PlannerDayPickerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const setPlannerMeal = useAppStore(state => state.setPlannerMeal);

  const handleSelect = (day: keyof WeekPlan, meal: keyof PlannerDay) => {
    setPlannerMeal(day, meal, recipe);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Meal Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Choose when to add "{recipe.title}" to your meal plan:
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            {days.map(day => (
              <div key={day.key} className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">{day.label}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {meals.map(meal => (
                    <Button
                      key={`${day.key}-${meal.key}`}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelect(day.key, meal.key)}
                      className="text-xs"
                    >
                      {meal.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}