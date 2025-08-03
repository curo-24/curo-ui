import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { medicalStaff } from '@/data/ambulances';
import { User, Star, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';

const BookingSummary = ({ selectedAmbulanceType, selectedHospital, bookingDetails, bookingMode, onSubmit }) => {
  return (
    <div className="space-y-4">
      {selectedAmbulanceType ? (
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Selected Ambulance</h4>
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{selectedAmbulanceType.icon}</div>
            <div>
              <p className="font-medium text-gray-800">{selectedAmbulanceType.type}</p>
              <p className="text-sm text-gray-600">ETA: {selectedAmbulanceType.eta}</p>
              <p className="text-lg font-bold text-gray-800">₹{selectedAmbulanceType.price}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          Select an ambulance type
        </div>
      )}

      {selectedHospital && (
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Destination Hospital</h4>
          <div>
            <p className="font-medium text-gray-800">{selectedHospital.name}</p>
            <p className="text-sm text-gray-600">{selectedHospital.address}</p>
            <p className="text-sm text-gray-600">Distance: {selectedHospital.distance}</p>
          </div>
        </div>
      )}

      {bookingMode === 'scheduled' && bookingDetails.scheduledDate && bookingDetails.scheduledTime && (
        <div className="border-b border-gray-200 pb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Scheduled Time</h4>
          <p className="text-gray-700">{new Date(bookingDetails.scheduledDate).toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p className="text-gray-700">at {bookingDetails.scheduledTime}</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /><span>Verified medical staff</span></div>
        <div className="flex items-center space-x-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /><span>Real-time GPS tracking</span></div>
        <div className="flex items-center space-x-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /><span>Direct hospital communication</span></div>
        <div className="flex items-center space-x-2 text-sm text-gray-600"><CheckCircle className="w-4 h-4 text-green-500" /><span>24/7 emergency support</span></div>
      </div>

      <Button
        onClick={onSubmit}
        className={`w-full py-3 text-white ${bookingMode === 'emergency' ? 'bg-red-600 hover:bg-red-700' : 'bg-teal-600 hover:bg-teal-700'}`}
        disabled={!selectedAmbulanceType || !selectedHospital}
      >
        {bookingMode === 'emergency' ? (
          <><AlertTriangle className="w-5 h-5 mr-2" />Book Emergency Ambulance</>
        ) : (
          <><Calendar className="w-5 h-5 mr-2" />Schedule Ambulance</>
        )}
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <User className="w-4 h-4 mr-2" />
            View Medical Staff
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white border border-gray-200 text-gray-800 max-w-2xl">
          <DialogHeader><DialogTitle className="text-gray-800">Available Medical Staff</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {medicalStaff.map((staff) => (
              <div key={staff.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <img className="w-16 h-16 rounded-full object-cover" alt={staff.profileImage} src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{staff.name}</h3>
                  <p className="text-teal-600 font-medium">{staff.role}</p>
                  <p className="text-gray-600 text-sm">{staff.experience} experience</p>
                  <div className="flex items-center space-x-1 mt-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span className="text-sm font-semibold">{staff.rating}</span></div>
                  <div className="flex flex-wrap gap-1 mt-2">{staff.certifications.slice(0, 2).map(cert => <Badge key={cert} variant="secondary" className="text-xs">{cert}</Badge>)}</div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingSummary;