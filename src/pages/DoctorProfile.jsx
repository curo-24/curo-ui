import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star, MapPin, Clock, Video, Phone, MessageSquare, Stethoscope, ArrowLeft, Calendar, Award, Users, Shield, Heart, Upload } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedConsultationType, setSelectedConsultationType] = useState('video');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-800 text-2xl">
        Doctor not found.
      </div>
    );
  }

  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const handleBookConsultation = () => {
    if (!selectedTimeSlot) {
      toast({
        variant: "destructive",
        title: "Please select a time slot",
        description: "Choose your preferred consultation time to proceed.",
      });
      return;
    }

    const consultationType = selectedConsultationType === 'video' ? 'Video Call' : 
                           selectedConsultationType === 'audio' ? 'Audio Call' :
                           selectedConsultationType === 'chat' ? 'Text Chat' : 'In-Clinic Visit';
    
    toast({
      title: "🎉 Consultation Booked!",
      description: `${consultationType} with ${doctor.name} scheduled for ${selectedTimeSlot}`,
    });
  };

  const handleAddToFavorites = () => {
    toast({
      title: "❤️ Added to Favorites",
      description: `${doctor.name} has been added to your favorite doctors.`,
    });
  };

  const handleEmergencyConsult = () => {
    toast({
      title: "🚨 Emergency Consultation",
      description: "Connecting you to the doctor immediately...",
      variant: "destructive",
    });
  };

  const price = selectedConsultationType === 'clinic' ? doctor.clinicPrice : doctor.onlinePrice;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>{doctor.name} - {doctor.specialization} | Curo24</title>
        <meta name="description" content={`Book consultation with ${doctor.name}, experienced ${doctor.specialization} with ${doctor.experience} years of experience. Online and clinic appointments available.`} />
      </Helmet>

      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-teal-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
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
                  <div className="relative">
                    <img 
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      alt={doctor.profileImage}
                     src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" />
                    {doctor.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h1>
                        <p className="text-xl text-teal-600 font-semibold mb-2">{doctor.specialization}</p>
                        <p className="text-gray-600">{doctor.experience} years experience</p>
                      </div>
                      <Button
                        onClick={handleAddToFavorites}
                        variant="outline"
                        className="mt-4 md:mt-0"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Add to Favorites
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-800">{doctor.rating}</span>
                        <span className="text-gray-600">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">{doctor.city}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600">{doctor.consultationTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {doctor.languages.map(lang => (
                        <Badge key={lang} variant="secondary" className="text-sm">
                          {lang}
                        </Badge>
                      ))}
                      {doctor.emergencyAvailable && (
                        <Badge className="bg-red-100 text-red-700">Emergency Available</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{doctor.about}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-blue-500" />
                      Qualifications
                    </h4>
                    <ul className="space-y-1">
                      {doctor.degrees.map(degree => (
                        <li key={degree} className="text-gray-600">• {degree}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-green-500" />
                      Hospital Affiliation
                    </h4>
                    <p className="text-gray-600">{doctor.hospital}</p>
                    <p className="text-gray-500 text-sm mt-1">MCI License: {doctor.mciLicense}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Patient Reviews</CardTitle>
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
                  <p className="text-gray-700">"Excellent consultation. Dr. {doctor.name.split(' ')[1]} explained everything clearly and provided effective treatment."</p>
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
                  <p className="text-gray-700">"Very professional and knowledgeable. The online consultation was smooth and convenient."</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-800">Book Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedConsultationType === 'video' ? 'default' : 'outline'}
                      onClick={() => setSelectedConsultationType('video')}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Video</span>
                    </Button>
                    <Button
                      variant={selectedConsultationType === 'audio' ? 'default' : 'outline'}
                      onClick={() => setSelectedConsultationType('audio')}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Audio</span>
                    </Button>
                    <Button
                      variant={selectedConsultationType === 'chat' ? 'default' : 'outline'}
                      onClick={() => setSelectedConsultationType('chat')}
                      className="flex items-center justify-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat</span>
                    </Button>
                    <Button
                      variant={selectedConsultationType === 'clinic' ? 'default' : 'outline'}
                      onClick={() => setSelectedConsultationType('clinic')}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Stethoscope className="w-4 h-4" />
                      <span>Clinic</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map(slot => (
                      <Button
                        key={slot}
                        variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className="text-sm"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-800">Consultation Fee</span>
                    <span className="text-2xl font-bold text-teal-600">₹{price}</span>
                  </div>
                  
                  <Button
                    onClick={handleBookConsultation}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white mb-2"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Consultation
                  </Button>

                  {doctor.emergencyAvailable && (
                    <Button
                      onClick={handleEmergencyConsult}
                      variant="outline"
                      className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Emergency Consult (5-10 min)
                    </Button>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Reports/Symptoms
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border border-gray-200 text-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-800">Upload Medical Reports</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-700 mb-2">Upload your medical reports or describe symptoms</p>
                        <p className="text-gray-500 text-sm mb-4">Supported formats: JPG, PNG, PDF</p>
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                          Choose Files
                        </Button>
                      </div>
                      <textarea
                        placeholder="Describe your symptoms or concerns..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        rows={4}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorProfile;