import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Stethoscope, Pill, TestTube, Truck, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Varanasi - 221007');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/medicines');
      toast({
        title: "🔍 Search initiated",
        description: `Searching for "${searchQuery}" in ${location}...`,
      });
    }
  };

  const handleLocationClick = () => {
    toast({
      title: "📍 Change Location",
      description: "Location selector coming soon!",
    });
  };

  const handleServiceClick = (service) => {
    if (service === 'medicines') {
      navigate('/medicines');
    } else if (service === 'doctors') {
      navigate('/consult-doctors');
    } else if (service === 'lab') {
      navigate('/lab-tests');
    } else if (service === 'ambulance') {
      navigate('/ambulance');
    } else {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      });
    }
  };

  const services = [
    {
      icon: Stethoscope,
      title: "Consult Doctors",
      description: "Find and consult top doctors near you.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => handleServiceClick('doctors')
    },
    {
      icon: Pill,
      title: "Order medicine",
      description: "Get medicines delivered to your doorstep.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      onClick: () => handleServiceClick('medicines')
    },
    {
      icon: TestTube,
      title: "Find Lab",
      description: "Get lab tests done at your convenience.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      onClick: () => handleServiceClick('lab')
    },
    {
      icon: Truck,
      title: "Call Ambulance",
      description: "Call Ambulance at your convenience.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      onClick: () => handleServiceClick('ambulance')
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Connecting You to Better Healthcare
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book Doctor Appointments, Order Medicines, and Get Lab Tests Done Easily
          </p>

          <form onSubmit={handleSearch} className="max-w-4xl mx-auto relative mb-4">
            <div className="flex flex-col md:flex-row gap-2 bg-white rounded-lg border-2 border-gray-200 p-2 focus-within:border-teal-500">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search By Doctor, Pharmacy and Lab..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleLocationClick}
                  className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 px-4 py-3 whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{location}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          <p className="text-sm text-gray-500 mb-12">
            Enter your area pincode for nearby search results
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={service.onClick}
                className="cursor-pointer"
              >
                <Card className="h-full border-2 border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <service.icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;