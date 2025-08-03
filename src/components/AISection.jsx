import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, BrainCircuit, Repeat, CheckSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AISection = () => {
  const aiFeatures = [
    { icon: CheckSquare, title: "Symptom Checker", description: "Guides you to the right test or doctor consultation based on your symptoms." },
    { icon: Sparkles, title: "Auto-Fill Cart", description: "Automatically adds medicines to your cart from an uploaded prescription." },
    { icon: BrainCircuit, title: "Intelligent Suggestions", description: "Recommends relevant lab test packages based on your health profile." },
    { icon: Repeat, title: "Smart Reminders", description: "Timely medication refill reminders so you never run out of essential meds." },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Powered by an
              <span className="text-teal-600">
                {" "}Intelligent AI
              </span>
              {" "}Layer
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our advanced AI automates and personalizes your healthcare experience,
              making it faster, smarter, and more intuitive.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                >
                  <Card className="h-full bg-white border border-gray-200 hover:border-teal-200 hover:shadow-lg transition-colors">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <feature.icon className="w-8 h-8 mt-1 text-teal-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-96"
          >
            <div className="absolute w-80 h-80 bg-teal-100 rounded-full"></div>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute w-full h-full border-4 border-dashed border-teal-200 rounded-full"
            ></motion.div>
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute w-3/4 h-3/4 border-4 border-dashed border-blue-200 rounded-full"
            ></motion.div>
            <Bot className="relative w-48 h-48 lg:w-64 lg:h-64 text-teal-500" strokeWidth={1} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AISection;