import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const HealthConcerns = () => {
  const { toast } = useToast();
  const scrollContainerRef = useRef(null);

  const healthConcerns = [
    { 
      name: "Fever & Pain Relief", 
      image: "Thermometer and pain relief tablets on white background", 
      bgColor: "bg-orange-100" 
    },
    { 
      name: "Cold, Cough & Allergies", 
      image: "Cough syrup bottle and tissue box for cold relief", 
      bgColor: "bg-blue-100" 
    },
    { 
      name: "Digestive Care", 
      image: "Antacid tablets and digestive health supplements", 
      bgColor: "bg-green-100" 
    },
    { 
      name: "Immunity Boosters", 
      image: "Vitamin C tablets and immunity supplement bottles", 
      bgColor: "bg-yellow-100" 
    },
    { 
      name: "Skin & Wound Care", 
      image: "Antiseptic cream tubes and wound care products", 
      bgColor: "bg-pink-100" 
    },
    { 
      name: "First Aid & Essentials", 
      image: "First aid kit with bandages and medical supplies", 
      bgColor: "bg-red-100" 
    },
    { 
      name: "Hair & Scalp Care", 
      image: "Anti-dandruff shampoo bottles and hair care products", 
      bgColor: "bg-purple-100" 
    },
    { 
      name: "Personal Hygiene", 
      image: "Hand sanitizer bottles and hygiene products", 
      bgColor: "bg-cyan-100" 
    },
    { 
      name: "Wellness & Ayurveda", 
      image: "Ayurvedic herbs and wellness supplement bottles", 
      bgColor: "bg-indigo-100" 
    },
    { 
      name: "Diabetes & Sugar Control", 
      image: "Glucometer device and diabetes test strips", 
      bgColor: "bg-orange-100" 
    },
    { 
      name: "Heart & BP Support", 
      image: "Blood pressure monitor and heart health supplements", 
      bgColor: "bg-rose-100" 
    },
    { 
      name: "Baby & Mother Care", 
      image: "Baby care products and mother health supplements", 
      bgColor: "bg-sky-100" 
    },
    { 
      name: "Stress & Sleep Support", 
      image: "Sleep aid tablets and stress relief supplements", 
      bgColor: "bg-slate-100" 
    },
    { 
      name: "Energy & Nutrition", 
      image: "Protein powder containers and energy supplements", 
      bgColor: "bg-lime-100" 
    },
    { 
      name: "Sexual Wellness", 
      image: "Wellness and intimate care products", 
      bgColor: "bg-fuchsia-100" 
    },
  ];

  const popularBrands = [
    { name: "Himalaya", logo: "Himalaya herbal healthcare brand logo" },
    { name: "Dabur", logo: "Dabur ayurvedic brand logo" },
    { name: "Cipla", logo: "Cipla pharmaceutical company logo" },
    { name: "Sun Pharma", logo: "Sun Pharma pharmaceutical brand logo" },
    { name: "Dr. Reddy's", logo: "Dr Reddys pharmaceutical brand logo" },
    { name: "Lupin", logo: "Lupin pharmaceutical company logo" },
    { name: "Zydus", logo: "Zydus pharmaceutical brand logo" },
    { name: "Mankind", logo: "Mankind pharmaceutical company logo" },
  ];
  
  const handleCategoryClick = (categoryName) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleBrandClick = (brandName) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="space-y-12 mb-12">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Shop by Health Concerns</h2>
          <div className="flex space-x-2">
              <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600"/>
              </button>
              <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors">
                  <ArrowRight className="w-5 h-5 text-gray-600"/>
              </button>
          </div>
        </div>
        
        <div className="relative">
          <div ref={scrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {healthConcerns.map((concern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-40 text-center cursor-pointer"
                onClick={() => handleCategoryClick(concern.name)}
              >
                <div
                  className={`w-full h-32 rounded-lg ${concern.bgColor} flex items-center justify-center p-2 overflow-hidden mb-3 border border-gray-100 hover:shadow-md transition-shadow`}
                >
                  <img   
                      alt={concern.image}
                      className="w-full h-full object-contain"
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <p className="text-gray-700 font-medium text-sm">{concern.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Popular Brands</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularBrands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleBrandClick(brand.name)}
            >
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-50 rounded-lg flex items-center justify-center">
                <img 
                  alt={brand.logo}
                  className="w-12 h-12 object-contain"
                 src="https://images.unsplash.com/photo-1649015931204-15a3c789e6ea" />
              </div>
              <p className="text-gray-700 font-medium text-sm">{brand.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default HealthConcerns;