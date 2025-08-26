'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/page-header';
import { BMIData, CaloriesData } from '@/lib/types';
import {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  adjustCaloriesForGoal,
  calculateMacros,
  formatKcal,
  formatGrams
} from '@/lib/format';
import { Calculator, Target, TrendingUp } from 'lucide-react';

const bmiSchema = z.object({
  height: z.number().min(100).max(250),
  weight: z.number().min(30).max(300),
  age: z.number().min(10).max(120),
  sex: z.enum(['male', 'female']),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function BMICaloriesPage() {
  const [bmiResult, setBmiResult] = useState<BMIData | null>(null);
  const [calorieResult, setCalorieResult] = useState<CaloriesData | null>(null);
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [macroPreset, setMacroPreset] = useState('balanced');

  const bmiForm = useForm<BMIData>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      height: 170,
      weight: 70,
      age: 30,
      sex: 'female',
    },
  });

  const calculateBMIResult = (data: BMIData) => {
    const bmi = calculateBMI(data.height, data.weight);
    const category = getBMICategory(bmi);
    
    setBmiResult({
      ...data,
      bmi: Math.round(bmi * 10) / 10,
      category,
    });

    // Auto-calculate calories
    calculateCalorieResult(data);
  };

  const calculateCalorieResult = (bmiData: BMIData) => {
    const bmr = calculateBMR(bmiData.weight, bmiData.height, bmiData.age, bmiData.sex);
    const tdee = calculateTDEE(bmr, activityLevel);
    const targetCalories = adjustCaloriesForGoal(tdee, goal);
    const macros = calculateMacros(targetCalories, macroPreset);

    setCalorieResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      macros,
    });
  };

  const getBMIColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'bg-blue-100 text-blue-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Overweight': return 'bg-yellow-100 text-yellow-800';
      case 'Obese': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="BMI & Calorie Calculator"
          description="Calculate your BMI, daily calorie needs, and personalized macro requirements"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* BMI Calculator */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  BMI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={bmiForm.handleSubmit(calculateBMIResult)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        min={100}
                        max={250}
                        {...bmiForm.register('height', { valueAsNumber: true })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        min={30}
                        max={300}
                        {...bmiForm.register('weight', { valueAsNumber: true })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        min={10}
                        max={120}
                        {...bmiForm.register('age', { valueAsNumber: true })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sex">Sex</Label>
                      <Select onValueChange={(value) => bmiForm.setValue('sex', value as 'male' | 'female')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Calculate BMI
                  </Button>
                </form>

                {bmiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {bmiResult.bmi}
                      </div>
                      <Badge className={getBMIColor(bmiResult.category!)}>
                        {bmiResult.category}
                      </Badge>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Calorie Calculator */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Calorie Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="activity">Activity Level</Label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                        <SelectItem value="light">Lightly Active (Light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderately Active (Moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Very Active (Hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="very-active">Super Active (Physical job + exercise)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="goal">Goal</Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose-1">Lose 1 kg/week</SelectItem>
                        <SelectItem value="lose-0.5">Lose 0.5 kg/week</SelectItem>
                        <SelectItem value="maintain">Maintain weight</SelectItem>
                        <SelectItem value="gain-0.5">Gain 0.5 kg/week</SelectItem>
                        <SelectItem value="gain-1">Gain 1 kg/week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="macros">Macro Distribution</Label>
                    <Select value={macroPreset} onValueChange={setMacroPreset}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced (30P/40C/30F)</SelectItem>
                        <SelectItem value="high-protein">High Protein (40P/35C/25F)</SelectItem>
                        <SelectItem value="low-carb">Low Carb (35P/25C/40F)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {bmiResult && (
                    <Button
                      onClick={() => calculateCalorieResult(bmiResult)}
                      className="w-full"
                    >
                      Calculate Calories
                    </Button>
                  )}
                </div>

                {calorieResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                          {formatKcal(calorieResult.bmr)}
                        </div>
                        <div className="text-sm text-gray-600">BMR</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {formatKcal(calorieResult.tdee)}
                        </div>
                        <div className="text-sm text-gray-600">TDEE</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">
                          {formatKcal(calorieResult.targetCalories)}
                        </div>
                        <div className="text-sm text-gray-600">Target</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-3">Daily Macros</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {formatGrams(calorieResult.macros.protein.grams)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Protein ({formatKcal(calorieResult.macros.protein.calories)})
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-600">
                            {formatGrams(calorieResult.macros.carbs.grams)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Carbs ({formatKcal(calorieResult.macros.carbs.calories)})
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {formatGrams(calorieResult.macros.fat.grams)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Fat ({formatKcal(calorieResult.macros.fat.calories)})
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}