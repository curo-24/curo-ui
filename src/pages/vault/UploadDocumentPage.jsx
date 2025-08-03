import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, UploadCloud, Camera, ShieldCheck, FileUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    }
  });

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const handleUpload = () => {
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No files selected',
        description: 'Please select at least one file to upload.',
      });
      return;
    }
    toast({
      title: 'Uploading...',
      description: `${files.length} file(s) are being uploaded.`,
    });
    setTimeout(() => {
      toast({
        title: '✅ Upload Successful!',
        description: 'Your documents have been added to your vault.',
      });
      navigate('/vault');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Upload Document | Curo24</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vault
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Upload Your Health Records</h1>
          <p className="text-gray-600 mb-8 text-center">Easily add prescriptions, lab reports, and other documents.</p>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-400'}`}>
                <input {...getInputProps()} />
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select'}
                </p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG supported</p>
              </div>
              {files.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">Selected files:</h4>
                  <ul className="mt-2 space-y-2">
                    {files.map(file => (
                      <li key={file.name} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <FileUp className="w-5 h-5 text-gray-500" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button variant="outline" size="lg" onClick={() => toast({ title: 'Camera feature coming soon!' })}>
              <Camera className="w-5 h-5 mr-2" />
              Scan with Camera
            </Button>
            <Button variant="outline" size="lg" onClick={() => toast({ title: 'ABHA Sync feature coming soon!' })}>
              <ShieldCheck className="w-5 h-5 mr-2" />
              Sync with ABHA
            </Button>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white" onClick={handleUpload}>
              Upload {files.length > 0 ? `${files.length} File(s)` : ''}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadDocumentPage;