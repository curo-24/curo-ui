import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Upload, Search, FileText, TestTube, Hotel as Hospital, HeartPulse, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { healthRecordsData } from '@/data/healthRecords';
import { useToast } from '@/components/ui/use-toast';

const HealthVaultPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredRecords = useMemo(() => {
    return healthRecordsData
      .filter(record => {
        if (activeTab === 'all') return true;
        return record.type.toLowerCase().replace(' ', '-') === activeTab;
      })
      .filter(record =>
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [searchTerm, activeTab]);

  const handleShare = (title) => {
    toast({
      title: 'Sharing Record',
      description: `A secure link for "${title}" has been generated.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Health Records Vault | Curo24</title>
        <meta name="description" content="Securely store, manage, and share all your health documents in one place." />
      </Helmet>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Health Records Vault</h1>
              <p className="text-gray-600">Your secure digital hub for all health documents.</p>
            </div>
            <Button onClick={() => navigate('/vault/upload')} className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by title, source, or tag..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
              <TabsTrigger value="lab-report">Lab Reports</TabsTrigger>
              <TabsTrigger value="discharge-summary">Summaries</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => navigate(`/vault/${record.id}`)}
                className="cursor-pointer"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gray-100 p-2 rounded-full">{record.icon}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">{record.type}</p>
                          <h3 className="text-lg font-bold text-gray-800">{record.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm text-gray-600">From: <span className="font-medium">{record.source}</span></p>
                      <p className="text-sm text-gray-600">Date: <span className="font-medium">{record.date}</span></p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleShare(record.title); }}>
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toast({ title: `Downloading ${record.title}` }); }}>
                        <Download className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-16">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HealthVaultPage;