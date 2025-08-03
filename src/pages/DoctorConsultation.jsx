import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, MapPin, Star, Clock, Video, Stethoscope, AlertCircle, ChevronDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { doctors, specializations, languages, cities } from '@/data/doctors';

const DoctorConsultation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: "🔍 Searching Doctors",
      description: `Finding doctors for "${searchQuery}"...`,
    });
  };

  const handleEmergencyConsult = () => {
    toast({
      title: "🚨 Emergency Consultation",
      description: "Connecting you to an available doctor within 5-10 minutes...",
      variant: "destructive",
    });
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
    const matchesLanguage = !selectedLanguage || doctor.languages.includes(selectedLanguage);
    const matchesCity = !selectedCity || doctor.city === selectedCity;
    const matchesAvailability = !availabilityFilter || 
                               (availabilityFilter === 'now' && doctor.availability === 'Available Now') ||
                               (availabilityFilter === 'today' && (doctor.availability === 'Available Now' || doctor.availability === 'Available Today'));
    const matchesRating = !ratingFilter || doctor.rating >= parseFloat(ratingFilter);
    
    return matchesSearch && matchesSpecialization && matchesLanguage && matchesCity && matchesAvailability && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Consult Doctors Online - Book Appointment | Curo24</title>
        <meta name="description" content="Book online doctor consultations with verified doctors. Video call, audio call, or in-clinic appointments available. Emergency consultations within 5-10 minutes." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Consult with Verified Doctors
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book online or offline appointments with experienced doctors. Emergency consultations available 24/7.
          </p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 focus-within:border-teal-500 shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by doctor name or specialization"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <select
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Specializations</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Languages</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">All Cities</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Any Time</option>
                    <option value="now">Available Now</option>
                    <option value="today">Available Today</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-800">Need Emergency Consultation?</h3>
                  <p className="text-red-600 text-sm">Get connected to a doctor within 5-10 minutes</p>
                </div>
              </div>
              <Button
                onClick={handleEmergencyConsult}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Emergency Consult
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleDoctorClick(doctor.id)}
              className="cursor-pointer"
            >
              <Card className="h-full bg-white border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      <img 
                        className="w-16 h-16 rounded-full object-cover"
                        alt={doctor.profileImage}
                       src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" />
                      {doctor.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{doctor.name}</h3>
                      <p className="text-teal-600 font-medium">{doctor.specialization}</p>
                      <p className="text-gray-600 text-sm">{doctor.experience} years experience</p>
                      {doctor.insuranceCovered && (
                        <Badge className="mt-1 bg-green-100 text-green-700 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Insurance Covered
                        </Badge>
                      )}
                    </div>
                    {doctor.emergencyAvailable && (
                      <Badge className="bg-red-100 text-red-700 text-xs">Emergency</Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-800">{doctor.rating}</span>
                        <span className="text-gray-600 text-sm">({doctor.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        doctor.availability === 'Available Now' ? 'bg-green-50 text-green-700 border-green-200' :
                        doctor.availability === 'Available Today' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {doctor.availability}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.hospital}, {doctor.city}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Next slot: {doctor.nextSlot}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {doctor.languages.slice(0, 3).map(lang => (
                        <Badge key={lang} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-sm">
                        <span className="text-gray-600">Online: </span>
                        <span className="font-semibold text-gray-800">₹{doctor.onlinePrice}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Clinic: </span>
                        <span className="font-semibold text-gray-800">₹{doctor.clinicPrice}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white">
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Stethoscope className="w-4 h-4 mr-1" />
                        Clinic
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorConsultation;