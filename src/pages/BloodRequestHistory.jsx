import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Calendar, Droplets, Hotel as Hospital, Filter, Plus, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { bloodRequestHistory } from '@/data/bloodBanks';

const BloodRequestHistoryPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredHistory = bloodRequestHistory.filter(request => {
    if (filterStatus === 'all') return true;
    return request.status.toLowerCase() === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge className="bg-green-100 text-green-700">Delivered</Badge>;
      case 'Reserved':
        return <Badge className="bg-blue-100 text-blue-700">Reserved</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCancelRequest = (requestId) => {
    toast({
      title: 'Request Cancelled',
      description: `Request ID ${requestId} has been cancelled.`,
    });
  };

  const handleTrackRequest = (requestId) => {
    toast({
      title: 'Tracking Request',
      description: `Showing tracking details for ${requestId}...`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Blood Request History | Curo24</title>
        <meta name="description" content="View your blood request history, track reservations, and manage your requests." />
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
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Blood Request History</h1>
              <p className="text-gray-600">View and manage your past and current blood requests.</p>
            </div>
            <Button
              onClick={() => navigate('/blood-bank')}
              className="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Make New Request
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
                variant={filterStatus === 'reserved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('reserved')}
                size="sm"
              >
                Reserved
              </Button>
              <Button
                variant={filterStatus === 'delivered' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('delivered')}
                size="sm"
              >
                Delivered
              </Button>
              <Button
                variant={filterStatus === 'cancelled' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('cancelled')}
                size="sm"
              >
                Cancelled
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredHistory.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Droplets className="w-8 h-8 text-orange-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">
                              {request.units} unit(s) of {request.bloodGroup} {request.component}
                            </h3>
                            {getStatusBadge(request.status)}
                          </div>
                          
                          <p className="text-gray-600 font-medium mb-2">Request ID: {request.id}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>Requested: {new Date(request.requestDate).toLocaleDateString('en-GB', { 
                                day: 'numeric', 
                                month: 'short', 
                                year: 'numeric' 
                              })}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Hospital className="w-4 h-4" />
                              <span>{request.bankName}</span>
                            </div>

                            <div className="col-span-2">
                              <span className="font-medium text-gray-700">Patient:</span> {request.patientName}
                            </div>
                          </div>

                          {request.pickupTime && (
                            <div className="mt-3 text-sm text-blue-700 bg-blue-50 p-2 rounded-md">
                              <p className="font-semibold">Pickup scheduled for: {request.pickupTime}</p>
                            </div>
                          )}

                          {request.deliveryAddress && (
                            <div className="mt-3 text-sm text-green-700 bg-green-50 p-2 rounded-md">
                              <p className="font-semibold">Delivered to: {request.deliveryAddress}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      {request.status === 'Reserved' && (
                        <>
                          <Button
                            onClick={() => handleTrackRequest(request.id)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Track Request
                          </Button>
                          <Button
                            onClick={() => handleCancelRequest(request.id)}
                            variant="outline"
                            className="w-full border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Cancel Request
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No requests found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't made any blood requests yet" 
                : `No ${filterStatus} requests found`}
            </p>
            <Button
              onClick={() => navigate('/blood-bank')}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Find Blood Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequestHistoryPage;