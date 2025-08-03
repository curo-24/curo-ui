import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, KeyRound, ScanSearch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All communication and data are fully encrypted, ensuring your information remains private and secure.",
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance",
      description: "We adhere to the highest standards, including HIPAA, GDPR, and India's NDHM, to protect your data.",
    },
    {
      icon: KeyRound,
      title: "Consent-Based Access",
      description: "Your ABHA data is accessed only with your explicit consent, giving you full control over your information.",
    },
    {
      icon: ScanSearch,
      title: "Fraud Detection",
      description: "Real-time checks and validation for prescriptions and user identity to prevent fraud and ensure safety.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            <span className="text-teal-600">
              Security
            </span>
            {" "}You Can Trust
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your privacy and security are our top priorities. We employ state-of-the-art technology
            to protect your sensitive health information.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="h-full bg-white border border-gray-200 shadow-md hover:shadow-teal-500/20 hover:border-teal-200 transition-all duration-300">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-4"
                  >
                    <feature.icon className="w-8 h-8 text-teal-600" />
                  </motion.div>
                  <CardTitle className="text-gray-800 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;