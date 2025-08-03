import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, AlertTriangle, Heart, Thermometer, Zap, Baby, Brain, Droplets, Bone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const EmergencyTriage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const emergencyTypes = [
    {
      id: 'breathing',
      icon: Zap,
      title: 'Breathing Issues',
      description: 'Difficulty breathing, shortness of breath',
      color: 'bg-red-100 text-red-700 border-red-300',
      severity: 'critical'
    },
    {
      id: 'chest-pain',
      icon: Heart,
      title: 'Chest Pain',
      description: 'Heart attack symptoms, chest discomfort',
      color: 'bg-red-100 text-red-700 border-red-300',
      severity: 'critical'
    },
    {
      id: 'unconscious',
      icon: Brain,
      title: 'Unconscious/Fainting',
      description: 'Person is unconscious or fainted',
      color: 'bg-red-100 text-red-700 border-red-300',
      severity: 'critical'
    },
    {
      id: 'accident',
      icon: Bone,
      title: 'Accident/Injury',
      description: 'Road accident, fall, major injury',
      color: 'bg-orange-100 text-orange-700 border-orange-300',
      severity: 'urgent'
    },
    {
      id: 'bleeding',
      icon: Droplets,
      title: 'Heavy Bleeding',
      description: 'Severe bleeding that won\'t stop',
      color: 'bg-red-100 text-red-700 border-red-300',
      severity: 'critical'
    },
    {
      id: 'stroke',
      icon: Brain,
      title: 'Stroke Symptoms',
      description: 'Face drooping, speech problems, weakness',
      color: 'bg-red-100 text-red-700 border-red-300',
      severity: 'critical'
    },
    {
      id: 'fever',
      icon: Thermometer,
      title: 'High Fever',
      description: 'Very high temperature, severe illness',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      severity: 'moderate'
    },
    {
      id: 'pregnancy',
      icon: Baby,
      title: 'Pregnancy Emergency',
      description: 'Labor, pregnancy complications',
      color: 'bg-pink-100 text-pink-700 border-pink-300',
      severity: 'urgent'
    }
  ];

  const getRecommendation = (symptomId) => {
    const recommendations = {
      'breathing': {
        service: 'ambulance',
        title: 'Call Emergency Ambulance',
        description: 'Breathing issues require immediate medical attention. An ICU ambulance with oxygen support is being dispatched.',
        actions: ['Call Ambulance', 'Emergency Doctor Call'],
        urgency: 'critical'
      },
      'chest-pain': {
        service: 'ambulance',
        title: 'Call Cardiac Ambulance',
        description: 'Chest pain could indicate a heart attack. A cardiac ambulance with ECG and defibrillator is recommended.',
        actions: ['Cardiac Ambulance', 'Emergency Doctor Call'],
        urgency: 'critical'
      },
      'unconscious': {
        service: 'ambulance',
        title: 'Call Emergency Ambulance',
        description: 'Unconscious person needs immediate medical attention. Ambulance with paramedic support is being dispatched.',
        actions: ['Call Ambulance', 'Notify Contacts'],
        urgency: 'critical'
      },
      'accident': {
        service: 'ambulance',
        title: 'Call Trauma Ambulance',
        description: 'Accident victims need specialized trauma care. Ambulance with trauma equipment is recommended.',
        actions: ['Call Ambulance', 'Find Hospital'],
        urgency: 'urgent'
      },
      'bleeding': {
        service: 'ambulance',
        title: 'Call Emergency Ambulance',
        description: 'Heavy bleeding requires immediate medical intervention. Ambulance with blood loss management equipment.',
        actions: ['Call Ambulance', 'Find Blood Bank'],
        urgency: 'critical'
      },
      'stroke': {
        service: 'ambulance',
        title: 'Call Stroke Ambulance',
        description: 'Stroke symptoms require immediate hospital care. Time is critical for stroke treatment.',
        actions: ['Call Ambulance', 'Find Hospital'],
        urgency: 'critical'
      },
      'fever': {
        service: 'doctor',
        title: 'Consult Emergency Doctor',
        description: 'High fever needs medical evaluation. Start with doctor consultation, ambulance if needed.',
        actions: ['Emergency Doctor Call', 'Monitor Symptoms'],
        urgency: 'moderate'
      },
      'pregnancy': {
        service: 'ambulance',
        title: 'Call Maternity Ambulance',
        description: 'Pregnancy emergencies need specialized care. Ambulance with neonatal equipment is recommended.',
        actions: ['Call Ambulance', 'Find Hospital'],
        urgency: 'urgent'
      }
    };

    return recommendations[symptomId];
  };

  const handleSymptomSelect = (symptomId) => {
    const rec = getRecommendation(symptomId);
    setRecommendation(rec);
    setCurrentStep(1);
  };

  const handleServiceAction = (action) => {
    switch (action) {
      case 'Call Ambulance':
      case 'Cardiac Ambulance':
      case 'Trauma Ambulance':
      case 'Stroke Ambulance':
      case 'Maternity Ambulance':
        navigate('/ambulance');
        toast({
          title: "🚑 Emergency Ambulance Dispatched",
          description: "Ambulance is being dispatched to your location",
          variant: "destructive",
        });
        break;
      case 'Emergency Doctor Call':
        navigate('/consult-doctors');
        toast({
          title: "🧑‍⚕️ Connecting to Emergency Doctor",
          description: "Emergency doctor will connect within 60 seconds",
          variant: "destructive",
        });
        break;
      case 'Find Hospital':
        navigate('/emergency');
        break;
      case 'Find Blood Bank':
        navigate('/blood-bank');
        break;
      default:
        toast({
          title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500';
      case 'urgent': return 'bg-orange-500';
      case 'moderate': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Emergency Triage Helper | Curo24</title>
        <meta name="description" content="Get help choosing the right emergency service based on your symptoms and situation." />
      </Helmet>

      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-red-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Emergency Hub
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">Emergency Triage Helper</h1>
              <p className="text-xl text-gray-600">Get help choosing the right emergency service</p>
            </div>
          </div>
        </motion.div>

        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white border border-gray-200 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-800 text-center">What is the emergency?</CardTitle>
                <p className="text-gray-600 text-center">Select the option that best describes the situation</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emergencyTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSymptomSelect(type.id)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${type.color} hover:shadow-lg`}
                    >
                      <div className="flex items-start space-x-3">
                        <type.icon className="w-8 h-8 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{type.title}</h3>
                          <p className="text-sm opacity-80">{type.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(type.severity)} text-white font-medium`}>
                              {type.severity.toUpperCase()}
                            </span>
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Can't find your emergency? Call our emergency helpline directly.
              </p>
              <Button
                onClick={() => toast({ title: "📞 Emergency Helpline", description: "Connecting to 24/7 emergency support..." })}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Call Emergency Helpline
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="text-center">
                  <div className={`w-16 h-16 ${getUrgencyColor(recommendation.urgency)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-gray-800 text-2xl">{recommendation.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{recommendation.description}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-bold text-red-800 mb-2">Recommended Actions:</h4>
                  <div className="space-y-2">
                    {recommendation.actions.map((action, index) => (
                      <Button
                        key={index}
                        onClick={() => handleServiceAction(action)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <Button
                    onClick={() => setCurrentStep(0)}
                    variant="outline"
                    className="w-full"
                  >
                    Choose Different Emergency
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    Your emergency contacts will be automatically notified when you book any service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmergencyTriage;