import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { healthRecordsData } from '@/data/healthRecords';
import { useToast } from '@/components/ui/use-toast';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const record = healthRecordsData.find(r => r.id === id);

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Document not found.</p>
        <Button onClick={() => navigate('/vault')}>Go back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>{record.title} | Curo24 Health Vault</title>
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
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-gray-100 p-3 rounded-full">{record.icon}</div>
                    <div>
                      <CardTitle className="text-2xl">{record.title}</CardTitle>
                      <CardDescription>{record.type} from {record.source} on {record.date}</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => toast({ title: 'Sharing...' })}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toast({ title: 'Downloading...' })}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toast({ title: 'Printing...' })}>
                    <Printer className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white min-h-[600px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium">Document Viewer Placeholder</p>
                  <p>This is where the content of "{record.title}" would be displayed.</p>
                  <img  class="w-full max-w-md mx-auto mt-4 rounded-lg shadow-md" alt="A sample medical document showing charts and text" src="https://images.unsplash.com/photo-1600445763631-ef184dc247b8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;