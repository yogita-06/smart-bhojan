'use client';

import { GroceryItem } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

interface GroceryItemRowProps {
  item: GroceryItem;
  onToggle: () => void;
}

export function GroceryItemRow({ item, onToggle }: GroceryItemRowProps) {
  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      <Checkbox
        checked={item.checked}
        onCheckedChange={onToggle}
        className="flex-shrink-0"
      />
      <div className="flex-1">
        <span className={`text-sm ${item.checked ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {item.name}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        {item.quantity} {item.unit}
      </div>
    </div>
  );
}