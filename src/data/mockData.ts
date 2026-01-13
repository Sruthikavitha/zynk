// Mock data for ZYNK platform

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  nutrition: NutritionInfo;
  type: 'breakfast' | 'lunch' | 'dinner';
  chefId: string;
  price: number;
  rating: number;
  tags: string[];
  ingredients: string[];
}

export interface Chef {
  id: string;
  name: string;
  photo: string;
  cuisine: string[];
  rating: number;
  totalOrders: number;
  distance: string;
  deliveryArea: string;
  bio: string;
  specialties: string[];
}

export interface Order {
  id: string;
  mealId: string;
  customerId: string;
  chefId: string;
  scheduledFor: string;
  status: 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  specialInstructions?: string;
  totalAmount: number;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  mealsPerWeek: number;
  price: number;
  credits: number;
  benefits: string[];
  popular?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'chef';
  photo?: string;
  addresses?: string[];
  dietaryPreferences?: string[];
  subscriptionPlanId?: string;
  credits?: number;
}

// Mock Chefs
export const mockChefs: Chef[] = [
  {
    id: 'chef-1',
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    cuisine: ['North Indian', 'Healthy Bowls'],
    rating: 4.8,
    totalOrders: 450,
    distance: '2.5 km',
    deliveryArea: 'Indiranagar, Koramangala',
    bio: 'Passionate about creating nutritious, home-cooked meals with fresh ingredients.',
    specialties: ['Quinoa Bowls', 'Dal Tadka', 'Whole Wheat Roti']
  },
  {
    id: 'chef-2',
    name: 'Arjun Menon',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    cuisine: ['South Indian', 'Kerala Style'],
    rating: 4.9,
    totalOrders: 620,
    distance: '1.8 km',
    deliveryArea: 'HSR Layout, BTM',
    bio: 'Bringing authentic Kerala flavors with a healthy twist to your doorstep.',
    specialties: ['Avial', 'Brown Rice Dosa', 'Fish Curry']
  },
  {
    id: 'chef-3',
    name: 'Meera Patel',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    cuisine: ['Gujarati', 'Jain'],
    rating: 4.7,
    totalOrders: 380,
    distance: '3.2 km',
    deliveryArea: 'Whitefield, Marathahalli',
    bio: 'Specializing in sattvic, pure vegetarian meals for a balanced lifestyle.',
    specialties: ['Khichdi', 'Dhokla', 'Thepla']
  },
  {
    id: 'chef-4',
    name: 'Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    cuisine: ['Protein Bowls', 'Fitness Meals'],
    rating: 4.9,
    totalOrders: 550,
    distance: '2.0 km',
    deliveryArea: 'Bellandur, Sarjapur Road',
    bio: 'Former athlete, now cooking high-protein, low-carb meals for fitness enthusiasts.',
    specialties: ['Grilled Chicken Bowl', 'Egg White Omelette', 'Protein Smoothie Bowl']
  }
];

// Mock Meals
export const mockMeals: Meal[] = [
  {
    id: 'meal-1',
    name: 'Quinoa & Veggie Power Bowl',
    description: 'Protein-rich quinoa with roasted vegetables, chickpeas, and tahini dressing',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
    nutrition: { calories: 420, protein: 18, carbs: 52, fats: 14 },
    type: 'lunch',
    chefId: 'chef-1',
    price: 180,
    rating: 4.7,
    tags: ['High Protein', 'Vegan', 'Gluten-Free'],
    ingredients: ['Quinoa', 'Chickpeas', 'Broccoli', 'Bell Peppers', 'Tahini', 'Lemon']
  },
  {
    id: 'meal-2',
    name: 'Masala Oats with Vegetables',
    description: 'Savory oats cooked with fresh vegetables and Indian spices',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=600',
    nutrition: { calories: 280, protein: 12, carbs: 45, fats: 8 },
    type: 'breakfast',
    chefId: 'chef-1',
    price: 120,
    rating: 4.6,
    tags: ['High Fiber', 'Vegetarian', 'Low Fat'],
    ingredients: ['Oats', 'Carrots', 'Peas', 'Onions', 'Tomatoes', 'Turmeric', 'Cumin']
  },
  {
    id: 'meal-3',
    name: 'Brown Rice Dosa with Sambar',
    description: 'Crispy fermented brown rice dosa with protein-rich lentil sambar',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600',
    nutrition: { calories: 350, protein: 14, carbs: 58, fats: 9 },
    type: 'breakfast',
    chefId: 'chef-2',
    price: 140,
    rating: 4.9,
    tags: ['Fermented', 'Probiotic', 'South Indian'],
    ingredients: ['Brown Rice', 'Urad Dal', 'Toor Dal', 'Vegetables', 'Tamarind', 'Spices']
  },
  {
    id: 'meal-4',
    name: 'Kerala Fish Curry with Red Rice',
    description: 'Traditional fish curry with coconut milk, served with nutritious red rice',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600',
    nutrition: { calories: 480, protein: 35, carbs: 48, fats: 16 },
    type: 'lunch',
    chefId: 'chef-2',
    price: 220,
    rating: 4.8,
    tags: ['High Protein', 'Omega-3', 'Kerala Style'],
    ingredients: ['Fresh Fish', 'Coconut Milk', 'Curry Leaves', 'Red Rice', 'Turmeric', 'Kokum']
  },
  {
    id: 'meal-5',
    name: 'Moong Dal Khichdi with Ghee',
    description: 'Comforting one-pot meal with split mung beans and basmati rice',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600',
    nutrition: { calories: 320, protein: 16, carbs: 50, fats: 10 },
    type: 'dinner',
    chefId: 'chef-3',
    price: 150,
    rating: 4.7,
    tags: ['Easy Digest', 'Comfort Food', 'Ayurvedic'],
    ingredients: ['Moong Dal', 'Basmati Rice', 'Ghee', 'Cumin', 'Ginger', 'Turmeric']
  },
  {
    id: 'meal-6',
    name: 'Grilled Chicken Power Bowl',
    description: 'Lean grilled chicken breast with quinoa, greens, and avocado',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600',
    nutrition: { calories: 520, protein: 45, carbs: 38, fats: 18 },
    type: 'lunch',
    chefId: 'chef-4',
    price: 240,
    rating: 4.9,
    tags: ['High Protein', 'Low Carb', 'Fitness'],
    ingredients: ['Chicken Breast', 'Quinoa', 'Spinach', 'Avocado', 'Cherry Tomatoes', 'Lemon']
  },
  {
    id: 'meal-7',
    name: 'Egg White & Veggie Omelette',
    description: 'Fluffy egg white omelette loaded with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600',
    nutrition: { calories: 220, protein: 24, carbs: 12, fats: 8 },
    type: 'breakfast',
    chefId: 'chef-4',
    price: 140,
    rating: 4.6,
    tags: ['High Protein', 'Low Carb', 'Keto Friendly'],
    ingredients: ['Egg Whites', 'Bell Peppers', 'Mushrooms', 'Spinach', 'Onions', 'Herbs']
  },
  {
    id: 'meal-8',
    name: 'Whole Wheat Roti with Dal Tadka',
    description: 'Freshly made whole wheat rotis with creamy yellow lentil tadka',
    image: 'https://images.unsplash.com/photo-1585937421612-70e008356f9b?w=600',
    nutrition: { calories: 380, protein: 18, carbs: 62, fats: 10 },
    type: 'dinner',
    chefId: 'chef-1',
    price: 160,
    rating: 4.8,
    tags: ['High Fiber', 'Vegetarian', 'Traditional'],
    ingredients: ['Whole Wheat Flour', 'Toor Dal', 'Ghee', 'Cumin', 'Garlic', 'Tomatoes']
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    mealId: 'meal-6',
    customerId: 'user-1',
    chefId: 'chef-4',
    scheduledFor: '2025-10-14T13:00:00',
    status: 'preparing',
    deliveryAddress: '123 Green Valley Apartments, Koramangala, Bangalore',
    specialInstructions: 'Extra vegetables, less oil',
    totalAmount: 240,
    createdAt: '2025-10-14T10:30:00'
  },
  {
    id: 'order-2',
    mealId: 'meal-2',
    customerId: 'user-1',
    chefId: 'chef-1',
    scheduledFor: '2025-10-15T08:30:00',
    status: 'preparing',
    deliveryAddress: '123 Green Valley Apartments, Koramangala, Bangalore',
    totalAmount: 120,
    createdAt: '2025-10-14T09:00:00'
  }
];

// Mock Subscription Plans
export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-1',
    name: 'Starter',
    duration: '1 Week',
    mealsPerWeek: 7,
    price: 899,
    credits: 7,
    benefits: [
      '7 meals per week',
      'Choose any meal type',
      'Free delivery',
      'Basic nutrition tracking'
    ]
  },
  {
    id: 'plan-2',
    name: 'Health Pro',
    duration: '1 Month',
    mealsPerWeek: 14,
    price: 2999,
    credits: 60,
    benefits: [
      '14 meals per week',
      'Priority delivery',
      'Advanced nutrition insights',
      'Meal customization',
      'Save 20%'
    ],
    popular: true
  },
  {
    id: 'plan-3',
    name: 'Fitness Elite',
    duration: '3 Months',
    mealsPerWeek: 21,
    price: 7999,
    credits: 270,
    benefits: [
      '21 meals per week (all meals)',
      'Dedicated chef support',
      'Custom meal plans',
      'Weekly nutrition consultation',
      'Save 35%'
    ]
  },
  {
    id: 'plan-4',
    name: 'Pay As You Go',
    duration: 'Flexible',
    mealsPerWeek: 0,
    price: 0,
    credits: 0,
    benefits: [
      'No commitment',
      'Order individual meals',
      'Pay per meal',
      'Basic delivery'
    ]
  }
];

// Mock current user
export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Sruthi',
  email: 'sruthi@example.com',
  phone: '+91 98765 43210',
  role: 'customer',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  addresses: [
    '123 Green Valley Apartments, Koramangala, Bangalore',
    '456 Tech Park Road, Whitefield, Bangalore'
  ],
  dietaryPreferences: ['Vegetarian', 'Low Carb'],
  subscriptionPlanId: 'plan-2',
  credits: 45
};

// Health tips
export const healthTips = [
  {
    id: 'tip-1',
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily for better digestion and energy.',
    icon: '💧'
  },
  {
    id: 'tip-2',
    title: 'Protein Power',
    description: 'Include protein in every meal to maintain muscle mass and stay fuller longer.',
    icon: '💪'
  },
  {
    id: 'tip-3',
    title: 'Colorful Plate',
    description: 'Eat a variety of colorful vegetables to get diverse nutrients and antioxidants.',
    icon: '🥗'
  },
  {
    id: 'tip-4',
    title: 'Mindful Eating',
    description: 'Eat slowly and savor your food. It takes 20 minutes for your brain to register fullness.',
    icon: '🧘'
  }
];

// Weekly nutrition summary
export const weeklyNutrition = {
  totalCalories: 9800,
  avgCaloriesPerDay: 1400,
  totalProtein: 420,
  totalCarbs: 1260,
  totalFats: 280,
  mealsConsumed: 12,
  goal: 14
};
