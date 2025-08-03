import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const manufacturers = [
  { name: 'Abbott', logo: 'Abbott company logo' },
  { name: 'TrueCure', logo: 'TrueCure company logo' },
  { name: 'Cipla Health', logo: 'Cipla Health company logo' },
  { name: 'Marico', logo: 'Marico company logo' },
  { name: 'gsk', logo: 'GSK GlaxoSmithKline company logo' },
  { name: 'SUN PHARMA', logo: 'Sun Pharma company logo' },
  { name: "Dr. Reddy's", logo: "Dr. Reddy's Laboratories company logo" },
  { name: 'Zydus Wellness', logo: 'Zydus Wellness company logo' },
  { name: 'GALDERMA', logo: 'Galderma company logo' },
  { name: 'Rusan', logo: 'Rusan Pharma company logo' },
  { name: 'Zydus Cadila', logo: 'Zydus Cadila company logo' },
  { name: 'Glenmark', logo: 'Glenmark Pharmaceuticals company logo' },
  { name: 'Mamaearth', logo: 'Mamaearth company logo' },
  { name: 'SANOFI', logo: 'Sanofi company logo' },
  { name: '3M', logo: '3M company logo' },
  { name: 'Romsons', logo: 'Romsons company logo' },
  { name: 'P&G', logo: 'Procter & Gamble company logo' },
  { name: 'FAST&UP', logo: 'Fast&Up company logo' },
  { name: 'Mankind', logo: 'Mankind Pharma company logo' },
  { name: 'Lupin', logo: 'Lupin Limited company logo' },
  { name: 'Pfizer', logo: 'Pfizer company logo' },
];

const ShopByManufacturer = () => {
  const { toast } = useToast();

  const handleBrandClick = (brandName) => {
    toast({
      title: `Selected: ${brandName}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleSeeAllClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Shop by Manufacturer</h2>
        <a href="#" onClick={handleSeeAllClick} className="text-sm font-medium text-teal-600 hover:underline">See All</a>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {manufacturers.slice(0, 14).map((brand, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center h-24 cursor-pointer"
            onClick={() => handleBrandClick(brand.name)}
          >
            <img 
              alt={brand.name}
              className="max-w-full max-h-12 object-contain"
             src="https://images.unsplash.com/photo-1649015931204-15a3c789e6ea" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ShopByManufacturer;