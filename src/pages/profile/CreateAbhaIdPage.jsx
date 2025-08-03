import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Fingerprint, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const CreateAbhaIdPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { icon: Fingerprint, title: 'Verify with Aadhaar', description: 'Use your Aadhaar number for e-KYC verification.' },
    { icon: FileText, title: 'Choose ABHA Handle', description: 'Select a unique and easy-to-remember ABHA ID.' },
    { icon: Shield, title: 'Link & Secure', description: 'Your ABHA ID is created and securely linked to your profile.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Create ABHA ID - Curo24</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Create Your ABHA ID in Minutes</h1>
          <p className="text-lg text-gray-600 mb-8">Join India's digital health ecosystem with your unique Ayushman Bharat Health Account.</p>

          <div className="space-y-6 text-left">
            {steps.map((step, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            size="lg" 
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => toast({ title: 'Redirecting to ABHA portal...' })}
          >
            Start ABHA Creation
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAbhaIdPage;