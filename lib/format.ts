export function formatKcal(calories: number): string {
  return `${calories} kcal`;
}

export function formatGrams(grams: number): string {
  return `${Math.round(grams)}g`;
}

export function formatMacroPercentage(calories: number, totalCalories: number): string {
  const percentage = (calories / totalCalories) * 100;
  return `${Math.round(percentage)}%`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || `${singular}s`}`;
}

export function formatCookTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return pluralize(hours, 'hour');
  }
  return `${hours}h ${remainingMinutes}m`;
}

export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function calculateBMR(weight: number, height: number, age: number, sex: 'male' | 'female'): number {
  // Mifflin-St Jeor Equation
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.2);
}

export function adjustCaloriesForGoal(tdee: number, goal: string): number {
  switch (goal) {
    case 'lose-0.5':
      return tdee - 250; // 0.5 kg/week loss
    case 'lose-1':
      return tdee - 500; // 1 kg/week loss
    case 'gain-0.5':
      return tdee + 250; // 0.5 kg/week gain
    case 'gain-1':
      return tdee + 500; // 1 kg/week gain
    default:
      return tdee; // maintain
  }
}

export function calculateMacros(calories: number, preset: string) {
  const presets = {
    balanced: { protein: 0.3, carbs: 0.4, fat: 0.3 },
    'high-protein': { protein: 0.4, carbs: 0.35, fat: 0.25 },
    'low-carb': { protein: 0.35, carbs: 0.25, fat: 0.4 }
  };
  
  const ratios = presets[preset as keyof typeof presets] || presets.balanced;
  
  return {
    protein: {
      calories: Math.round(calories * ratios.protein),
      grams: Math.round((calories * ratios.protein) / 4)
    },
    carbs: {
      calories: Math.round(calories * ratios.carbs),
      grams: Math.round((calories * ratios.carbs) / 4)
    },
    fat: {
      calories: Math.round(calories * ratios.fat),
      grams: Math.round((calories * ratios.fat) / 9)
    }
  };
}