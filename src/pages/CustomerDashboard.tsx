import React from 'react';
import { Utensils, Calendar, SkipForward, MapPin, Clock, TrendingUp, Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { MealCard } from '../components/MealCard';
import { ChefCard } from '../components/ChefCard';
import { NutritionMeter } from '../components/NutritionMeter';
import { mockMeals, mockChefs, healthTips, weeklyNutrition, mockOrders } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface CustomerDashboardProps {
  onNavigate: (page: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todaysMeal = mockMeals[5]; // Grilled Chicken Power Bowl
  const upcomingMeals = mockMeals.slice(0, 4);
  const topChefs = mockChefs.slice(0, 3);
  const activeOrder = mockOrders[0];

  const weekProgress = (weeklyNutrition.mealsConsumed / weeklyNutrition.goal) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            {getGreeting()}, {user?.name} 👋
          </h1>
          <p className="text-gray-600">
            You have {user?.credits || 0} meal credits remaining
          </p>
        </div>

        {/* Today's Meal Summary */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white mb-1">Today's Lunch</h2>
              <p className="text-green-50">Scheduled for 1:00 PM</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white mb-2">{todaysMeal.name}</h3>
              <p className="text-green-50 text-sm mb-4">{todaysMeal.description}</p>
              
              <div className="flex gap-4 text-sm">
                <div>
                  <div className="text-green-100">Calories</div>
                  <div className="text-white">{todaysMeal.nutrition.calories}</div>
                </div>
                <div>
                  <div className="text-green-100">Protein</div>
                  <div className="text-white">{todaysMeal.nutrition.protein}g</div>
                </div>
                <div>
                  <div className="text-green-100">Carbs</div>
                  <div className="text-white">{todaysMeal.nutrition.carbs}g</div>
                </div>
                <div>
                  <div className="text-green-100">Fats</div>
                  <div className="text-white">{todaysMeal.nutrition.fats}g</div>
                </div>
              </div>
            </div>

            <div>
              <ImageWithFallback
                src={todaysMeal.image}
                alt={todaysMeal.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              onClick={() => onNavigate('meal-customization')}
            >
              <Utensils className="w-4 h-4 mr-2" />
              Customize
            </Button>
            <Button
              variant="secondary"
              className="bg-orange-500 hover:bg-orange-600 text-white border-0"
              onClick={() => onNavigate('meal-customization')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Meal
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/20"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Change Address
            </Button>
          </div>
        </Card>

        {/* Active Order Status */}
        {activeOrder && (
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">Order in Progress</h3>
                <p className="text-sm text-gray-600">Preparing your meal...</p>
              </div>
              <Button onClick={() => onNavigate('order-tracking')}>
                Track Order
              </Button>
            </div>
            <Progress value={33} className="h-2" />
          </Card>
        )}

        {/* Weekly Nutrition Report */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-900">Your Weekly Nutrition</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-2xl text-gray-900 mb-1">{weeklyNutrition.avgCaloriesPerDay}</div>
              <div className="text-sm text-gray-600">Avg Calories/Day</div>
            </div>
            <div>
              <div className="text-2xl text-green-600 mb-1">{weeklyNutrition.totalProtein}g</div>
              <div className="text-sm text-gray-600">Total Protein</div>
            </div>
            <div>
              <div className="text-2xl text-orange-600 mb-1">{weeklyNutrition.mealsConsumed}/{weeklyNutrition.goal}</div>
              <div className="text-sm text-gray-600">Meals This Week</div>
            </div>
            <div>
              <div className="text-2xl text-blue-600 mb-1">{weekProgress.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Goal Progress</div>
            </div>
          </div>

          <div className="mb-2 text-sm text-gray-600">Weekly Progress</div>
          <Progress value={weekProgress} className="h-3" />
        </Card>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Meals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Upcoming Meals</h2>
              <Button variant="ghost" onClick={() => onNavigate('meal-customization')}>
                View All
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {upcomingMeals.map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onSelect={(meal) => {
                    console.log('Selected meal:', meal);
                    onNavigate('meal-customization');
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Health Tips */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-orange-500" />
                <h3 className="text-gray-900">Health Tips</h3>
              </div>
              
              <div className="space-y-4">
                {healthTips.map(tip => (
                  <Card key={tip.id} className="p-4">
                    <div className="flex gap-3">
                      <div className="text-2xl">{tip.icon}</div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Rated Home Chefs */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Top Rated Home Chefs</h2>
            <Button variant="ghost" onClick={() => onNavigate('chef-network')}>
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topChefs.map(chef => (
              <ChefCard
                key={chef.id}
                chef={chef}
                onSelect={(chef) => {
                  console.log('Selected chef:', chef);
                  onNavigate('chef-network');
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
