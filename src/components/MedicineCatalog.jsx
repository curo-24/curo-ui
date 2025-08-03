import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useToast } from '@/components/ui/use-toast';
import { otcMedicines, rxMedicines, categories } from '@/data/medicines';

import SearchBar from '@/components/catalog/SearchBar';
import MedicineTabs from '@/components/catalog/MedicineTabs';
import ShopByCategory from '@/components/catalog/ShopByCategory';
import ShopByManufacturer from '@/components/catalog/ShopByManufacturer';

const MedicineCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('otc');
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const { toast } = useToast();

  const handlePrescriptionUpload = () => {
    setPrescriptionUploaded(true);
    toast({
      title: "✅ Prescription Uploaded Successfully",
      description: "Our AI is verifying it. You can now access prescription medicines.",
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: "🔍 Searching...",
      description: `Looking for "${searchQuery}"`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Order Medicines Online - 15-Min Delivery | Curo24</title>
        <meta name="description" content="Browse and order medicines online with 15-minute delivery. OTC medicines and prescription drugs available with verified prescriptions." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Order Medicine Online
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fastest delivery of your health needs.
          </p>
        </motion.div>

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          onUpload={handlePrescriptionUpload}
        />

        <ShopByCategory />

        <ShopByManufacturer />

        <MedicineTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          prescriptionUploaded={prescriptionUploaded}
          handlePrescriptionUpload={handlePrescriptionUpload}
          otcMedicines={otcMedicines}
          rxMedicines={rxMedicines}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default MedicineCatalog;