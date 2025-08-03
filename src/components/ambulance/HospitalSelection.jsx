import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star } from 'lucide-react';

const HospitalSelection = ({ hospitals, selectedHospital, onSelect }) => {
  return (
    <div className="space-y-4">
      {hospitals.map((hospital) => (
        <motion.div
          key={hospital.id}
          whileHover={{ scale: 1.01 }}
          onClick={() => onSelect(hospital)}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
            selectedHospital?.id === hospital.id
              ? 'border-teal-500 bg-teal-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">{hospital.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{hospital.address}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{hospital.distance}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>ETA: {hospital.eta}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{hospital.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex flex-wrap gap-1 justify-end">
                {hospital.specialties.slice(0, 2).map(specialty => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HospitalSelection;