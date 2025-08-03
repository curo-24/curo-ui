import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, ShoppingCart, Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ProductCard = ({ medicine, prescriptionUploaded }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (medicine.requiresPrescription && !prescriptionUploaded) {
      toast({
        variant: "destructive",
        title: "📜 Prescription Required",
        description: "Please upload a valid prescription to add this medicine to cart.",
      });
      return;
    }
    
    toast({
      title: "🛒 Added to Cart",
      description: `${medicine.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    toast({
      title: "❤️ Added to Wishlist",
      description: `${medicine.name} has been saved to your wishlist.`,
    });
  };

  const handleCardClick = () => {
    navigate(`/medicines/${medicine.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
      className="cursor-pointer"
    >
      <Card className="h-full bg-white border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="relative mb-4">
            <img   
              className="w-full h-40 object-cover rounded-lg"
              alt={`${medicine.name} - ${medicine.brand} medicine package`}
             src="https://images.unsplash.com/photo-1612896195368-8cb102613ea6" />
            
            {medicine.requiresPrescription && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white cursor-help">
                      <Lock className="w-3 h-3 mr-1" />
                      Rx Only
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Requires a valid doctor's prescription to purchase.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {medicine.fastDelivery && (
              <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                <Clock className="w-3 h-3 mr-1" /> 15 Min
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddToWishlist}
              className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 rounded-full shadow-sm"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2 flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-lg group-hover:text-teal-600 transition-colors">
                {medicine.name}
              </h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {medicine.brand}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Salt: {medicine.salt}</p>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-700 text-sm ml-1">{medicine.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({medicine.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-800">₹{medicine.price}</span>
              <span className="text-gray-500 line-through text-sm">₹{medicine.originalPrice}</span>
            </div>

            <p className="text-xs text-gray-500">Expires: {new Date(medicine.expiryDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</p>
          </div>
            
          <Button
            onClick={handleAddToCart}
            disabled={medicine.requiresPrescription && !prescriptionUploaded}
            className={`w-full mt-4 ${
              medicine.requiresPrescription && !prescriptionUploaded
                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {medicine.requiresPrescription && !prescriptionUploaded ? 'Upload Rx to Add' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;