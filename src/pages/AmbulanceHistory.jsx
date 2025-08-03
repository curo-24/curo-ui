import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, MapPin, Phone, Star, Plus, Filter, Truck, Heart, Baby, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const AmbulanceHistory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const ambulanceHistory = [
    {
      id: "AMB001",
      type: "ICU Ambulance",
      bookingDate: "2024-01-15",
      bookingTime: "14:30",
      pickupLocation: "Sector 18, Noida",
      destination: "Apollo Hospital, Delhi",
      status: "completed",
      driverName: "Rajesh Kumar",
      driverRating: 4.8,
      medicalStaff: "Dr. Priya Sharma",
      duration: "45 mins",
      distance: "12.5 km",
      cost: 3500,
      bookingMode: "emergency",
      patientName: "John Doe",
      rating: 5
    },
    {
      id: "AMB002",
      type: "Basic Life Support (BLS)",
      bookingDate: "2024-01-10",
      bookingTime: "09:15",
      pickupLocation: "Connaught Place, Delhi",
      destination: "Max Hospital, Delhi",
      status: "completed",
      driverName: "Amit Singh",
      driverRating: 4.6,
      medicalStaff: "Nurse Sunita",
      duration: "30 mins",
      distance: "8.2 km",
      cost: 1500,
      bookingMode: "scheduled",
      patientName: "Jane Smith",
      rating: 4
    },
    {
      id: "AMB003",
      type: "Cardiac Ambulance",
      bookingDate: "2024-01-20",
      bookingTime: "16:45",
      pickupLocation: "Gurgaon Sector 14",
      destination: "Fortis Hospital, Gurgaon",
      status: "in-progress",
      driverName: "Vikram Patel",
      driverRating: 4.9,
      medicalStaff: "Dr. Arjun Mehta",
      duration: null,
      distance: "6.8 km",
      cost: 4000,
      bookingMode: "emergency",
      patientName: "Robert Wilson",
      rating: null
    },
    {
      id: "AMB004",
      type: "Neonatal Ambulance",
      bookingDate: "2024-01-05",
      bookingTime: "11:20",
      pickupLocation: "Dwarka, Delhi",
      destination: "AIIMS, Delhi",
      status: "completed",
      driverName: "Suresh Kumar",
      driverRating: 4.7,
      medicalStaff: "Dr. Kavita Joshi",
      duration: "55 mins",
      distance: "18.3 km",
      cost: 5000,
      bookingMode: "scheduled",
      patientName: "Baby Johnson",
      rating: 5
    },
    {
      id: "AMB005",
      type: "ICU Ambulance",
      bookingDate: "2024-01-22",
      bookingTime: "08:00",
      pickupLocation: "Lajpat Nagar, Delhi",
      destination: "Apollo Hospital, Delhi",
      status: "scheduled",
      driverName: "Manoj Sharma",
      driverRating: 4.5,
      medicalStaff: "Dr. Neha Gupta",
      duration: null,
      distance: "9.1 km",
      cost: 3500,
      bookingMode: "scheduled",
      patientName: "Mary Brown",
      rating: null
    }
  ];

  const filteredHistory = ambulanceHistory.filter(booking => {
    if (filterStatus === 'all') return true;
    return booking.status === filterStatus;
  });

  const handleRateService = (bookingId) => {
    toast({
      title: "⭐ Rate Service",
      description: "Rating feature will open...",
    });
  };

  const handleRebookAmbulance = (bookingId, ambulanceType) => {
    toast({
      title: "🔄 Rebooking Ambulance",
      description: `Rebooking ${ambulanceType}...`,
    });
    navigate('/ambulance');
  };

  const handleCallDriver = (driverName) => {
    toast({
      title: "📞 Calling Driver",
      description: `Connecting to ${driverName}...`,
    });
  };

  const handleTrackAmbulance = (bookingId) => {
    navigate(`/ambulance-tracking/${bookingId}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-700">Scheduled</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAmbulanceIcon = (type) => {
    switch (type) {
      case 'Basic Life Support (BLS)': return <Truck className="w-5 h-5" />;
      case 'ICU Ambulance': return <Stethoscope className="w-5 h-5" />;
      case 'Cardiac Ambulance': return <Heart className="w-5 h-5" />;
      case 'Neonatal Ambulance': return <Baby className="w-5 h-5" />;
      default: return <Truck className="w-5 h-5" />;
    }
  };

  const getBookingModeColor = (mode) => {
    return mode === 'emergency' ? 'text-red-600' : 'text-blue-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Ambulance Booking History | Curo24</title>
        <meta name="description" content="View your ambulance booking history, track current bookings, and rebook ambulance services." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Ambulance History</h1>
              <p className="text-gray-600">View your past and upcoming ambulance bookings</p>
            </div>
            <Button
              onClick={() => navigate('/ambulance')}
              className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New Ambulance
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'scheduled' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('scheduled')}
                size="sm"
              >
                Scheduled
              </Button>
              <Button
                variant={filterStatus === 'in-progress' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('in-progress')}
                size="sm"
              >
                In Progress
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
                size="sm"
              >
                Completed
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredHistory.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                          {getAmbulanceIcon(booking.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{booking.type}</h3>
                            {getStatusBadge(booking.status)}
                            <Badge variant="outline" className={`text-xs ${getBookingModeColor(booking.bookingMode)}`}>
                              {booking.bookingMode}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 font-medium mb-2">Booking ID: {booking.id}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(booking.bookingDate).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })} at {booking.bookingTime}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.pickupLocation}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.destination}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">₹{booking.cost}</span>
                              {booking.distance && <span>• {booking.distance}</span>}
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Patient:</span> {booking.patientName}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Driver:</span> {booking.driverName}
                              <div className="flex items-center space-x-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs">{booking.driverRating}</span>
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Medical Staff:</span> {booking.medicalStaff}
                            </div>
                            {booking.duration && (
                              <div>
                                <span className="font-medium text-gray-700">Duration:</span> {booking.duration}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-64">
                      {booking.status === 'scheduled' || booking.status === 'in-progress' ? (
                        <Button
                          onClick={() => handleTrackAmbulance(booking.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Track Ambulance
                        </Button>
                      ) : (
                        <>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleRebookAmbulance(booking.id, booking.type)}
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              Rebook
                            </Button>
                            
                            {!booking.rating && booking.status === 'completed' && (
                              <Button
                                onClick={() => handleRateService(booking.id)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Star className="w-4 h-4 mr-1" />
                                Rate
                              </Button>
                            )}
                          </div>

                          {booking.rating && (
                            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                              <span>Your rating:</span>
                              <div className="flex">
                                {[...Array(booking.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {(booking.status === 'in-progress' || booking.status === 'scheduled') && (
                        <Button
                          onClick={() => handleCallDriver(booking.driverName)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Driver
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🚑</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No ambulance bookings found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't booked any ambulances yet" 
                : `No ${filterStatus.replace('-', ' ')} bookings found`}
            </p>
            <Button
              onClick={() => navigate('/ambulance')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Book Your First Ambulance
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbulanceHistory;