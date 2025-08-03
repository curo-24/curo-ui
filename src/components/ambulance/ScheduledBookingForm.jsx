import React from 'react';
import { Input } from '@/components/ui/input';

const ScheduledBookingForm = ({ bookingDetails, setBookingDetails }) => {
  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ];
  
  const handleChange = (e) => {
    setBookingDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
          <Input type="text" name="patientName" placeholder="Enter patient name" value={bookingDetails.patientName} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age</label>
          <Input type="number" name="patientAge" placeholder="Enter age" value={bookingDetails.patientAge} onChange={handleChange} className="w-full" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
        <Input type="text" name="pickupLocation" placeholder="Enter pickup address" value={bookingDetails.pickupLocation} onChange={handleChange} className="w-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date *</label>
          <Input type="date" name="scheduledDate" value={bookingDetails.scheduledDate} onChange={handleChange} className="w-full" min={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time *</label>
          <select name="scheduledTime" value={bookingDetails.scheduledTime} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">Select time</option>
            {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
        <Input type="tel" name="emergencyContact" placeholder="Enter emergency contact number" value={bookingDetails.emergencyContact} onChange={handleChange} className="w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition (Optional)</label>
        <textarea name="medicalCondition" placeholder="Describe patient's condition or special requirements" value={bookingDetails.medicalCondition} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" rows={3} />
      </div>
    </div>
  );
};

export default ScheduledBookingForm;