import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { name: 'Generics', image: 'A collection of generic medicine boxes' },
  { name: 'Abbott Cashback', image: 'Abbott brand logo with a cashback offer symbol' },
  { name: 'Surgicals & Ortho Care', image: 'Surgical tools and orthopedic support items' },
  { name: 'Medical Devices', image: 'Medical devices like a blood pressure monitor and thermometer' },
  { name: 'Ayurvedic', image: 'A collection of ayurvedic medicine bottles and herbs' },
  { name: 'Baby & Mom Care', image: 'Baby care products like lotion and diapers' },
  { name: 'Cosmetics & Personal Care', image: 'Various cosmetic products and personal care items' },
  { name: 'Health & Nutrition', image: 'Health supplements and nutrition products' },
  { name: 'Home Care & Hygiene', image: 'Household cleaning and hygiene products' },
  { name: 'Vaccines & Speciality', image: 'Vaccine vials and specialized medicine packages' },
  { name: 'Medicines', image: 'A variety of medicine pills and packages' },
  { name: 'OTC', image: 'Over-the-counter medicine products' },
];

const ShopByCategory = () => {
  const { toast } = useToast();

  const handleCategoryClick = (categoryName) => {
    toast({
      title: `Selected: ${categoryName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="text-center cursor-pointer group"
            onClick={() => handleCategoryClick(category.name)}
          >
            <Card className="p-2 border-gray-200 group-hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-2">
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center overflow-hidden mb-2">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={category.name}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <p className="text-gray-700 font-medium text-sm text-center">{category.name}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ShopByCategory;