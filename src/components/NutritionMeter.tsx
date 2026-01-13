import React from 'react';
import { NutritionInfo } from '../data/mockData';
import { Progress } from './ui/progress';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';

interface NutritionMeterProps {
  nutrition: NutritionInfo;
  showDetailed?: boolean;
}

export const NutritionMeter: React.FC<NutritionMeterProps> = ({ nutrition, showDetailed = true }) => {
  const totalMacros = nutrition.protein + nutrition.carbs + nutrition.fats;
  const proteinPercent = (nutrition.protein / totalMacros) * 100;
  const carbsPercent = (nutrition.carbs / totalMacros) * 100;
  const fatsPercent = (nutrition.fats / totalMacros) * 100;

  if (!showDetailed) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Flame className="w-4 h-4 text-orange-500" />
        <span className="text-gray-600">{nutrition.calories} cal</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">P: {nutrition.protein}g</span>
        <span className="text-gray-600">C: {nutrition.carbs}g</span>
        <span className="text-gray-600">F: {nutrition.fats}g</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900">Nutrition Breakdown</h3>
        <div className="flex items-center gap-2 text-orange-600">
          <Flame className="w-5 h-5" />
          <span>{nutrition.calories} cal</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Protein */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Beef className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-700">Protein</span>
            </div>
            <span className="text-sm text-gray-600">{nutrition.protein}g ({proteinPercent.toFixed(0)}%)</span>
          </div>
          <Progress value={proteinPercent} className="h-2 [&>div]:bg-red-500" />
        </div>

        {/* Carbs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wheat className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-700">Carbs</span>
            </div>
            <span className="text-sm text-gray-600">{nutrition.carbs}g ({carbsPercent.toFixed(0)}%)</span>
          </div>
          <Progress value={carbsPercent} className="h-2 [&>div]:bg-yellow-500" />
        </div>

        {/* Fats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">Fats</span>
            </div>
            <span className="text-sm text-gray-600">{nutrition.fats}g ({fatsPercent.toFixed(0)}%)</span>
          </div>
          <Progress value={fatsPercent} className="h-2 [&>div]:bg-blue-500" />
        </div>
      </div>
    </div>
  );
};
