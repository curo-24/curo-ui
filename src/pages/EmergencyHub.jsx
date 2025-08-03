import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { AlertTriangle, Bus as Ambulance, Stethoscope, Droplets, Hotel as Hospital, MapPin, Clock, Phone, Users, Navigation, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const EmergencyHub = () => {
  const [userLocation, setUserLocation] = useState('Delhi, India');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'John Doe', relation: 'Father', phone: '+91-98765-43210' },
    { name: 'Jane Smith', relation: 'Wife', phone: '+91-98765-43211' }
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmergencyService = (service) => {
    toast({
      title: `🚨 ${service} Emergency Activated`,
      description: "Dispatching emergency services to your location...",
      variant: "destructive",
    });

    switch (service) {
      case 'Ambulance':
        navigate('/ambulance');
        break;
      case 'Doctor':
        navigate('/consult-doctors');
        break;
      case 'Blood Bank':
        navigate('/blood-bank');
        break;
      default:
        break;
    }
  };

  const handleNotifyContacts = () => {
    toast({
      title: "📱 Emergency Contacts Notified",
      description: "SMS and WhatsApp alerts sent to your emergency contacts with your location.",
    });
  };

  const emergencyServices = [
    {
      icon: Ambulance,
      title: 'Emergency Ambulance',
      description: 'Nearest ambulance dispatch with GPS tracking',
      eta: '8-12 mins',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      icon: Stethoscope,
      title: 'Emergency Doctor',
      description: 'Instant video/audio consultation',
      eta: '< 60 secs',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: Droplets,
      title: 'Emergency Blood',
      description: 'Find and reserve blood units immediately',
      eta: '5-15 mins',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      icon: Hospital,
      title: 'Nearest Hospitals',
      description: 'Emergency-capable hospitals with bed availability',
      eta: 'Real-time',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ];

  const nearbyHospitals = [
    {
      name: 'Apollo Hospital',
      distance: '2.3 km',
      eta: '8 mins',
      emergency: true,
      beds: 'Available',
      specialties: ['Cardiology', 'Emergency', 'ICU']
    },
    {
      name: 'Fortis Hospital',
      distance: '3.1 km',
      eta: '12 mins',
      emergency: true,
      beds: 'Limited',
      specialties: ['Emergency', 'Trauma', 'Neurology']
    },
    {
      name: 'Max Hospital',
      distance: '4.2 km',
      eta: '15 mins',
      emergency: true,
      beds: 'Available',
      specialties: ['Emergency', 'Cardiac Surgery', 'ICU']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Emergency Services Hub | Curo24</title>
        <meta name="description" content="Access all emergency medical services in one place. Ambulance, doctor consultation, blood bank, and hospital finder." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">Emergency Services Hub</h1>
              <p className="text-xl text-gray-600">Fast access to life-saving medical services</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-red-50 border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="w-6 h-6 text-red-500" />
                  <div>
                    <h3 className="font-bold text-red-800">Your Current Location</h3>
                    <p className="text-red-600">{userLocation}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 ml-auto">Auto-detected</Badge>
                </div>
                <p className="text-red-700 text-sm">
                  All emergency services will be dispatched to this location. Location sharing is active.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                  Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyServices.map((service, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleEmergencyService(service.title.split(' ')[1])}
                      className="cursor-pointer"
                    >
                      <Card className={`${service.color} ${service.hoverColor} text-white transition-colors`}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <service.icon className="w-8 h-8" />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg mb-1">{service.title}</h3>
                              <p className="text-sm opacity-90 mb-2">{service.description}</p>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">ETA: {service.eta}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Hospital className="w-5 h-5 mr-2 text-green-500" />
                  Nearest Emergency Hospitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyHospitals.map((hospital, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{hospital.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-4 h-4" />
                            <span>{hospital.distance}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>ETA: {hospital.eta}</span>
                          </div>
                          <Badge variant={hospital.beds === 'Available' ? 'default' : 'secondary'} className="text-xs">
                            Beds: {hospital.beds}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hospital.specialties.slice(0, 3).map(specialty => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <Navigation className="w-4 h-4 mr-1" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.relation}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  onClick={handleNotifyContacts}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Notify All Contacts
                </Button>
                
                <Button
                  onClick={() => navigate('/emergency-contacts')}
                  variant="outline"
                  className="w-full"
                >
                  Manage Contacts
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate('/emergency-triage')}
                  variant="outline"
                  className="w-full"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Triage Helper
                </Button>
                
                <Button
                  onClick={() => toast({ title: "📍 Location Shared", description: "Live location shared with emergency services" })}
                  variant="outline"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Share Live Location
                </Button>
                
                <Button
                  onClick={() => toast({ title: "🚨 Emergency Call", description: "Connecting to emergency services..." })}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHub;