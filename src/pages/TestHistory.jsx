import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Clock, TestTube, Download, Star, RefreshCw, Plus, Filter, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const TestHistory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const testHistory = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      labPartner: "Thyrocare",
      bookedDate: "2024-01-15",
      collectionDate: "2024-01-16",
      collectionTime: "8:00 AM",
      collectionType: "home",
      status: "completed",
      reportReady: true,
      price: 299,
      technicianName: "Rajesh Kumar",
      rating: 5,
      reportUrl: "#",
      canReorder: true
    },
    {
      id: 2,
      testName: "Thyroid Profile (T3, T4, TSH)",
      labPartner: "Lal PathLabs",
      bookedDate: "2024-01-10",
      collectionDate: "2024-01-11",
      collectionTime: "9:30 AM",
      collectionType: "lab",
      status: "completed",
      reportReady: true,
      price: 599,
      technicianName: null,
      rating: 4,
      reportUrl: "#",
      canReorder: true
    },
    {
      id: 3,
      testName: "HbA1c (Glycated Hemoglobin)",
      labPartner: "SRL Diagnostics",
      bookedDate: "2024-01-20",
      collectionDate: "2024-01-21",
      collectionTime: "7:30 AM",
      collectionType: "home",
      status: "sample-collected",
      reportReady: false,
      price: 399,
      technicianName: "Priya Sharma",
      rating: null,
      reportUrl: null,
      canReorder: false
    },
    {
      id: 4,
      testName: "Full Body Checkup",
      labPartner: "Thyrocare",
      bookedDate: "2024-01-22",
      collectionDate: "2024-01-23",
      collectionTime: "8:30 AM",
      collectionType: "home",
      status: "scheduled",
      reportReady: false,
      price: 2499,
      technicianName: "Amit Patel",
      rating: null,
      reportUrl: null,
      canReorder: false
    },
    {
      id: 5,
      testName: "Vitamin D3 (25-OH)",
      labPartner: "Metropolis",
      bookedDate: "2024-01-05",
      collectionDate: "2024-01-06",
      collectionTime: "10:00 AM",
      collectionType: "lab",
      status: "completed",
      reportReady: true,
      price: 899,
      technicianName: null,
      rating: 5,
      reportUrl: "#",
      canReorder: true
    }
  ];

  const filteredTests = testHistory.filter(test => {
    if (filterStatus === 'all') return true;
    return test.status === filterStatus;
  });

  const handleDownloadReport = (testId, testName) => {
    toast({
      title: "📄 Downloading Report",
      description: `${testName} report is being downloaded...`,
    });
  };

  const handleRateTest = (testId) => {
    toast({
      title: "⭐ Rate Test Experience",
      description: "Rating feature will open...",
    });
  };

  const handleReorderTest = (testId, testName) => {
    toast({
      title: "🔄 Reordering Test",
      description: `Reordering ${testName}...`,
    });
  };

  const handleTrackSample = (testId) => {
    toast({
      title: "📍 Tracking Sample",
      description: "Opening sample tracking details...",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case 'sample-collected':
        return <Badge className="bg-blue-100 text-blue-700">Processing</Badge>;
      case 'scheduled':
        return <Badge className="bg-yellow-100 text-yellow-700">Scheduled</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCollectionIcon = (type) => {
    return type === 'home' ? <Home className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Test History | Curo24</title>
        <meta name="description" content="View your lab test history, download reports, and track sample collection status." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Test History</h1>
              <p className="text-gray-600">View your past and upcoming lab tests</p>
            </div>
            <Button
              onClick={() => navigate('/lab-tests')}
              className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Book New Test
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'scheduled' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('scheduled')}
                size="sm"
              >
                Scheduled
              </Button>
              <Button
                variant={filterStatus === 'sample-collected' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('sample-collected')}
                size="sm"
              >
                Processing
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('completed')}
                size="sm"
              >
                Completed
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                          <TestTube className="w-8 h-8 text-purple-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{test.testName}</h3>
                            {getStatusBadge(test.status)}
                          </div>
                          
                          <p className="text-teal-600 font-medium mb-2">{test.labPartner}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>Booked: {new Date(test.bookedDate).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Collection: {new Date(test.collectionDate).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short' 
                              })} at {test.collectionTime}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {getCollectionIcon(test.collectionType)}
                              <span className="capitalize">{test.collectionType === 'home' ? 'Home Collection' : 'Lab Visit'}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">₹{test.price}</span>
                            </div>
                          </div>

                          {test.technicianName && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Technician:</span> {test.technicianName}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-64">
                      {test.status === 'scheduled' ? (
                        <Button
                          onClick={() => handleTrackSample(test.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Track Sample Collection
                        </Button>
                      ) : test.status === 'sample-collected' ? (
                        <Button
                          onClick={() => handleTrackSample(test.id)}
                          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          Track Processing
                        </Button>
                      ) : (
                        <>
                          {test.reportReady && (
                            <Button
                              onClick={() => handleDownloadReport(test.id, test.testName)}
                              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                            </Button>
                          )}
                          
                          <div className="flex space-x-2">
                            {test.canReorder && (
                              <Button
                                onClick={() => handleReorderTest(test.id, test.testName)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Reorder
                              </Button>
                            )}
                            
                            {!test.rating && test.status === 'completed' && (
                              <Button
                                onClick={() => handleRateTest(test.id)}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Star className="w-4 h-4 mr-1" />
                                Rate
                              </Button>
                            )}
                          </div>

                          {test.rating && (
                            <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                              <span>Your rating:</span>
                              <div className="flex">
                                {[...Array(test.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🧪</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tests found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't booked any tests yet" 
                : `No ${filterStatus.replace('-', ' ')} tests found`}
            </p>
            <Button
              onClick={() => navigate('/lab-tests')}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Book Your First Test
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestHistory;