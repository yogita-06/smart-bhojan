'use client';

import { Recipe } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { formatKcal } from '@/lib/format';

interface DayMealCellProps {
  recipe?: Recipe;
  onAssign: () => void;
  onRemove: () => void;
  mealName: string;
}

export function DayMealCell({ recipe, onAssign, onRemove, mealName }: DayMealCellProps) {
  if (!recipe) {
    return (
      <Card className="h-24 border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
        <Button
          variant="ghost"
          className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-blue-600"
          onClick={onAssign}
        >
          <Plus className="w-6 h-6 mb-1" />
          <span className="text-sm">Add {mealName}</span>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="h-24 relative group hover:shadow-md transition-shadow">
      <div className="p-3 h-full flex flex-col justify-between">
        <div>
          <h4 className="font-medium text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
            {recipe.title}
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            {formatKcal(recipe.calories)} • {recipe.cookTime}min
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onAssign}
            className="text-xs px-2 py-1 h-auto"
          >
            Change
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-xs px-2 py-1 h-auto text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}