import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, Lock, CreditCard, Heart, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const isChef = user?.role === 'chef';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <ImageWithFallback
                src={user?.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'}
                alt={user?.name || 'User'}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700">
                <User className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600 mb-3">{user?.email}</p>
              <div className="flex gap-2">
                <Badge className={isChef ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}>
                  {isChef ? 'Chef' : 'Customer'}
                </Badge>
                {!isChef && user?.subscriptionPlanId && (
                  <Badge variant="secondary">Premium Member</Badge>
                )}
              </div>
            </div>
            {!isChef && (
              <div className="text-right">
                <div className="text-3xl text-green-600 mb-1">{user?.credits || 0}</div>
                <div className="text-sm text-gray-600">Meal Credits</div>
                <Button 
                  size="sm" 
                  className="mt-2"
                  onClick={() => onNavigate('subscription')}
                >
                  Add Credits
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="personal">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Personal Information</h3>
                <Button
                  variant="outline"
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!editing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!editing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!editing}
                      className="pl-10"
                    />
                  </div>
                </div>

                {isChef && (
                  <div>
                    <Label htmlFor="cuisine">Cuisine Specialty</Label>
                    <Input
                      id="cuisine"
                      value="North Indian, Healthy Bowls"
                      disabled={!editing}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              {isChef && (
                <div className="mt-6">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value="Passionate about creating nutritious, home-cooked meals with fresh ingredients."
                    disabled={!editing}
                    className="mt-1"
                  />
                </div>
              )}

              {editing && (
                <div className="mt-6 flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-900">Saved Addresses</h3>
                <Button>Add New Address</Button>
              </div>

              <div className="space-y-4">
                {(user?.addresses || []).map((address, index) => (
                  <div key={index} className="p-4 border rounded-lg flex items-start justify-between">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-gray-900 mb-1">{index === 0 ? 'Home' : 'Work'}</div>
                        <div className="text-sm text-gray-600">{address}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              {!isChef && (
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-6">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Low Carb', 'High Protein', 'Keto', 'Paleo'].map(pref => (
                      <Badge
                        key={pref}
                        className={
                          user?.dietaryPreferences?.includes(pref)
                            ? 'bg-green-500 text-white cursor-pointer'
                            : 'bg-gray-200 text-gray-700 cursor-pointer'
                        }
                      >
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              <Card className="p-6">
                <h3 className="text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-gray-900">Order Updates</div>
                        <div className="text-sm text-gray-600">Get notified about your order status</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-gray-900">Email Notifications</div>
                        <div className="text-sm text-gray-600">Receive emails about new chefs and offers</div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-gray-900">SMS Notifications</div>
                        <div className="text-sm text-gray-600">Get text messages for delivery updates</div>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Change Password</div>
                      <div className="text-sm text-gray-600">Update your password</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Payment Methods</div>
                      <div className="text-sm text-gray-600">Manage saved payment methods</div>
                    </div>
                  </button>
                  {!isChef && (
                    <button 
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => onNavigate('subscription')}
                    >
                      <Award className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <div className="text-gray-900">Subscription Plan</div>
                        <div className="text-sm text-gray-600">View or change your plan</div>
                      </div>
                    </button>
                  )}
                </div>
              </Card>

              <Card className="p-6 border-red-200">
                <h3 className="text-red-600 mb-4">Danger Zone</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                    Deactivate Account
                  </Button>
                  <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
