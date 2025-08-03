import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Stethoscope, Heart, Baby } from 'lucide-react';

const AmbulanceTypeSelection = ({ ambulanceTypes, selectedAmbulanceType, onSelect }) => {
  const getAmbulanceIcon = (type) => {
    switch (type) {
      case 'Basic Life Support (BLS)': return <Truck className="w-8 h-8" />;
      case 'ICU Ambulance': return <Stethoscope className="w-8 h-8" />;
      case 'Cardiac Ambulance': return <Heart className="w-8 h-8" />;
      case 'Neonatal Ambulance': return <Baby className="w-8 h-8" />;
      default: return <Truck className="w-8 h-8" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ambulanceTypes.map((ambulance) => (
        <motion.div
          key={ambulance.id}
          whileHover={{ scale: 1.02 }}
          onClick={() => onSelect(ambulance)}
          className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
            selectedAmbulanceType?.id === ambulance.id
              ? 'border-teal-500 bg-teal-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl">{getAmbulanceIcon(ambulance.type)}</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">{ambulance.type}</h3>
              <p className="text-gray-600 text-sm mb-2">{ambulance.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-800">₹{ambulance.price}</span>
                <Badge variant="outline" className="text-xs">ETA: {ambulance.eta}</Badge>
              </div>
              <p className="text-gray-500 text-xs">{ambulance.useCase}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AmbulanceTypeSelection;