import React, { useState } from 'react';
import { Package, TrendingUp, DollarSign, Plus, Edit, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockMeals, mockOrders, Meal } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const ChefDashboard: React.FC = () => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState<Meal[]>(mockMeals.slice(0, 4));
  const [isAddingMeal, setIsAddingMeal] = useState(false);

  const activeOrders = mockOrders;
  const todayOrders = 12;
  const weeklyRevenue = 24580;
  const totalOrders = 450;
  const avgRating = 4.8;

  const statusColors = {
    'preparing': 'bg-blue-100 text-blue-700',
    'ready': 'bg-yellow-100 text-yellow-700',
    'out-for-delivery': 'bg-purple-100 text-purple-700',
    'delivered': 'bg-green-100 text-green-700',
    'cancelled': 'bg-red-100 text-red-700'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            Welcome back, Chef {user?.name} 👨‍🍳
          </h1>
          <p className="text-gray-600">Here's what's happening with your kitchen today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Today's Orders</div>
              <Package className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">{todayOrders}</div>
            <div className="text-sm text-green-600">+3 from yesterday</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Weekly Revenue</div>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">₹{weeklyRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-600">+12% this week</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Orders</div>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl text-gray-900 mb-1">{totalOrders}</div>
            <div className="text-sm text-gray-600">All time</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Average Rating</div>
              <div className="text-orange-500">⭐</div>
            </div>
            <div className="text-3xl text-gray-900 mb-1">{avgRating}</div>
            <div className="text-sm text-gray-600">From 230 reviews</div>
          </Card>
        </div>

        {/* Active Orders */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Active Orders</h2>
            <Badge variant="secondary">{activeOrders.length} orders</Badge>
          </div>

          <div className="space-y-4">
            {activeOrders.map(order => {
              const meal = mockMeals.find(m => m.id === order.mealId);
              return (
                <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <ImageWithFallback
                    src={meal?.image || ''}
                    alt={meal?.name || ''}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{meal?.name}</h3>
                    <p className="text-sm text-gray-600">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.scheduledFor).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge className={statusColors[order.status]}>
                    {order.status.replace('-', ' ')}
                  </Badge>
                  <div className="text-right">
                    <div className="text-gray-900 mb-1">₹{order.totalAmount}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Menu Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Your Menu</h2>
            <Dialog open={isAddingMeal} onOpenChange={setIsAddingMeal}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Dish
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Dish</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dishName">Dish Name</Label>
                      <Input id="dishName" placeholder="e.g., Quinoa Power Bowl" />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input id="price" type="number" placeholder="180" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your dish..." />
                  </div>

                  <div>
                    <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
                    <Input id="ingredients" placeholder="Quinoa, Chickpeas, Broccoli..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mealType">Meal Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input id="image" placeholder="https://..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input id="calories" type="number" placeholder="420" />
                    </div>
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input id="protein" type="number" placeholder="18" />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input id="carbs" type="number" placeholder="52" />
                    </div>
                    <div>
                      <Label htmlFor="fats">Fats (g)</Label>
                      <Input id="fats" type="number" placeholder="14" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Add Dish
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsAddingMeal(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {menuItems.map(meal => (
              <Card key={meal.id} className="p-4">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={meal.image}
                    alt={meal.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{meal.name}</h3>
                        <Badge variant="outline" className="capitalize">
                          {meal.type}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{meal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-green-600">₹{meal.price}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-orange-500">⭐</span>
                          <span>{meal.rating}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">{meal.nutrition.calories} cal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Order History */}
        <div className="mt-8">
          <h2 className="text-gray-900 mb-6">Recent Activity</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {[
                { time: '2 hours ago', action: 'Order delivered', customer: 'Sruthi K.', amount: 240 },
                { time: '5 hours ago', action: 'Order delivered', customer: 'Rahul M.', amount: 180 },
                { time: 'Yesterday', action: 'New review (5★)', customer: 'Priya S.', amount: null },
                { time: '2 days ago', action: 'Order delivered', customer: 'Amit P.', amount: 320 }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && <div className="text-gray-900">₹{activity.amount}</div>}
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
