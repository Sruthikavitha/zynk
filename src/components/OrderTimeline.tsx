import React from 'react';
import { ChefHat, CheckCircle, Truck, Package } from 'lucide-react';

interface OrderTimelineProps {
  status: 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  const steps = [
    { 
      id: 'preparing', 
      label: 'Preparing', 
      icon: ChefHat,
      description: 'Chef is cooking your meal'
    },
    { 
      id: 'ready', 
      label: 'Ready', 
      icon: Package,
      description: 'Meal is ready for pickup'
    },
    { 
      id: 'out-for-delivery', 
      label: 'Out for Delivery', 
      icon: Truck,
      description: 'On the way to you'
    },
    { 
      id: 'delivered', 
      label: 'Delivered', 
      icon: CheckCircle,
      description: 'Enjoy your meal!'
    }
  ];

  const statusIndex = steps.findIndex(s => s.id === status);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-gray-900 mb-6">Order Status</h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />
        
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= statusIndex;
          const isCurrent = index === statusIndex;
          
          return (
            <div key={step.id} className="relative flex gap-4 mb-8 last:mb-0">
              {/* Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                isActive 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-green-100' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-2">
                <div className={`mb-1 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.label}
                </div>
                <div className="text-sm text-gray-600">
                  {step.description}
                </div>
                {isCurrent && (
                  <div className="mt-2 text-sm text-green-600">
                    In Progress...
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
