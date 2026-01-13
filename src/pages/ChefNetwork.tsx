import React, { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ChefCard } from '../components/ChefCard';
import { mockChefs } from '../data/mockData';

interface ChefNetworkProps {
  onNavigate: (page: string) => void;
}

export const ChefNetwork: React.FC<ChefNetworkProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const allCuisines = Array.from(
    new Set(mockChefs.flatMap(chef => chef.cuisine))
  );

  const filteredChefs = mockChefs
    .filter(chef => {
      const matchesSearch = 
        chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chef.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        chef.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCuisine = 
        cuisineFilter === 'all' || chef.cuisine.includes(cuisineFilter);
      
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'orders') return b.totalOrders - a.totalOrders;
      if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Our Chef Network</h1>
          <p className="text-gray-600">
            Connect with talented home chefs in your area
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl text-green-600 mb-1">{mockChefs.length}</div>
            <div className="text-sm text-gray-600">Verified Chefs</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl text-orange-600 mb-1">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl text-blue-600 mb-1">2000+</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl text-purple-600 mb-1">12</div>
            <div className="text-sm text-gray-600">Cuisine Types</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by chef name, cuisine, or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Cuisine Filter */}
            <div>
              <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cuisines" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  {allCuisines.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="orders">Most Orders</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredChefs.length} {filteredChefs.length === 1 ? 'chef' : 'chefs'}
          </p>
        </div>

        {/* Chefs Grid */}
        {filteredChefs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChefs.map(chef => (
              <ChefCard
                key={chef.id}
                chef={chef}
                onSelect={(chef) => {
                  console.log('Selected chef:', chef);
                  onNavigate('meal-customization');
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No chefs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setCuisineFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Become a Chef CTA */}
        <div className="mt-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-white mb-4">Are you a home chef?</h2>
          <p className="text-orange-50 mb-6 max-w-2xl mx-auto">
            Join our network and share your passion for cooking with hundreds of food lovers. 
            Earn money doing what you love, on your own schedule.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-orange-600 hover:bg-orange-50"
          >
            Join as a Chef
          </Button>
        </div>
      </div>
    </div>
  );
};
