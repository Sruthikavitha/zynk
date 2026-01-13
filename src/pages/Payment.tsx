import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { mockMeals } from '../data/mockData';

interface PaymentProps {
  onNavigate: (page: string) => void;
}

export const Payment: React.FC<PaymentProps> = ({ onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const orderItem = mockMeals[5]; // Example meal
  const deliveryFee = 0;
  const discount = 0;
  const total = orderItem.price + deliveryFee - discount;

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    setPaymentSuccess(true);
    
    // Redirect to order tracking after success
    setTimeout(() => {
      onNavigate('order-tracking');
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been confirmed and will be prepared shortly.
          </p>
          <div className="text-sm text-gray-500 mb-6">
            Redirecting to order tracking...
          </div>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onNavigate('order-tracking')}
          >
            Track Your Order
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('meal-customization')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Meal Selection
          </Button>
          <h1 className="text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Secure and fast payment processing</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-gray-900 mb-6">Select Payment Method</h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* UPI */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-gray-900">UPI</div>
                          <div className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</div>
                        </div>
                      </Label>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pl-10">
                        <Label htmlFor="upiId" className="text-sm">UPI ID</Label>
                        <Input
                          id="upiId"
                          placeholder="yourname@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="mt-1"
                        />
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Google_Pay_%28GPay%29_Logo_%282020%29.svg" alt="GPay" className="h-4" />
                          </Button>
                          <Button variant="outline" size="sm">PhonePe</Button>
                          <Button variant="outline" size="sm">Paytm</Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Wallet */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'wallet' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="text-gray-900">Digital Wallets</div>
                          <div className="text-sm text-gray-600">Paytm, Amazon Pay, MobiKwik</div>
                        </div>
                      </Label>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-gray-900">Credit / Debit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                        </div>
                      </Label>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pl-10 space-y-3">
                        <div>
                          <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="expiry" className="text-sm">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="text-sm">CVV</Label>
                            <Input id="cvv" placeholder="123" type="password" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Credits */}
                  <div className="border-2 border-gray-200 rounded-lg p-4 opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-gray-900">Meal Credits</div>
                        <div className="text-sm text-gray-600">45 credits available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm text-green-800">
                    Your payment information is encrypted and secure. We never store your card details.
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <img
                    src={orderItem.image}
                    alt={orderItem.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900 mb-1">{orderItem.name}</h4>
                    <p className="text-sm text-gray-600">
                      {orderItem.nutrition.calories} cal
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meal Price</span>
                  <span className="text-gray-900">₹{orderItem.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-green-600">Free</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-₹{discount}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg mb-6">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-gray-900">₹{total}</span>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handlePayment}
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay ₹${total}`}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
