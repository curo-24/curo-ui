import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar } from 'lucide-react';

const BookingModeSelector = ({ bookingMode, setBookingMode }) => {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        variant={bookingMode === 'emergency' ? 'default' : 'outline'}
        onClick={() => setBookingMode('emergency')}
        className={`px-8 py-3 ${bookingMode === 'emergency' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
      >
        <AlertTriangle className="w-5 h-5 mr-2" />
        Emergency Booking
      </Button>
      <Button
        variant={bookingMode === 'scheduled' ? 'default' : 'outline'}
        onClick={() => setBookingMode('scheduled')}
        className={`px-8 py-3 ${bookingMode === 'scheduled' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}
      >
        <Calendar className="w-5 h-5 mr-2" />
        Scheduled Booking
      </Button>
    </div>
  );
};

export default BookingModeSelector;