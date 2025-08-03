import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Plus, Filter, FileText, Check, Clock, X, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { claimsHistory } from '@/data/insurance';

const ClaimHistoryPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClaims = claimsHistory.filter(claim => {
    if (filterStatus === 'all') return true;
    return claim.status.toLowerCase().replace(' ', '-') === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <Badge className="bg-green-100 text-green-700">{status}</Badge>;
      case 'Under Review': return <Badge className="bg-blue-100 text-blue-700">{status}</Badge>;
      case 'Rejected': return <Badge className="bg-red-100 text-red-700">{status}</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const StageIcon = ({ status }) => {
    switch (status) {
      case 'completed': return <Check className="w-5 h-5 text-white" />;
      case 'active': return <Clock className="w-5 h-5 text-white animate-spin" />;
      case 'pending': return <CircleDot className="w-5 h-5 text-white" />;
      case 'skipped': return <X className="w-5 h-5 text-white" />;
      default: return null;
    }
  };

  const getStageColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      case 'skipped': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Claim History | Curo24</title>
        <meta name="description" content="Track your health insurance claims, view status, and manage your reimbursement requests." />
      </Helmet>
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-indigo-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Claim History</h1>
              <p className="text-gray-600">Track all your past and ongoing insurance claims.</p>
            </div>
            <Button onClick={() => toast({ title: "Submitting new claim..."})} className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Submit New Claim
            </Button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')} size="sm">All</Button>
              <Button variant={filterStatus === 'approved' ? 'default' : 'outline'} onClick={() => setFilterStatus('approved')} size="sm">Approved</Button>
              <Button variant={filterStatus === 'under-review' ? 'default' : 'outline'} onClick={() => setFilterStatus('under-review')} size="sm">Under Review</Button>
              <Button variant={filterStatus === 'rejected' ? 'default' : 'outline'} onClick={() => setFilterStatus('rejected')} size="sm">Rejected</Button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {filteredClaims.map((claim, index) => (
            <motion.div
              key={claim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{claim.service}</h3>
                        {getStatusBadge(claim.status)}
                      </div>
                      <p className="text-sm text-gray-500">{claim.insurer} - Claim ID: {claim.id}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
                        <p>Claim Amount: <span className="font-semibold">₹{claim.claimAmount.toLocaleString('en-IN')}</span></p>
                        <p>Approved Amount: <span className="font-semibold">₹{claim.approvedAmount.toLocaleString('en-IN')}</span></p>
                        <p>Date: <span className="font-semibold">{new Date(claim.date).toLocaleDateString('en-GB')}</span></p>
                      </div>
                      {claim.reason && (
                        <p className="text-sm text-red-600 mt-2">Reason: {claim.reason}</p>
                      )}
                    </div>
                    <div className="lg:w-auto flex space-x-2">
                      <Button variant="outline"><FileText className="w-4 h-4 mr-2" />View Documents</Button>
                      <Button variant="outline">Raise a Query</Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center">
                      {claim.stages.map((stage, i) => (
                        <React.Fragment key={stage.name}>
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStageColor(stage.status)}`}>
                              <StageIcon status={stage.status} />
                            </div>
                            <p className="text-xs text-center mt-2 w-20">{stage.name}</p>
                            {stage.date && <p className="text-xs text-gray-500">{new Date(stage.date).toLocaleDateString('en-GB')}</p>}
                          </div>
                          {i < claim.stages.length - 1 && (
                            <div className={`flex-1 h-1 ${stage.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No claims found</h3>
            <p className="text-gray-600 mb-4">
              {filterStatus === 'all' 
                ? "You haven't submitted any claims yet."
                : `No ${filterStatus.replace('-', ' ')} claims found.`}
            </p>
            <Button onClick={() => toast({ title: "Submitting new claim..."})} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Submit Your First Claim
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimHistoryPage;