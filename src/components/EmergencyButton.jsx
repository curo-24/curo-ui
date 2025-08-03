import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bus as Ambulance, Stethoscope, Droplets, Hotel as Hospital, X, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const EmergencyButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmergencyClick = () => {
    setShowMenu(true);
    toast({
      title: "🆘 Emergency Mode Activated",
      description: "Choose your emergency service or wait 60 seconds for auto-dispatch",
      variant: "destructive",
    });
  };

  const handleServiceClick = (service) => {
    setShowMenu(false);
    
    switch (service) {
      case 'ambulance':
        navigate('/ambulance');
        toast({
          title: "🚑 Emergency Ambulance",
          description: "Dispatching nearest ambulance to your location...",
          variant: "destructive",
        });
        break;
      case 'doctor':
        navigate('/consult-doctors');
        toast({
          title: "🧑‍⚕️ Emergency Doctor Call",
          description: "Connecting you to emergency doctor within 60 seconds...",
          variant: "destructive",
        });
        break;
      case 'blood':
        navigate('/blood-bank');
        toast({
          title: "🩸 Emergency Blood Request",
          description: "Finding available blood units near you...",
          variant: "destructive",
        });
        break;
      case 'hospital':
        toast({
          title: "🏥 Nearest Hospitals",
          description: "Showing emergency-capable hospitals near you...",
          variant: "destructive",
        });
        break;
      case 'triage':
        navigate('/emergency-triage');
        break;
    }
  };

  const emergencyServices = [
    {
      id: 'ambulance',
      icon: Ambulance,
      title: 'Book Ambulance',
      description: 'Nearest ambulance dispatch',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'doctor',
      icon: Stethoscope,
      title: 'Call Doctor',
      description: 'Emergency consultation',
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'blood',
      icon: Droplets,
      title: 'Find Blood',
      description: 'Emergency blood request',
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    },
    {
      id: 'hospital',
      icon: Hospital,
      title: 'Nearest Hospitals',
      description: 'Emergency hospitals',
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    }
  ];

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0.7)",
              "0 0 0 20px rgba(239, 68, 68, 0)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full"
        >
          <Button
            onClick={handleEmergencyClick}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 shadow-2xl border-4 border-white"
            size="icon"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <AlertTriangle className="w-8 h-8 text-white" />
            </motion.div>
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Emergency SOS
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-r-4 border-r-red-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Emergency Services</h2>
                    <p className="text-sm text-gray-600">Choose your emergency service</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 text-red-700">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Auto-detected location: Delhi, India</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {emergencyServices.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleServiceClick(service.id)}
                    className={`${service.color} ${service.textColor} p-4 rounded-xl text-left transition-colors`}
                  >
                    <service.icon className="w-8 h-8 mb-2" />
                    <h3 className="font-bold text-sm">{service.title}</h3>
                    <p className="text-xs opacity-90">{service.description}</p>
                  </motion.button>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => handleServiceClick('triage')}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Not sure? Get Help Choosing
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Emergency contacts will be notified automatically
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmergencyButton;