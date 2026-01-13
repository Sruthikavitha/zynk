import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { LandingPage } from './pages/LandingPage';
import { Auth } from './pages/Auth';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { ChefDashboard } from './pages/ChefDashboard';
import { MealCustomization } from './pages/MealCustomization';
import { SubscriptionPlans } from './pages/SubscriptionPlans';
import { ChefNetwork } from './pages/ChefNetwork';
import { OrderTracking } from './pages/OrderTracking';
import { Payment } from './pages/Payment';
import { Profile } from './pages/Profile';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  // Redirect authenticated users to their dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'chef') {
        setCurrentPage('chef-dashboard');
      } else {
        setCurrentPage('customer-dashboard');
      }
    } else if (!isAuthenticated && currentPage !== 'landing' && currentPage !== 'auth') {
      setCurrentPage('landing');
    }
  }, [isAuthenticated, user]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render different pages based on current page
  const renderPage = () => {
    // Public pages
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'landing':
          return <LandingPage onNavigate={handleNavigate} />;
        case 'auth':
          return <Auth />;
        default:
          return <LandingPage onNavigate={handleNavigate} />;
      }
    }

    // Authenticated pages
    switch (currentPage) {
      case 'customer-dashboard':
        return <CustomerDashboard onNavigate={handleNavigate} />;
      case 'chef-dashboard':
        return <ChefDashboard />;
      case 'meal-customization':
        return <MealCustomization onNavigate={handleNavigate} />;
      case 'subscription':
        return <SubscriptionPlans onNavigate={handleNavigate} />;
      case 'chef-network':
        return <ChefNetwork onNavigate={handleNavigate} />;
      case 'order-tracking':
        return <OrderTracking />;
      case 'payment':
        return <Payment onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      default:
        if (user?.role === 'chef') {
          return <ChefDashboard />;
        }
        return <CustomerDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {isAuthenticated && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      {renderPage()}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
