import React, { useState } from 'react';
import { Calendar, Clock, MapPin, MessageSquare, Star, Flame } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MealCard } from '../components/MealCard';
import { NutritionMeter } from '../components/NutritionMeter';
import { mockMeals, Meal, mockChefs } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface MealCustomizationProps {
  onNavigate: (page: string) => void;
}

export const MealCustomization: React.FC<MealCustomizationProps> = ({ onNavigate }) => {
  const [selectedMeal, setSelectedMeal] = useState<Meal>(mockMeals[5]);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');
  const [selectedDate, setSelectedDate] = useState('2025-10-15');
  const [selectedTime, setSelectedTime] = useState('13:00');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Green Valley Apartments, Koramangala, Bangalore');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const filteredMeals = mockMeals.filter(meal => meal.type === mealType);
  const chef = mockChefs.find(c => c.id === selectedMeal.chefId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Customize Your Meal</h1>
          <p className="text-gray-600">Choose healthy meals and set your preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Meal Selection */}
          <div className="lg:col-span-2">
            {/* Meal Type Tabs */}
            <Tabs value={mealType} onValueChange={(value) => setMealType(value as any)} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                <TabsTrigger value="lunch">Lunch</TabsTrigger>
                <TabsTrigger value="dinner">Dinner</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Available Meals */}
            <div className="mb-8">
              <h2 className="text-gray-900 mb-4">Available {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Options</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMeals.map(meal => (
                  <div
                    key={meal.id}
                    className={`cursor-pointer transition-all ${
                      selectedMeal.id === meal.id ? 'ring-2 ring-green-500 rounded-lg' : ''
                    }`}
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <MealCard meal={meal} showChef={true} />
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Meal Details */}
            {selectedMeal && (
              <Card className="p-6">
                <h2 className="text-gray-900 mb-4">Selected Meal Details</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <ImageWithFallback
                      src={selectedMeal.image}
                      alt={selectedMeal.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-gray-900 mb-2">{selectedMeal.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                          <span className="text-sm">{selectedMeal.rating}</span>
                        </div>
                      </div>
                      <div className="text-2xl text-green-600">₹{selectedMeal.price}</div>
                    </div>
                    <p className="text-gray-600 mb-4">{selectedMeal.description}</p>
                    
                    {chef && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                        <ImageWithFallback
                          src={chef.photo}
                          alt={chef.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm text-gray-900">Chef {chef.name}</div>
                          <div className="text-sm text-gray-600">{chef.cuisine.join(', ')}</div>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Ingredients</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMeal.ingredients.map(ingredient => (
                          <Badge key={ingredient} variant="secondary">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">Tags</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedMeal.tags.map(tag => (
                          <Badge key={tag} className="bg-green-100 text-green-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <NutritionMeter nutrition={selectedMeal.nutrition} />
              </Card>
            )}
          </div>

          {/* Right Column - Scheduling & Customization */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="text-gray-900 mb-6">Delivery Details</h3>

              {/* Schedule Date */}
              <div className="mb-4">
                <Label className="mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Delivery Date
                </Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-10-14">Today (Oct 14)</SelectItem>
                    <SelectItem value="2025-10-15">Tomorrow (Oct 15)</SelectItem>
                    <SelectItem value="2025-10-16">Oct 16</SelectItem>
                    <SelectItem value="2025-10-17">Oct 17</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Schedule Time */}
              <div className="mb-4">
                <Label className="mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Delivery Time
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="08:30">8:30 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="12:30">12:30 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="13:30">1:30 PM</SelectItem>
                    <SelectItem value="19:00">7:00 PM</SelectItem>
                    <SelectItem value="19:30">7:30 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Delivery Address */}
              <div className="mb-4">
                <Label className="mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </Label>
                <Select value={deliveryAddress} onValueChange={setDeliveryAddress}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="123 Green Valley Apartments, Koramangala, Bangalore">
                      Green Valley Apartments, Koramangala
                    </SelectItem>
                    <SelectItem value="456 Tech Park Road, Whitefield, Bangalore">
                      Tech Park Road, Whitefield
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <Label className="mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Special Instructions (Optional)
                </Label>
                <Textarea
                  placeholder="e.g., Less spicy, Add salad, Extra vegetables..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Meal Price</span>
                  <span className="text-gray-900">₹{selectedMeal.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg border-t pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{selectedMeal.price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => onNavigate('payment')}
                >
                  Confirm Order
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Reschedule Meal
                </Button>
                <Button variant="outline" className="w-full">
                  Swap Meal
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
