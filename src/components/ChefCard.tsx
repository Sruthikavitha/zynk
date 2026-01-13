import React from 'react';
import { Star, MapPin, Package } from 'lucide-react';
import { Chef } from '../data/mockData';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChefCardProps {
  chef: Chef;
  onSelect?: (chef: Chef) => void;
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onSelect }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <ImageWithFallback
            src={chef.photo}
            alt={chef.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{chef.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              <span className="text-sm">{chef.rating}</span>
              <span className="text-sm text-gray-500">({chef.totalOrders} orders)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{chef.distance}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">{chef.bio}</p>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">Cuisine</div>
          <div className="flex flex-wrap gap-2">
            {chef.cuisine.map(c => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-2">Specialties</div>
          <div className="flex flex-wrap gap-2">
            {chef.specialties.slice(0, 3).map(s => (
              <Badge key={s} className="bg-green-50 text-green-700 border-green-200">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Package className="w-4 h-4" />
          <span>Delivers to: {chef.deliveryArea}</span>
        </div>

        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => onSelect?.(chef)}
        >
          Order from this Chef
        </Button>
      </div>
    </Card>
  );
};
