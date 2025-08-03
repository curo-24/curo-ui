import React from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const PrescriptionUpload = ({ handlePrescriptionUpload }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6"
  >
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0" />
        <div>
          <h3 className="text-orange-800 font-semibold text-lg">Prescription Required</h3>
          <p className="text-orange-700">Upload a valid doctor's prescription to access these medicines.</p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">
            <Upload className="w-4 h-4 mr-2" />
            Upload Prescription
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white border border-gray-200 text-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-800">Upload Your Prescription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 mb-2">Drag and drop your file here</p>
              <p className="text-gray-500 text-sm mb-4">or click to browse</p>
              <Button 
                onClick={handlePrescriptionUpload}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Choose File
              </Button>
            </div>
            <p className="text-gray-500 text-xs text-center">
              Supported formats: JPG, PNG, PDF. Max file size: 10MB. Our AI will scan your prescription for authenticity.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </motion.div>
);

export default PrescriptionUpload;