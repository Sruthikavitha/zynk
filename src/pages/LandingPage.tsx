import React from 'react';
import { ChefHat, Heart, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: ChefHat,
      title: 'Home Chefs',
      description: 'Connect with talented home chefs who prepare fresh, healthy meals daily'
    },
    {
      icon: Heart,
      title: 'Healthy & Homemade',
      description: 'Nutritious meals made with love and fresh ingredients, just like home'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Customize, reschedule, or skip meals anytime to fit your lifestyle'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'All chefs are verified and rated by our community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
            <span className="text-white text-4xl">Z</span>
          </div>
          <h1 className="text-gray-900 mb-6">
            ZYNK - Your Daily Healthy Food Subscription
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with home chefs and caterers for fresh, healthy, homemade meals delivered to your doorstep. 
            Perfect for students, professionals, and anyone seeking a healthier lifestyle.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onNavigate('auth')}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('auth')}
            >
              Login
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-center text-gray-900 mb-12">How ZYNK Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 text-2xl">
                1
              </div>
              <h3 className="text-gray-900 mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select a subscription plan that fits your needs or go pay-as-you-go
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 text-2xl">
                2
              </div>
              <h3 className="text-gray-900 mb-2">Pick Your Meals</h3>
              <p className="text-gray-600">
                Browse home chefs and their healthy meal options with full nutrition info
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 text-2xl">
                3
              </div>
              <h3 className="text-gray-900 mb-2">Enjoy & Track</h3>
              <p className="text-gray-600">
                Get fresh meals delivered, track in real-time, and manage your nutrition
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-gray-900 mb-4">Ready to Start Your Healthy Journey?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users enjoying homemade, healthy meals every day
          </p>
          <Button 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => onNavigate('auth')}
          >
            Sign Up Now
          </Button>
        </div>
      </div>
    </div>
  );
};
