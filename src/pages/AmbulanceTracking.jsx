import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MapPin, Phone, Clock, User, Share2, MessageSquare, Navigation, AlertCircle, CheckCircle, Truck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const AmbulanceTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [trackingStatus, setTrackingStatus] = useState('dispatched');
  const [eta, setEta] = useState(8);
  const [driverLocation, setDriverLocation] = useState({ lat: 28.6139, lng: 77.2090 });

  const ambulanceDetails = {
    id: id,
    type: "ICU Ambulance",
    vehicleNumber: "DL-01-AB-1234",
    driver: {
      name: "Rajesh Kumar",
      phone: "+91-98765-43210",
      rating: 4.8,
      experience: "8 years",
      photo: "Professional ambulance driver in uniform"
    },
    medicalStaff: {
      name: "Dr. Priya Sharma",
      role: "Paramedic",
      phone: "+91-98765-43211",
      certifications: ["CPR Certified", "Ventilator Trained"]
    },
    hospital: {
      name: "Apollo Hospital",
      address: "Sarita Vihar, Delhi",
      phone: "+91-11-2692-5858"
    },
    bookingTime: new Date().toISOString(),
    estimatedArrival: new Date(Date.now() + eta * 60000).toISOString()
  };

  const trackingSteps = [
    { id: 1, status: 'dispatched', label: 'Ambulance Dispatched', time: '2 mins ago', completed: true },
    { id: 2, status: 'on-way', label: 'Driver On The Way', time: 'Current', completed: trackingStatus !== 'dispatched' },
    { id: 3, status: 'arrived', label: 'Arrived at Pickup', time: `ETA ${eta} mins`, completed: false },
    { id: 4, status: 'patient-onboard', label: 'Patient On Board', time: 'Pending', completed: false },
    { id: 5, status: 'en-route-hospital', label: 'En Route to Hospital', time: 'Pending', completed: false },
    { id: 6, status: 'completed', label: 'Reached Hospital', time: 'Pending', completed: false }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEta(prev => Math.max(0, prev - 1));
      
      if (eta <= 0 && trackingStatus === 'dispatched') {
        setTrackingStatus('on-way');
        setEta(5);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [eta, trackingStatus]);

  const handleCallDriver = () => {
    toast({
      title: "📞 Calling Driver",
      description: `Connecting to ${ambulanceDetails.driver.name}...`,
    });
  };

  const handleCallMedicalStaff = () => {
    toast({
      title: "📞 Calling Medical Staff",
      description: `Connecting to ${ambulanceDetails.medicalStaff.name}...`,
    });
  };

  const handleShareLocation = () => {
    toast({
      title: "📍 Location Shared",
      description: "Live tracking link sent to emergency contacts via WhatsApp",
    });
  };

  const handleChatWithDriver = () => {
    toast({
      title: "💬 Chat Feature",
      description: "Opening chat with driver...",
    });
  };

  const handleEmergencyCall = () => {
    toast({
      title: "🚨 Emergency Call",
      description: "Connecting to emergency services...",
      variant: "destructive",
    });
  };

  const getCurrentStep = () => {
    return trackingSteps.find(step => step.status === trackingStatus) || trackingSteps[0];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Track Ambulance - Live Location | Curo24</title>
        <meta name="description" content="Track your ambulance in real-time with live GPS location, driver details, and estimated arrival time." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Track Your Ambulance</h1>
            <Badge className="bg-green-100 text-green-700 px-3 py-1">
              Booking ID: {id}
            </Badge>
          </div>
          <p className="text-gray-600">Real-time tracking and communication with your ambulance team</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-teal-600" />
                  Live Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">Ambulance location: {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">ETA</p>
                    <p className="font-bold text-blue-600">{eta} mins</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Navigation className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="font-bold text-green-600">2.3 km</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Truck className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Speed</p>
                    <p className="font-bold text-purple-600">45 km/h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Tracking Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : step.status === trackingStatus 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-sm font-bold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          step.completed ? 'text-green-700' : 
                          step.status === trackingStatus ? 'text-blue-700' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-500">{step.time}</p>
                      </div>
                      {step.status === trackingStatus && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Ambulance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Vehicle Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{ambulanceDetails.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle No:</span>
                        <span className="font-medium">{ambulanceDetails.vehicleNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booked:</span>
                        <span className="font-medium">
                          {new Date(ambulanceDetails.bookingTime).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Destination</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">{ambulanceDetails.hospital.name}</span>
                      </div>
                      <div className="text-gray-600">{ambulanceDetails.hospital.address}</div>
                      <div className="text-gray-600">{ambulanceDetails.hospital.phone}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Driver Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    className="w-16 h-16 rounded-full object-cover"
                    alt={ambulanceDetails.driver.photo}
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{ambulanceDetails.driver.name}</h3>
                    <p className="text-gray-600 text-sm">{ambulanceDetails.driver.experience} experience</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-semibold">{ambulanceDetails.driver.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={handleCallDriver}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Driver
                  </Button>
                  <Button
                    onClick={handleChatWithDriver}
                    variant="outline"
                    className="w-full"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat with Driver
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Medical Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{ambulanceDetails.medicalStaff.name}</h3>
                    <p className="text-blue-600 font-medium">{ambulanceDetails.medicalStaff.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {ambulanceDetails.medicalStaff.certifications.map(cert => (
                        <Badge key={cert} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleCallMedicalStaff}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Medical Staff
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleShareLocation}
                  variant="outline"
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Live Location
                </Button>
                
                <Button
                  onClick={handleEmergencyCall}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Emergency Call
                </Button>
                
                <Button
                  onClick={() => navigate('/ambulance-history')}
                  variant="outline"
                  className="w-full"
                >
                  View Booking History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceTracking;