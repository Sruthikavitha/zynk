import React, { useState } from 'react';
import { Check, Zap, Crown, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockSubscriptionPlans } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface SubscriptionPlansProps {
  onNavigate: (page: string) => void;
}

export const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(user?.subscriptionPlanId || '');

  const planIcons = {
    'plan-1': CreditCard,
    'plan-2': Zap,
    'plan-3': Crown,
    'plan-4': CreditCard
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible subscription plans for your healthy lifestyle. Cancel or change anytime.
          </p>
        </div>

        {/* Current Plan Info */}
        {user?.subscriptionPlanId && (
          <Card className="max-w-2xl mx-auto p-6 mb-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-100 mb-1">Current Plan</div>
                <h2 className="text-white mb-2">
                  {mockSubscriptionPlans.find(p => p.id === user.subscriptionPlanId)?.name}
                </h2>
                <div className="text-green-100">
                  {user.credits} meal credits remaining
                </div>
              </div>
              <div className="text-right">
                <Button variant="secondary" onClick={() => onNavigate('customer-dashboard')}>
                  View Dashboard
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockSubscriptionPlans.map(plan => {
            const Icon = planIcons[plan.id as keyof typeof planIcons];
            const isCurrentPlan = plan.id === user?.subscriptionPlanId;
            
            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-orange-500' : ''
                } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-sm rounded-bl-lg">
                    Current Plan
                  </div>
                )}

                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-gray-600 text-sm mb-4">{plan.duration}</div>

                  {plan.price > 0 ? (
                    <div className="mb-6">
                      <div className="text-4xl text-gray-900 mb-1">
                        ₹{plan.price}
                      </div>
                      <div className="text-sm text-gray-600">
                        ≈ ₹{Math.round(plan.price / (plan.mealsPerWeek * 4))} per meal
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <div className="text-4xl text-gray-900 mb-1">
                        Pay per meal
                      </div>
                      <div className="text-sm text-gray-600">
                        No commitment
                      </div>
                    </div>
                  )}

                  <ul className="space-y-3 mb-6">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : isCurrentPlan
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    disabled={isCurrentPlan}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      onNavigate('payment');
                    }}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription anytime. Your credits will remain valid for 30 days after cancellation.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">What are meal credits?</h3>
              <p className="text-gray-600">
                Meal credits are like tokens you can use to order any meal from our chef network. One credit = one meal, regardless of the meal type.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Can I skip or reschedule meals?</h3>
              <p className="text-gray-600">
                Absolutely! You have complete flexibility to skip, reschedule, or customize your meals at any time through your dashboard.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-gray-900 mb-2">Do unused credits roll over?</h3>
              <p className="text-gray-600">
                Yes, unused credits roll over to the next billing cycle as long as your subscription is active.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
