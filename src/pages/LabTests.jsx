import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { labTests, labPartners, testCategories, healthConditions } from '@/data/labTests';
import TestFilters from '@/components/lab/TestFilters';
import PrescriptionUploadCard from '@/components/lab/PrescriptionUploadCard';
import HealthPackagesSection from '@/components/lab/HealthPackagesSection';
import TestGrid from '@/components/lab/TestGrid';

const LabTests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
    lab: '',
    price: '',
    fasting: '',
    homeCollection: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    toast({
      title: "🔍 Searching Lab Tests",
      description: `Finding tests for "${searchQuery}"...`,
    });
  };

  const handleTestClick = (testId) => navigate(`/test/${testId}`);
  const handleBookTest = (testId, testName) => toast({ title: "🧪 Booking Test", description: `Proceeding to book ${testName}...` });
  const handleUploadPrescription = () => toast({ title: "📋 Upload Prescription", description: "AI will analyze your prescription and suggest required tests..." });

  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.conditions.some(condition => condition.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !filters.category || test.category === filters.category;
    const matchesCondition = !filters.condition || test.conditions.includes(filters.condition);
    const matchesLab = !filters.lab || test.labPartner === filters.lab;
    const matchesPrice = !filters.price || 
                        (filters.price === 'under-500' && test.price < 500) ||
                        (filters.price === '500-1000' && test.price >= 500 && test.price <= 1000) ||
                        (filters.price === 'above-1000' && test.price > 1000);
    const matchesFasting = !filters.fasting || 
                          (filters.fasting === 'required' && test.fastingRequired) ||
                          (filters.fasting === 'not-required' && !test.fastingRequired);
    const matchesHomeCollection = !filters.homeCollection || test.homeCollection;
    
    return matchesSearch && matchesCategory && matchesCondition && matchesLab && matchesPrice && matchesFasting && matchesHomeCollection;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Book Lab Tests Online - Home Collection | Curo24</title>
        <meta name="description" content="Book lab tests online with home sample collection. Get digital reports from NABL accredited labs." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Book Lab Tests Online</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get tests done from NABL accredited labs with home collection and digital reports.</p>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-4 focus-within:border-teal-500 shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input type="text" placeholder="Search by test name, condition, or symptoms" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent" />
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 text-gray-600 hover:text-teal-600"><Filter className="w-4 h-4" /><span>Filters</span><ChevronDown className="w-4 h-4" /></Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3"><Search className="w-4 h-4" /></Button>
              </div>
            </form>
          </div>

          {showFilters && <TestFilters filters={filters} setFilters={setFilters} testCategories={testCategories} healthConditions={healthConditions} labPartners={labPartners} />}
          
          <PrescriptionUploadCard onUpload={handleUploadPrescription} />
        </div>

        <HealthPackagesSection packages={filteredTests.filter(test => test.category === 'Health Packages')} onTestClick={handleTestClick} onBookTest={handleBookTest} />

        <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-12">All Tests</h2>
        <TestGrid tests={filteredTests.filter(test => test.category !== 'Health Packages')} onTestClick={handleTestClick} onBookTest={handleBookTest} />

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tests found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabTests;