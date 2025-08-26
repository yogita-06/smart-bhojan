'use client';

import { Recipe } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Bookmark, Calendar } from 'lucide-react';
import { formatKcal, formatCookTime, pluralize } from '@/lib/format';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToPlanner?: (recipe: Recipe) => void;
  onSave?: (recipe: Recipe) => void;
  saved?: boolean;
}

export function RecipeCard({ recipe, onAddToPlanner, onSave, saved = false }: RecipeCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
          {recipe.title}
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{formatCookTime(recipe.cookTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{pluralize(recipe.servings, 'serving')}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-center text-sm bg-gray-50 rounded-lg p-3">
          <div>
            <div className="font-semibold text-blue-600">{recipe.calories}</div>
            <div className="text-gray-500 text-xs">kcal</div>
          </div>
          <div>
            <div className="font-semibold text-green-600">{recipe.protein}g</div>
            <div className="text-gray-500 text-xs">protein</div>
          </div>
          <div>
            <div className="font-semibold text-yellow-600">{recipe.carbs}g</div>
            <div className="text-gray-500 text-xs">carbs</div>
          </div>
          <div>
            <div className="font-semibold text-purple-600">{recipe.fat}g</div>
            <div className="text-gray-500 text-xs">fat</div>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">Key ingredients:</p>
          <p className="text-sm text-gray-700 line-clamp-2">
            {recipe.ingredients.slice(0, 6).join(', ')}
            {recipe.ingredients.length > 6 && '...'}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 space-x-2">
        {onAddToPlanner && (
          <Button
            size="sm"
            onClick={() => onAddToPlanner(recipe)}
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Add to Plan
          </Button>
        )}
        {onSave && (
          <Button
            variant={saved ? "secondary" : "outline"}
            size="sm"
            onClick={() => onSave(recipe)}
            className="flex-1"
          >
            <Bookmark className={`w-4 h-4 mr-1 ${saved ? 'fill-current' : ''}`} />
            {saved ? 'Saved' : 'Save'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}