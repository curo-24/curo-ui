import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MapPin, Clock, Phone, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ambulanceTypes, hospitals } from '@/data/ambulances';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookingModeSelector from '@/components/ambulance/BookingModeSelector';
import AmbulanceTypeSelection from '@/components/ambulance/AmbulanceTypeSelection';
import HospitalSelection from '@/components/ambulance/HospitalSelection';
import ScheduledBookingForm from '@/components/ambulance/ScheduledBookingForm';
import BookingSummary from '@/components/ambulance/BookingSummary';

const AmbulanceBooking = () => {
  const [bookingMode, setBookingMode] = useState('emergency');
  const [selectedAmbulanceType, setSelectedAmbulanceType] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    patientName: '',
    patientAge: '',
    pickupLocation: '',
    scheduledDate: '',
    scheduledTime: '',
    emergencyContact: '',
    medicalCondition: '',
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!selectedAmbulanceType || !selectedHospital) {
      toast({
        variant: "destructive",
        title: "Missing Selections",
        description: "Please select an ambulance type and a hospital.",
      });
      return;
    }

    if (bookingMode === 'scheduled' && (!bookingDetails.scheduledDate || !bookingDetails.scheduledTime || !bookingDetails.patientName)) {
      toast({
        variant: "destructive",
        title: "Please fill all required fields",
        description: "Patient name, date, and time are required for scheduled booking.",
      });
      return;
    }

    const bookingId = Math.random().toString(36).substr(2, 9);
    const successTitle = bookingMode === 'emergency' ? "🚨 Emergency Ambulance Dispatched!" : "📅 Ambulance Scheduled Successfully!";
    const successDescription = bookingMode === 'emergency' 
      ? `${selectedAmbulanceType.type} is on the way. ETA: ${selectedAmbulanceType.eta}`
      : `${selectedAmbulanceType.type} booked for ${bookingDetails.scheduledDate} at ${bookingDetails.scheduledTime}`;

    toast({ title: successTitle, description: successDescription });
    setTimeout(() => navigate(`/ambulance-tracking/${bookingId}`), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Book Ambulance - Emergency & Scheduled | Curo24</title>
        <meta name="description" content="Book ambulance services for emergency or scheduled transfers. GPS tracking, verified drivers, and medical staff available 24/7." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Book Ambulance Service</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Emergency or scheduled booking with real-time tracking and verified medical staff.</p>
        </motion.div>

        <div className="mb-8">
          <BookingModeSelector bookingMode={bookingMode} setBookingMode={setBookingMode} />
        </div>

        {bookingMode === 'emergency' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-xl font-bold text-red-800">Emergency Mode Active</h3>
                <p className="text-red-600">Your location will be auto-detected. Ambulance will be dispatched immediately.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-red-500" /><span className="text-red-700">Auto-location detection</span></div>
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-red-500" /><span className="text-red-700">Driver calls within 30 seconds</span></div>
              <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-red-500" /><span className="text-red-700">Fastest available ambulance</span></div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader><CardTitle className="text-gray-800">1. Select Ambulance Type</CardTitle></CardHeader>
              <CardContent>
                <AmbulanceTypeSelection ambulanceTypes={ambulanceTypes} selectedAmbulanceType={selectedAmbulanceType} onSelect={setSelectedAmbulanceType} />
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader><CardTitle className="text-gray-800">2. Select Destination Hospital</CardTitle></CardHeader>
              <CardContent>
                <HospitalSelection hospitals={hospitals} selectedHospital={selectedHospital} onSelect={setSelectedHospital} />
              </CardContent>
            </Card>

            {bookingMode === 'scheduled' && (
              <Card className="bg-white border border-gray-200">
                <CardHeader><CardTitle className="text-gray-800">3. Patient & Booking Details</CardTitle></CardHeader>
                <CardContent>
                  <ScheduledBookingForm bookingDetails={bookingDetails} setBookingDetails={setBookingDetails} />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 sticky top-8">
              <CardHeader><CardTitle className="text-gray-800">Booking Summary</CardTitle></CardHeader>
              <CardContent>
                <BookingSummary 
                  selectedAmbulanceType={selectedAmbulanceType} 
                  selectedHospital={selectedHospital}
                  bookingDetails={bookingDetails}
                  bookingMode={bookingMode}
                  onSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceBooking;