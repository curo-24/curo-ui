import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star, Clock, Home, TestTube, ArrowLeft, Calendar, Shield, Info, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { labTests } from '@/data/labTests';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const TestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [collectionType, setCollectionType] = useState('home');
  
  const test = labTests.find(t => t.id === parseInt(id));

  if (!test) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-800 text-2xl">
        Test not found.
      </div>
    );
  }

  const timeSlots = [
    "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM", "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM"
  ];

  const dates = [
    { date: "Today", value: "today" },
    { date: "Tomorrow", value: "tomorrow" },
    { date: "Day After", value: "day-after" }
  ];

  const handleBookTest = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        variant: "destructive",
        title: "Please select date and time",
        description: "Choose your preferred date and time slot to proceed.",
      });
      return;
    }

    const collectionTypeText = collectionType === 'home' ? 'Home Collection' : 'Lab Visit';
    
    toast({
      title: "🧪 Test Booked Successfully!",
      description: `${test.name} scheduled for ${selectedDate} at ${selectedTimeSlot} (${collectionTypeText})`,
    });
  };

  const handleAddToCart = () => {
    toast({
      title: "🛒 Added to Cart",
      description: `${test.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>{test.name} - Book Lab Test Online | Curo24</title>
        <meta name="description" content={`Book ${test.name} online. ${test.description}. Price: ₹${test.price}. Home collection available. Get digital reports from ${test.labPartner}.`} />
      </Helmet>

      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-teal-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lab Tests
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TestTube className="w-12 h-12 text-purple-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{test.name}</h1>
                        <p className="text-lg text-gray-600 mb-2">{test.description}</p>
                        <Badge variant="outline" className="mb-2">{test.category}</Badge>
                      </div>
                      {test.discount > 0 && (
                        <Badge className="bg-orange-100 text-orange-700 text-lg px-3 py-1">
                          {test.discount}% OFF
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-800">{test.rating}</span>
                        <span className="text-gray-600">({test.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">Report in {test.reportTime}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TestTube className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">{test.sampleType} Sample</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {test.fastingRequired ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Fasting Required
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          No Fasting Required
                        </Badge>
                      )}
                      {test.homeCollection && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          <Home className="w-3 h-3 mr-1" />
                          Home Collection Available
                        </Badge>
                      )}
                      {test.accreditation.map(acc => (
                        <Badge key={acc} variant="secondary" className="bg-purple-100 text-purple-700">
                          <Shield className="w-3 h-3 mr-1" />
                          {acc} Accredited
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-500" />
                  Test Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Purpose</h4>
                  <p className="text-gray-700">{test.purpose}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Parameters Measured</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {test.parameters.map((parameter, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{parameter}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Pre-test Instructions</h4>
                  <p className="text-gray-700">{test.instructions}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Conditions Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    {test.conditions.map(condition => (
                      <Badge key={condition} variant="outline" className="text-sm">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Lab Partner</h4>
                  <div className="flex items-center space-x-3">
                    <img 
                      className="w-12 h-12 rounded-lg object-cover"
                      alt={`${test.labPartner} logo`}
                     src="https://images.unsplash.com/photo-1582719471384-894fbb16e074" />
                    <div>
                      <p className="font-semibold text-gray-800">{test.labPartner}</p>
                      <div className="flex items-center space-x-1">
                        {test.accreditation.map(acc => (
                          <Badge key={acc} variant="secondary" className="text-xs">{acc}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 font-semibold text-gray-800">Rajesh Kumar</span>
                    <span className="ml-auto text-gray-500 text-sm">2 days ago</span>
                  </div>
                  <p className="text-gray-700">"Quick and accurate results. Home collection was very convenient and the technician was professional."</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300 fill-current" />
                    </div>
                    <span className="ml-2 font-semibold text-gray-800">Priya Sharma</span>
                    <span className="ml-auto text-gray-500 text-sm">1 week ago</span>
                  </div>
                  <p className="text-gray-700">"Good service and timely report delivery. The digital report was easy to understand."</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-800">Book This Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {test.originalPrice > test.price && (
                      <span className="text-gray-500 text-lg line-through">₹{test.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-gray-800">₹{test.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">Inclusive of all charges</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={collectionType === 'home' ? 'default' : 'outline'}
                      onClick={() => setCollectionType('home')}
                      className="flex items-center justify-center space-x-2"
                      disabled={!test.homeCollection}
                    >
                      <Home className="w-4 h-4" />
                      <span>Home</span>
                    </Button>
                    <Button
                      variant={collectionType === 'lab' ? 'default' : 'outline'}
                      onClick={() => setCollectionType('lab')}
                      className="flex items-center justify-center space-x-2"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Lab Visit</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <div className="grid grid-cols-3 gap-2">
                    {dates.map(dateOption => (
                      <Button
                        key={dateOption.value}
                        variant={selectedDate === dateOption.value ? 'default' : 'outline'}
                        onClick={() => setSelectedDate(dateOption.value)}
                        className="text-sm"
                      >
                        {dateOption.date}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map(slot => (
                      <Button
                        key={slot}
                        variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className="text-xs"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button
                    onClick={handleBookTest}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Test Now
                  </Button>

                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center pt-2">
                  <p>• Free sample collection at home</p>
                  <p>• Digital report delivery</p>
                  <p>• NABL accredited lab</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestDetail;