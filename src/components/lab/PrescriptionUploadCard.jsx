import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

const PrescriptionUploadCard = ({ onUpload }) => {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Upload className="w-6 h-6 text-purple-500" />
          <div>
            <h3 className="font-semibold text-purple-800">Have a prescription?</h3>
            <p className="text-purple-600 text-sm">Upload it and our AI will suggest required tests</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
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
                <p className="text-gray-700 mb-2">Drag and drop your prescription here</p>
                <p className="text-gray-500 text-sm mb-4">or click to browse</p>
                <Button 
                  onClick={onUpload}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Choose File
                </Button>
              </div>
              <p className="text-gray-500 text-xs text-center">
                Supported formats: JPG, PNG, PDF. Our AI will analyze and suggest required tests.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PrescriptionUploadCard;