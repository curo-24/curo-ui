import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, TestTube, Home } from 'lucide-react';

const HealthPackagesSection = ({ packages, onTestClick, onBookTest }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Health Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => onTestClick(test.id)}
            className="cursor-pointer"
          >
            <Card className="h-full bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-2">{test.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 ml-2">
                    {test.discount}% OFF
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-800">{test.rating}</span>
                      <span className="text-gray-600 text-sm">({test.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{test.reportTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <TestTube className="w-4 h-4" />
                    <span>{test.labPartner}</span>
                    {test.homeCollection && (
                      <>
                        <span>•</span>
                        <Home className="w-4 h-4" />
                        <span>Home Collection</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div>
                      <span className="text-gray-500 text-sm line-through">₹{test.originalPrice}</span>
                      <span className="text-2xl font-bold text-gray-800 ml-2">₹{test.price}</span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookTest(test.id, test.name);
                      }}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HealthPackagesSection;