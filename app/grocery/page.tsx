'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { GroceryItemRow } from '@/components/grocery-item-row';
import { EmptyState } from '@/components/empty-state';
import { useAppStore } from '@/lib/store';
import { ShoppingCart, Search, Check, X, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

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
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function GroceryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { groceryItems, weekPlan, toggleGroceryItem, clearGrocery, regenerateListFromPlanner } = useAppStore();

  const filteredItems = useMemo(() => {
    return groceryItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [groceryItems, searchTerm]);

  const completedItems = groceryItems.filter(item => item.checked).length;
  const totalItems = groceryItems.length;

  const hasPlannedMeals = Object.values(weekPlan).some(day =>
    Object.values(day).some(meal => meal.recipe)
  );

  const handleGenerateFromPlanner = () => {
    if (!hasPlannedMeals) {
      toast.error('No meals found in your planner. Add some recipes first!');
      return;
    }
    
    regenerateListFromPlanner();
    toast.success('Grocery list generated from your meal plan!');
  };

  const handleCheckAll = () => {
    groceryItems.forEach(item => {
      if (!item.checked) {
        toggleGroceryItem(item.id);
      }
    });
    toast.success('All items checked!');
  };

  const handleUncheckAll = () => {
    groceryItems.forEach(item => {
      if (item.checked) {
        toggleGroceryItem(item.id);
      }
    });
    toast.success('All items unchecked!');
  };

  const handleClearList = () => {
    clearGrocery();
    toast.success('Grocery list cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Smart Grocery Lists"
          description="Automatically generated shopping lists from your meal plans"
        >
          <div className="flex items-center gap-2">
            <Button onClick={handleGenerateFromPlanner} disabled={!hasPlannedMeals}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate from Planner
            </Button>
          </div>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">{completedItems}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Grocery List
              </div>
              {totalItems > 0 && (
                <div className="flex items-center gap-2">
                  <Button onClick={handleCheckAll} size="sm" variant="outline">
                    <Check className="w-4 h-4 mr-1" />
                    Check All
                  </Button>
                  <Button onClick={handleUncheckAll} size="sm" variant="outline">
                    <X className="w-4 h-4 mr-1" />
                    Uncheck All
                  </Button>
                  <Button onClick={handleClearList} size="sm" variant="destructive">
                    Clear
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalItems === 0 ? (
              <EmptyState
                icon={ShoppingCart}
                title="No Items in Your Grocery List"
                description="Generate a grocery list from your meal planner or add items manually."
              >
                <Button onClick={handleGenerateFromPlanner} disabled={!hasPlannedMeals}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {hasPlannedMeals ? 'Generate from Planner' : 'Add Meals to Planner First'}
                </Button>
              </EmptyState>
            ) : (
              <div className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: totalItems > 0 ? `${(completedItems / totalItems) * 100}%` : '0%'
                    }}
                  />
                </div>

                {/* Items List */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="space-y-2"
                >
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No items match your search.
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                      <motion.div key={item.id} variants={itemVariants}>
                        <GroceryItemRow
                          item={item}
                          onToggle={() => toggleGroceryItem(item.id)}
                        />
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}