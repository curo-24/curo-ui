import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ServiceCard = ({ icon: Icon, title, description, iconBgColor, iconColor, delay = 0, onClick }) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card 
        onClick={handleClick}
        className="h-full bg-white border border-gray-200 hover:border-teal-200 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
      >
        <CardContent className="p-6 text-center flex flex-col flex-grow">
          <div className="flex-grow">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-4 flex justify-center"
            >
              <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${iconColor}`} />
              </div>
            </motion.div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
              {title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {description}
            </p>
          </div>
          
          <Button
            className="w-full mt-auto bg-teal-50 text-teal-700 hover:bg-teal-100 font-semibold transition-all duration-300"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;