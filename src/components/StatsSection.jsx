import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Star, Shield } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "2M+",
      label: "Happy Customers",
    },
    {
      icon: Clock,
      number: "15min",
      label: "Average Delivery",
    },
    {
      icon: Star,
      number: "4.8★",
      label: "Customer Rating",
    },
    {
      icon: Shield,
      number: "100%",
      label: "Authentic Medicines",
    }
  ];

  return (
    <section className="py-20 bg-teal-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Millions
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join millions of satisfied customers who trust us with their healthcare needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
              >
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              
              <p className="text-teal-100 text-lg font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;