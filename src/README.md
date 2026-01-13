# ZYNK - The Flexible Daily Food Subscription Platform

A modern, responsive web application connecting customers with home chefs for healthy, homemade meals.

## 🚀 Features

### For Customers
- 📱 **Personalized Dashboard** - See today's meals, nutrition tracking, and health tips
- 🍽️ **Flexible Meal Planning** - Customize, reschedule, or skip meals anytime
- 👨‍🍳 **Chef Network** - Browse verified home chefs with ratings and reviews
- 📊 **Nutrition Insights** - Track calories, macros, and weekly nutrition goals
- 🚚 **Real-time Tracking** - Live order status and delivery updates
- 💳 **Multiple Payment Options** - UPI, Wallets, and Cards supported
- 🎯 **Subscription Plans** - Flexible plans from pay-per-meal to monthly subscriptions

### For Chefs
- 📦 **Order Management** - Track active orders and delivery status
- 📋 **Menu Management** - Add, edit, and manage your dishes with nutrition info
- 💰 **Revenue Dashboard** - Track daily orders and weekly earnings
- ⭐ **Ratings & Reviews** - Build your reputation with customer feedback

## 🎨 Design Highlights

- **Clean & Modern UI** - Food-themed interface with rounded cards
- **Mobile-First** - Fully responsive across all devices
- **Health-Focused** - Prominent nutrition information display
- **Easy Scheduling** - Visible reschedule buttons throughout
- **Trust Signals** - Chef ratings, reviews, and verified badges

## 📦 Tech Stack

- **React** + TypeScript
- **Tailwind CSS** v4.0
- **shadcn/ui** components
- **Lucide React** icons
- **Context API** for state management

## 🗂️ Project Structure

```
/
├── App.tsx                    # Main app with routing
├── pages/                     # 10 main pages
│   ├── LandingPage.tsx
│   ├── Auth.tsx
│   ├── CustomerDashboard.tsx
│   ├── ChefDashboard.tsx
│   ├── MealCustomization.tsx
│   ├── SubscriptionPlans.tsx
│   ├── ChefNetwork.tsx
│   ├── OrderTracking.tsx
│   ├── Payment.tsx
│   └── Profile.tsx
├── components/                # Reusable components
│   ├── Navigation.tsx
│   ├── MealCard.tsx
│   ├── ChefCard.tsx
│   ├── NutritionMeter.tsx
│   ├── OrderTimeline.tsx
│   └── ui/                   # shadcn components
├── context/
│   └── AuthContext.tsx       # Authentication
├── data/
│   └── mockData.ts          # Mock data
└── styles/
    └── globals.css          # Global styles
```

## 🎯 User Flows

### Customer Journey
1. **Sign Up** → Choose "Customer" role
2. **Select Plan** → Choose subscription or pay-as-you-go
3. **Browse Meals** → View meals by breakfast/lunch/dinner
4. **Customize** → Select meal, schedule delivery, add instructions
5. **Pay** → UPI/Wallet/Card payment
6. **Track** → Real-time order status
7. **Manage** → Reschedule, skip, or change address anytime

### Chef Journey
1. **Sign Up** → Choose "Chef" role
2. **Setup Menu** → Add dishes with nutrition info
3. **Receive Orders** → View and manage daily orders
4. **Update Status** → Mark preparing → ready → delivered
5. **Track Revenue** → View earnings and order history

## 🎨 Color Palette

- **Primary Green** `#10b981` - Health, freshness
- **Orange** `#f97316` - Energy, warmth
- **Gray Scale** - Clean, professional backgrounds
- **White** - Clean, minimal base

## 📊 Mock Data Included

- **8 Healthy Meals** - Breakfast, lunch, dinner options
- **4 Verified Chefs** - Different cuisines and specialties
- **Subscription Plans** - 4 flexible options
- **Complete Nutrition Info** - Calories, protein, carbs, fats
- **Sample Orders** - Active order tracking examples

## 🔐 Authentication

- Email/Password login
- Role selection (Customer/Chef)
- Google OAuth ready (UI implemented)
- Phone number authentication ready (UI implemented)

## 💡 Key Highlights

✅ **Fully Responsive** - Works on mobile, tablet, desktop  
✅ **Complete User Flows** - From signup to order delivery  
✅ **Role-Based UI** - Different dashboards for customers and chefs  
✅ **Nutrition-First** - Detailed nutrition info on every meal  
✅ **Flexible Scheduling** - Reschedule buttons prominently placed  
✅ **Payment Ready** - Multiple payment method UIs  
✅ **Live Tracking** - Order status timeline visualization  
✅ **Chef Ratings** - Star ratings throughout the app  

## 🚀 Getting Started

1. The app starts on the landing page
2. Click "Get Started" or "Login"
3. Sign up as either Customer or Chef
4. Explore the role-specific dashboard

### Test Credentials (Mock)
- **Customer**: Any email/password with "Customer" role selected
- **Chef**: Any email/password with "Chef" role selected

## 📱 Pages Overview

1. **Landing Page** - Marketing page with features and CTA
2. **Auth** - Login/Signup with role selection
3. **Customer Dashboard** - Today's meal, quick actions, nutrition tracking
4. **Chef Dashboard** - Active orders, menu management, revenue stats
5. **Meal Customization** - Browse meals, select, schedule, customize
6. **Subscription Plans** - Compare plans, select subscription
7. **Chef Network** - Browse and filter home chefs
8. **Order Tracking** - Real-time order status with timeline
9. **Payment** - UPI, Wallet, Card payment options
10. **Profile** - User settings, preferences, addresses

## 🎯 Next Steps (Backend Integration)

Ready to integrate with:
- Supabase for authentication and database
- Google Maps API for delivery tracking
- Payment gateway (Razorpay, Stripe)
- Real-time notifications
- Image upload for chefs

---

Built with ❤️ for healthy eating and supporting home chefs
