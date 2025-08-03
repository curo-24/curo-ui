import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star, ShoppingCart, Heart, ArrowLeft, Shield, Package, Thermometer, User, Users, MessageSquare } from 'lucide-react';
import { allMedicines } from '@/data/medicines';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const medicine = allMedicines.find(m => m.id === parseInt(id));

    if (!medicine) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-800 text-2xl">
                Medicine not found.
            </div>
        );
    }
    
    const relatedProducts = allMedicines.filter(
      (p) => p.category === medicine.category && p.id !== medicine.id
    ).slice(0, 4);

    const handleAddToCart = () => {
        toast({
            title: "🛒 Added to Cart",
            description: `${medicine.name} has been added to your cart.`,
        });
    };

    const handleAddToWishlist = () => {
        toast({
            title: "❤️ Added to Wishlist",
            description: `${medicine.name} has been saved to your wishlist.`,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 text-gray-800">
            <Helmet>
                <title>{medicine.name} - Details | Curo24</title>
                <meta name="description" content={`Details, uses, and side effects of ${medicine.name}. Order now for 15-minute delivery.`} />
            </Helmet>

            <div className="container mx-auto px-4">
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-teal-600">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Catalog
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Card className="bg-white border border-gray-200">
                        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <img 
                                    className="w-full h-auto object-cover rounded-lg mb-4"
                                    alt={`${medicine.name} - ${medicine.brand} medicine package`}
                                 src="https://images.unsplash.com/photo-1612896195368-8cb102613ea6" />
                                <div className="grid grid-cols-2 gap-4">
                                     <Card className="bg-gray-50 p-4 border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <Shield className="w-6 h-6 text-blue-500" />
                                            <div>
                                                <p className="text-sm text-gray-600">Safety</p>
                                                <p className="font-semibold text-gray-800">100% Genuine</p>
                                            </div>
                                        </div>
                                    </Card>
                                     <Card className="bg-gray-50 p-4 border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <Package className="w-6 h-6 text-green-500" />
                                            <div>
                                                <p className="text-sm text-gray-600">Manufacturer</p>
                                                <p className="font-semibold text-gray-800">{medicine.brand}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {medicine.requiresPrescription && (
                                    <Badge className="bg-red-500 text-white">Rx Only</Badge>
                                )}
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{medicine.name}</h1>
                                <p className="text-lg text-gray-600">Salt: {medicine.salt}</p>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                                        <span className="text-lg font-semibold text-gray-800">{medicine.rating}</span>
                                        <span className="text-gray-600 ml-1">({medicine.reviews} ratings)</span>
                                    </div>
                                    <p className="text-sm text-gray-600">Expires: {new Date(medicine.expiryDate).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                                </div>
                                
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-4xl font-bold text-teal-600">₹{medicine.price}</span>
                                    <span className="text-xl text-gray-500 line-through">₹{medicine.originalPrice}</span>
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-lg">
                                      {Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)}% OFF
                                    </Badge>
                                </div>

                                <div className="flex space-x-4 pt-4">
                                    <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </Button>
                                    <Button onClick={handleAddToWishlist} size="lg" variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                                        <Heart className="w-5 h-5 mr-2" />
                                        Wishlist
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                             <Card className="bg-white border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-gray-800">Product Details</CardTitle>
                                </CardHeader>
                                <CardContent className="text-gray-700 space-y-4">
                                    <p><strong>Uses:</strong> Used for the treatment of {medicine.category.toLowerCase()} conditions. It helps relieve symptoms effectively.</p>
                                    <p><strong>Side Effects:</strong> Common side effects may include nausea, dizziness, or headache. Consult your doctor if any side effect persists.</p>
                                    <p><strong>Dosage:</strong> Take as prescribed by your physician. Do not alter the dosage without medical advice.</p>
                                    <p><strong>Storage:</strong> <Thermometer className="inline w-4 h-4 mr-1" /> Store in a cool, dry place away from direct sunlight.</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-white border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 flex items-center">
                                      <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                                      Verified Reviews
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  <div className="border-b border-gray-200 pb-4">
                                      <div className="flex items-center mb-2">
                                          <User className="w-4 h-4 mr-2 text-gray-600" />
                                          <p className="font-semibold text-gray-800">Rohan S.</p>
                                          <div className="flex items-center ml-auto">
                                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                                          </div>
                                      </div>
                                      <p className="text-gray-700">"Very effective product. Fast delivery from Curo24 was a bonus!"</p>
                                  </div>
                                   <div className="border-b border-gray-200 pb-4">
                                      <div className="flex items-center mb-2">
                                          <User className="w-4 h-4 mr-2 text-gray-600" />
                                          <p className="font-semibold text-gray-800">Priya K.</p>
                                          <div className="flex items-center ml-auto">
                                            {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                                            <Star className="w-4 h-4 text-gray-300 fill-current"/>
                                          </div>
                                      </div>
                                      <p className="text-gray-700">"Good medicine, but packaging could be better. Overall satisfied."</p>
                                  </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                           <Card className="bg-white border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-gray-800 flex items-center">
                                      <Users className="w-6 h-6 mr-2 text-green-500"/>
                                      People Also Bought
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                {relatedProducts.length > 0 ? relatedProducts.map(relMed => (
                                     <div key={relMed.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors" onClick={() => navigate(`/medicines/${relMed.id}`)}>
                                         <img  
                                           alt={`${relMed.name} - ${relMed.brand} medicine package`} 
                                           className="w-16 h-16 rounded-md object-cover"
                                          src="https://images.unsplash.com/photo-1699726193409-b040a9dd734a" />
                                         <div>
                                            <p className="font-semibold text-gray-800">{relMed.name}</p>
                                            <p className="text-sm text-teal-600">₹{relMed.price}</p>
                                         </div>
                                     </div>
                                )) : <p className="text-gray-600">No related products found.</p>}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetailPage;