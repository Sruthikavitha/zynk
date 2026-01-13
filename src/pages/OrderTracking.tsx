import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Package, MessageCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { OrderTimeline } from '../components/OrderTimeline';
import { mockOrders, mockMeals, mockChefs } from '../data/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const OrderTracking: React.FC = () => {
  const [estimatedTime, setEstimatedTime] = useState(25);
  
  const order = mockOrders[0];
  const meal = mockMeals.find(m => m.id === order.mealId);
  const chef = mockChefs.find(c => c.id === order.chefId);

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Order #{order.id}</p>
        </div>

        {/* ETA Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-green-100 mb-1">Estimated Arrival</div>
              <div className="text-3xl text-white">{estimatedTime} mins</div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8" />
            </div>
          </div>
          <Progress value={65} className="h-2 bg-white/20 [&>div]:bg-white" />
          <div className="text-green-100 mt-2">Your meal is being prepared with care</div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <OrderTimeline status={order.status} />

            {/* Live Map Placeholder */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Delivery Route</h3>
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <div className="text-gray-600">Live tracking map</div>
                  <div className="text-sm text-gray-500">Google Maps integration would go here</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-900 mb-1">Delivery Address</div>
                    <div className="text-sm text-gray-600">{order.deliveryAddress}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <Card className="p-6">
                <h3 className="text-gray-900 mb-3">Special Instructions</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">{order.specialInstructions}</p>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Order Details */}
          <div className="space-y-6">
            {/* Meal Details */}
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Your Order</h3>
              {meal && (
                <div className="space-y-4">
                  <ImageWithFallback
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-gray-900 mb-2">{meal.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Meal Price</span>
                      <span className="text-gray-900">₹{meal.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Chef Contact */}
            {chef && (
              <Card className="p-6">
                <h3 className="text-gray-900 mb-4">Your Chef</h3>
                <div className="flex items-center gap-3 mb-4">
                  <ImageWithFallback
                    src={chef.photo}
                    alt={chef.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900">{chef.name}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-orange-500">⭐</span>
                      <span>{chef.rating}</span>
                      <span className="text-gray-500">({chef.totalOrders} orders)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Chef
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Chef
                  </Button>
                </div>
              </Card>
            )}

            {/* Help */}
            <Card className="p-6 bg-gray-50">
              <h3 className="text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Having issues with your order? Our support team is here to help.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
