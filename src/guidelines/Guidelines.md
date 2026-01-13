# ZYNK - Flexible Daily Food Subscription Platform

## Project Overview

ZYNK is a modern, responsive food subscription platform that connects customers with home chefs and caterers. The platform emphasizes healthy, homemade meals with flexible meal planning, real-time delivery tracking, and nutrition insights.

## Target Users
- Students
- Professionals
- Anyone seeking healthy, homemade food without cooking hassle

## Tech Stack
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Context API
- **Mock Data**: TypeScript interfaces

## Design System

### Color Palette
- **Primary (Green)**: #10b981 - Represents health and freshness
- **Secondary (Orange)**: #f97316 - Represents energy and warmth
- **Background**: White and subtle gray tones
- **Text**: Gray-900 for primary text, Gray-600 for secondary

### Typography
- Base font size: 16px
- Headings use medium weight (500)
- Body text uses normal weight (400)
- Line height: 1.5 for readability

### Design Principles
1. **Clean & Fresh**: Food-themed interface with rounded cards and soft shadows
2. **Mobile-First**: Responsive layout optimized for all screen sizes
3. **Nutrition-Focused**: Prominent display of calories, macros, and health information
4. **Flexible Scheduling**: Visible "Reschedule" buttons throughout the UI
5. **Trust & Transparency**: Chef ratings, reviews, and detailed meal information

## Project Structure

```
/
├── App.tsx                    # Main application with routing
├── components/
│   ├── Navigation.tsx         # Role-based navigation bar
│   ├── MealCard.tsx          # Meal display card with nutrition
│   ├── ChefCard.tsx          # Chef profile card
│   ├── NutritionMeter.tsx    # Nutrition breakdown visualization
│   ├── OrderTimeline.tsx     # Order status timeline
│   └── ui/                   # shadcn/ui components
├── pages/
│   ├── LandingPage.tsx       # Public landing page
│   ├── Auth.tsx              # Login/Signup with role selection
│   ├── CustomerDashboard.tsx # Customer home with meal summary
│   ├── ChefDashboard.tsx     # Chef home with orders & menu
│   ├── MealCustomization.tsx # Meal selection & scheduling
│   ├── SubscriptionPlans.tsx # Plan selection
│   ├── ChefNetwork.tsx       # Browse chefs
│   ├── OrderTracking.tsx     # Live order tracking
│   ├── Payment.tsx           # Payment processing
│   └── Profile.tsx           # User settings & preferences
├── context/
│   └── AuthContext.tsx       # Authentication state management
├── data/
│   └── mockData.ts           # Mock data for meals, chefs, orders
└── styles/
    └── globals.css           # Global styles & Tailwind config
```

## Key Features

### Customer Features
- Personalized dashboard with today's meal summary
- Quick actions: Customize, Reschedule, Skip, Change Address
- Upcoming meals with thumbnails
- Top-rated home chefs directory
- Weekly nutrition tracking & health tips
- Flexible meal customization
- Multiple subscription plans
- Real-time order tracking
- Multiple payment methods (UPI, Wallet, Card)

### Chef Features
- Active orders management
- Daily schedule & meal count
- Menu management (Add/Edit/Delete dishes)
- Nutrition information for each dish
- Order history & revenue tracking
- Customer ratings & reviews

## Component Guidelines

### MealCard
- Display meal image, name, description
- Show nutrition info (calories, protein, carbs, fats)
- Display chef info and rating
- Include tags for dietary preferences
- Show price prominently

### ChefCard
- Display chef photo, name, rating
- Show cuisine types and specialties
- Include delivery area and distance
- Display total orders completed
- "Order from this Chef" CTA button

### NutritionMeter
- Show total calories with flame icon
- Breakdown of protein, carbs, fats
- Visual progress bars with color coding:
  - Red for protein
  - Yellow for carbs
  - Blue for fats

### Navigation
- Role-based menu items (customer vs chef)
- Mobile-responsive hamburger menu
- Active page highlighting
- Logout functionality

## Mock Data Structure

### Meals
- 8 healthy meal options across breakfast, lunch, dinner
- Complete nutrition information
- Chef association
- Ingredients list
- Dietary tags (High Protein, Vegan, etc.)
- Ratings

### Chefs
- 4 verified home chefs
- Multiple cuisine specialties
- Ratings and total orders
- Delivery areas
- Bio and specialties

### Orders
- Order status workflow
- Delivery address
- Special instructions
- Scheduled delivery time

### Subscription Plans
- 4 plan options (Starter, Health Pro, Fitness Elite, Pay As You Go)
- Credits-based system
- Clear benefits list
- Pricing transparency

## Best Practices

1. **Images**: Use ImageWithFallback component for all images
2. **Navigation**: Always use onNavigate prop for page transitions
3. **Responsive Design**: Use Tailwind's responsive classes (md:, lg:)
4. **Icons**: Use Lucide React icons consistently
5. **Cards**: Use shadcn Card component for content sections
6. **Buttons**: Primary actions use green, secondary use orange
7. **Forms**: Include proper labels and validation feedback
8. **Loading States**: Show processing state for async actions
9. **Empty States**: Provide helpful empty state messages
10. **Accessibility**: Include proper ARIA labels and keyboard navigation

## Future Enhancements

- Integration with real backend API (Supabase, FastAPI)
- Google Maps integration for live tracking
- Real-time notifications
- Advanced filtering and search
- Payment gateway integration
- Chef application workflow
- Review and rating system
- Referral program
- Loyalty rewards
