import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Shield, Upload, Link, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const LinkInsurancePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLinkSuccess = () => {
    toast({
      title: "✅ Policy Linked Successfully!",
      description: "Your health insurance policy has been added to your dashboard.",
    });
    navigate('/insurance');
  };

  const linkOptions = [
    {
      icon: Shield,
      title: 'Link via Provider',
      description: 'Login with your insurance provider to fetch policy details automatically.',
      color: 'text-blue-500',
      dialogContent: (
        <div className="space-y-4">
          <Input placeholder="Enter Policy Number" />
          <Input placeholder="Enter Registered Mobile Number" />
          <Button onClick={handleLinkSuccess} className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send OTP</Button>
        </div>
      )
    },
    {
      icon: Fingerprint,
      title: 'Link via ABHA',
      description: 'Use your Ayushman Bharat Health Account (ABHA) to link your policy.',
      color: 'text-green-500',
      dialogContent: (
        <div className="space-y-4">
          <Input placeholder="Enter Your ABHA ID" />
          <Button onClick={handleLinkSuccess} className="w-full bg-green-600 hover:bg-green-700 text-white">Authenticate with ABHA</Button>
        </div>
      )
    },
    {
      icon: Upload,
      title: 'Upload Manually',
      description: 'Upload a PDF or photo of your policy document for manual verification.',
      color: 'text-orange-500',
      dialogContent: (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 mb-2">Drag and drop your policy document</p>
            <p className="text-gray-500 text-sm mb-4">or click to browse</p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Choose File</Button>
          </div>
          <Button onClick={handleLinkSuccess} className="w-full">Submit for Verification</Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Link Health Insurance Policy | Curo24</title>
        <meta name="description" content="Link your health insurance policy via provider, ABHA, or manual upload." />
      </Helmet>
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">Link Your Health Insurance</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose your preferred method to link your policy and unlock benefits.</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {linkOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="text-center p-6 h-full cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-indigo-300">
                    <option.icon className={`w-12 h-12 mx-auto mb-4 ${option.color}`} />
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-white border border-gray-200 text-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-800">{option.title}</DialogTitle>
                  </DialogHeader>
                  {option.dialogContent}
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkInsurancePage;