import { Recipe, WeekPlan } from './types';

export function exportPlanToJSON(weekPlan: WeekPlan): string {
  const planData = {
    exportDate: new Date().toISOString(),
    weekPlan: weekPlan,
    totalRecipes: Object.values(weekPlan).reduce((total, day) => {
      return total + Object.values(day).filter(meal => meal.recipe).length;
    }, 0)
  };

  return JSON.stringify(planData, null, 2);
}

export function downloadJSON(data: string, filename: string) {
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

// TODO: Implement PDF export functionality
// This would require a PDF library like jsPDF or react-pdf
export function exportPlanToPDF(weekPlan: WeekPlan): Promise<void> {
  return new Promise((resolve, reject) => {
    // TODO: Implement PDF generation
    // For now, we'll just export as JSON
    try {
      const jsonData = exportPlanToJSON(weekPlan);
      downloadJSON(jsonData, `meal-plan-${new Date().toISOString().split('T')[0]}.json`);
      resolve();
    } catch (error) {
      reject(new Error('PDF export not yet implemented. JSON export provided instead.'));
    }
  });
}