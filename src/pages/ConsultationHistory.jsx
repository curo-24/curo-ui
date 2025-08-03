import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, Video, Phone, MessageSquare, Stethoscope, Download, Star, RefreshCw, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const ConsultationHistory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const consultations = [
    {
      id: 1,
      doctorName: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      date: "2024-01-15",
      time: "10:30 AM",
      type: "video",
      status: "completed",
      duration: "18 mins",
      prescription: true,
      rating: 5,
      followUpAvailable: true,
      symptoms: "Fever, headache",
      diagnosis: "Viral fever"
    },
    {
      id: 2,
      doctorName: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      date: "2024-01-10",
      time: "2:00 PM",
      type: "clinic",
      status: "completed",
      duration: "25 mins",
      prescription: true,
      rating: 4,
      followUpAvailable: false,
      symptoms: "Skin rash",
      diagnosis: "Allergic dermatitis"
    },
    {
      id: 3,
      doctorName: "Dr. Amit Patel",
      specialization: "Cardiologist",
      date: "2024-01-20",
      time: "11:00 AM",
      type: "video",
      status: "upcoming",
      duration: null,
      prescription: false,
      rating: null,
      followUpAvailable: false,
      symptoms: "Chest pain",
      diagnosis: null
    },
    {
      id: 4,
      doctorName: "Dr. Sneha Reddy",
      specialization: "Gynecologist",
      date: "2024-01-05",
      time: "3:30 PM",
      type: "audio",
      status: "completed",
      duration: "22 mins",
      prescription: true,
      rating: 5,
      followUpAvailable: true,
      symptoms: "Irregular periods",
      diagnosis: "Hormonal imbalance"
    }
  ];

  const filteredConsultations = consultations.filter(consultation => {
    if (filterStatus === 'all') return true;
    return consultation.status === filterStatus;
  });

  const handleDownloadPrescription = (consultationId) => {
    toast({
      title: "📄 Downloading Prescription",
      description: "Your prescription is being downloaded...",
    });
  };

  const handleRateDoctor = (consultationId) => {
    toast({
      title: "⭐ Rate Doctor",
      description: "Rating feature will open...",
    });
  };

  const handleFollowUp = (consultationId) => {
    toast({
      title: "🔄 Book Follow-up",
      description: "Booking discounted follow-up consultation...",
    });
  };

  const handleAddToCart = (consultationId) => {
    toast({
      title: "🛒 Added to Cart",
      description: "Prescribed medicines added to your cart.",
    });
  };

  const handleJoinConsultation = (consultationId) => {
    toast({
      title: "📹 Joining Consultation",
      description: "Connecting to your appointment...",
    });
  };

  const getConsultationIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      case 'clinic': return <Stethoscope className="w-4 h-4" />;
      default: return <Video className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Consultation History | Curo24</title>
        <meta name="description" content="View your consultation history, download prescriptions, and book follow-up appointments with your doctors." />
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
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Consultation History</h1>
              <p className="text-gray-600">View your past and upcoming consultations</p>
            </div>
            <Button
              onClick={() => navigate('/consult-doctors')}
              className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New Consultation
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
                variant={filterStatus === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('upcoming')}
                size="sm"
              >
                Upcoming
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
          {filteredConsultations.map((consultation, index) => (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <img 
                          className="w-16 h-16 rounded-full object-cover"
                          alt={`${consultation.doctorName} profile`}
                         src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{consultation.doctorName}</h3>
                            {getStatusBadge(consultation.status)}
                          </div>
                          
                          <p className="text-teal-600 font-medium mb-2">{consultation.specialization}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(consultation.date).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{consultation.time}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {getConsultationIcon(consultation.type)}
                              <span className="capitalize">{consultation.type} Call</span>
                            </div>
                            
                            {consultation.duration && (
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>{consultation.duration}</span>
                              </div>
                            )}
                          </div>

                          {consultation.symptoms && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Symptoms:</span> {consultation.symptoms}
                              </p>
                              {consultation.diagnosis && (
                                <p className="text-sm text-gray-600">
                                  <span className="font-medium">Diagnosis:</span> {consultation.diagnosis}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-64">
                      {consultation.status === 'upcoming' ? (
                        <Button
                          onClick={() => handleJoinConsultation(consultation.id)}
                          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                        >
                          Join Consultation
                        </Button>
                      ) : (
                        <>
                          {consultation.prescription && (
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleDownloadPrescription(consultation.id)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Prescription
                              </Button>
                              <Button
                                onClick={() => handleAddToCart(consultation.id)}
                                size="sm"
                                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            {consultation.followUpAvailable && (
                              <Button
                                onClick={() => handleFollowUp(consultation.id)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Follow-up
                              </Button>
                            )}
                            
                            {!consultation.rating && consultation.status === 'completed' && (
                              <Button
                                onClick={() => handleRateDoctor(consultation.id)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Star className="w-4 h-4 mr-1" />
                                Rate
                              </Button>
                            )}
                          </div>

                          {consultation.rating && (
                            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                              <span>Your rating:</span>
                              <div className="flex">
                                {[...Array(consultation.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredConsultations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No consultations found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't had any consultations yet" 
                : `No ${filterStatus} consultations found`}
            </p>
            <Button
              onClick={() => navigate('/consult-doctors')}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Book Your First Consultation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationHistory;