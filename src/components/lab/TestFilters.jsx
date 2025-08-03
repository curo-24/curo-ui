import React from 'react';
import { motion } from 'framer-motion';

const TestFilters = ({ filters, setFilters, testCategories, healthConditions, labPartners }) => {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-white rounded-lg border border-gray-200 p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select name="category" value={filters.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">All Categories</option>
            {testCategories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Health Condition</label>
          <select name="condition" value={filters.condition} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">All Conditions</option>
            {healthConditions.map(condition => <option key={condition} value={condition}>{condition}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lab Partner</label>
          <select name="lab" value={filters.lab} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">All Labs</option>
            {labPartners.map(lab => <option key={lab.name} value={lab.name}>{lab.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <select name="price" value={filters.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">Any Price</option>
            <option value="under-500">Under ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="above-1000">Above ₹1000</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fasting Required</label>
          <select name="fasting" value={filters.fasting} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">Any</option>
            <option value="not-required">No Fasting Required</option>
            <option value="required">Fasting Required</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Collection Type</label>
          <select name="homeCollection" value={filters.homeCollection} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500">
            <option value="">Any</option>
            <option value="true">Home Collection Available</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default TestFilters;