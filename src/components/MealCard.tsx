import React from 'react';
import { Star, Clock, Flame } from 'lucide-react';
import { Meal, mockChefs } from '../data/mockData';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MealCardProps {
  meal: Meal;
  onSelect?: (meal: Meal) => void;
  showChef?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onSelect, showChef = true }) => {
  const chef = mockChefs.find(c => c.id === meal.chefId);

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect?.(meal)}
    >
      <div className="relative h-48">
        <ImageWithFallback
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span className="text-sm">{meal.rating}</span>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className="bg-green-500 text-white capitalize">
            {meal.type}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-gray-900 mb-1">{meal.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meal.description}</p>

        {showChef && chef && (
          <div className="flex items-center gap-2 mb-3">
            <ImageWithFallback
              src={chef.photo}
              alt={chef.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">by {chef.name}</span>
          </div>
        )}

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{meal.nutrition.calories} cal</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>30 min</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {meal.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-green-600">₹{meal.price}</span>
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
            <div>
              <div className="text-gray-400">P</div>
              <div>{meal.nutrition.protein}g</div>
            </div>
            <div>
              <div className="text-gray-400">C</div>
              <div>{meal.nutrition.carbs}g</div>
            </div>
            <div>
              <div className="text-gray-400">F</div>
              <div>{meal.nutrition.fats}g</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
