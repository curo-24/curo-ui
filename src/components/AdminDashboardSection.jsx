import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BarChart3, ShieldAlert, FileText, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboardSection = () => {
    const { toast } = useToast();

    const handleLearnMore = () => {
        toast({
            title: "🚧 This feature is for internal use only.",
            description: "You can request more details about partner dashboards in the next prompt!",
        });
    };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card className="border-gray-200 p-2 rounded-2xl shadow-lg bg-white">
              <img 
                className="w-full h-auto rounded-xl shadow-md"
                alt="Admin dashboard interface showing charts and key metrics"
               src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
            </Card>
             <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -right-8"
            >
              <Card className="bg-white border border-gray-200 p-4 rounded-lg shadow-xl">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-gray-800 font-bold text-xl">+15.7%</p>
                    <p className="text-gray-600 text-sm">Revenue Growth</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-teal-600 font-semibold mb-2 block">For Founders & Management</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              360° View of Your Operations
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our powerful admin dashboard gives you a live view of all orders, services, and key business metrics.
              Monitor network health, resolve issues, and track revenue in real-time.
            </p>
            <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                    <LayoutDashboard className="w-6 h-6 text-teal-600" />
                    <span className="text-gray-700 text-lg">Live view of all orders and services</span>
                </div>
                <div className="flex items-center space-x-3">
                    <ShieldAlert className="w-6 h-6 text-teal-600" />
                    <span className="text-gray-700 text-lg">Inventory & partner network health</span>
                </div>
                <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-teal-600" />
                    <span className="text-gray-700 text-lg">Business reports and revenue tracking</span>
                </div>
            </div>
             <Button
                onClick={handleLearnMore}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg"
             >
                Learn More
             </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardSection;