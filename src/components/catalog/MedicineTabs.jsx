import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import PrescriptionUpload from './PrescriptionUpload';

const MedicineTabs = ({ 
  activeTab, 
  setActiveTab, 
  prescriptionUploaded, 
  handlePrescriptionUpload,
  otcMedicines,
  rxMedicines,
  categories
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-gray-100 border border-gray-200">
        <TabsTrigger 
          value="otc" 
          className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-700"
        >
          🔘 OTC Medicines
        </TabsTrigger>
        <TabsTrigger 
          value="rx" 
          className="data-[state=active]:bg-red-500 data-[state=active]:text-white text-gray-700"
        >
          🔒 Prescription Medicines
        </TabsTrigger>
      </TabsList>

      <TabsContent value="otc" className="space-y-6">
        <motion.div
          key="otc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otcMedicines.map((medicine) => (
              <ProductCard key={medicine.id} medicine={medicine} prescriptionUploaded={prescriptionUploaded} />
            ))}
          </div>
        </motion.div>
      </TabsContent>

      <TabsContent value="rx" className="space-y-6">
        <motion.div
          key="rx"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!prescriptionUploaded && <PrescriptionUpload handlePrescriptionUpload={handlePrescriptionUpload} />}
          
          {prescriptionUploaded && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="text-green-800 font-semibold">Prescription Verified</h3>
                  <p className="text-green-700 text-sm">You can now purchase prescription medicines.</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rxMedicines.map((medicine) => (
              <ProductCard key={medicine.id} medicine={medicine} prescriptionUploaded={prescriptionUploaded} />
            ))}
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
};

export default MedicineTabs;