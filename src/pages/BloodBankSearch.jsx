import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, MapPin, Filter, Droplets, Star, Clock, Phone, AlertTriangle, Bell, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { bloodBanks, bloodGroups, bloodComponents } from '@/data/bloodBanks';

const BloodBankSearch = () => {
  const [searchGroup, setSearchGroup] = useState('');
  const [location, setLocation] = useState('Delhi');
  const [filters, setFilters] = useState({ component: '', type: '' });
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: "🔍 Searching for blood...",
      description: `Finding ${searchGroup || 'any'} blood group in ${location}`,
    });
  };

  const handleBankClick = (bankId) => {
    navigate(`/blood-bank/${bankId}`);
  };

  const handleEmergencyRequest = () => {
    toast({
      title: "🚨 Emergency Request Sent",
      description: "Pinging nearby blood banks for urgent needs. You will be notified shortly.",
      variant: "destructive",
    });
  };

  const handleAlertSubscription = () => {
    toast({
      title: "🔔 Alert Subscription Set",
      description: `We will notify you when ${searchGroup} becomes available in ${location}.`,
    });
  };
  
  const getStockColor = (status) => {
    if (status === 'In Stock') return 'bg-green-100 text-green-700';
    if (status === 'Low Stock') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const filteredBanks = bloodBanks.filter(bank => {
    const matchesSearch = searchGroup ? bank.inventory[searchGroup] && bank.inventory[searchGroup].units > 0 : true;
    const matchesComponent = !filters.component || bank.componentsAvailable.includes(filters.component);
    const matchesType = !filters.type || bank.type === filters.type;
    return matchesSearch && matchesComponent && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Find Blood Banks - Real-Time Availability | Curo24</title>
        <meta name="description" content="Search for blood by group and location. Get real-time inventory from verified blood banks across India." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Find Blood Banks
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search for available blood units in real-time from verified blood banks near you.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 focus-within:border-orange-500 shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Droplets className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={searchGroup}
                  onChange={(e) => setSearchGroup(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent"
                >
                  <option value="">Any Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-600"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </Button>
                
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Component</label>
                  <select
                    value={filters.component}
                    onChange={(e) => setFilters(prev => ({...prev, component: e.target.value}))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">All Components</option>
                    {bloodComponents.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({...prev, type: e.target.value}))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">All Types</option>
                    <option value="Government">Government</option>
                    <option value="NGO">NGO</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="font-semibold text-red-800">Urgent Requirement?</h3>
                <p className="text-red-600 text-sm">Send an emergency request to all nearby blood banks.</p>
              </div>
            </div>
            <Button onClick={handleEmergencyRequest} className="bg-red-600 hover:bg-red-700 text-white">
              Emergency Request
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.map((bank, index) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleBankClick(bank.id)}
              className="cursor-pointer"
            >
              <Card className="h-full bg-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-800 text-lg">{bank.name}</h3>
                        {bank.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{bank.address}</p>
                    </div>
                    <Badge variant="outline">{bank.type}</Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {Object.entries(bank.inventory).map(([group, data]) => (
                      <div key={group} className={`p-2 rounded-md text-center ${getStockColor(data.status)}`}>
                        <p className="font-bold text-sm">{group}</p>
                        <p className="text-xs">{data.units} units</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{bank.rating} ({bank.reviews} reviews)</span>
                      </div>
                      <span>{bank.distance} km away</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Last updated: {bank.lastUpdate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>Contact</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredBanks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-orange-400 text-6xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching blood banks found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-blue-800">Get Notified</h3>
                  <p className="text-blue-600 text-sm">Set an alert to get notified when your required blood group becomes available.</p>
                </div>
              </div>
              <Button onClick={handleAlertSubscription} className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white">
                Subscribe to Alerts
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodBankSearch;