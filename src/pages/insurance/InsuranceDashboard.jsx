import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Shield, Plus, FileText, Bot, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { linkedPolicies, claimsHistory, microInsurancePlans, insuranceSupportTopics } from '@/data/insurance';

const InsuranceDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Expired': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getClaimStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600';
      case 'Under Review': return 'text-blue-600';
      case 'Rejected': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Health Insurance Dashboard | Curo24</title>
        <meta name="description" content="Manage your health insurance policies, track claims, and explore microinsurance plans all in one place." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Insurance Dashboard</h1>
              <p className="text-gray-600">Your central hub for all health insurance needs.</p>
            </div>
            <Button onClick={() => navigate('/insurance/link')} className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Link New Policy
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-indigo-500" />
                  My Policies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {linkedPolicies.map(policy => (
                  <div key={policy.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">{policy.insurer} - {policy.type}</h3>
                        <p className="text-sm text-gray-500">Policy No: {policy.policyNumber}</p>
                        <p className="text-sm text-gray-600">Valid until: {new Date(policy.validity).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <Badge className={getStatusColor(policy.status)}>{policy.status}</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Sum Insured: ₹{policy.sumInsured.toLocaleString('en-IN')}</span>
                        <span className="text-sm font-medium text-gray-800">Remaining: ₹{(policy.sumInsured - policy.usedAmount).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${(policy.usedAmount / policy.sumInsured) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {policy.coverages.map(item => <Badge key={item} variant="outline" className="text-xs">{item}</Badge>)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-gray-800 flex items-center"><FileText className="w-6 h-6 mr-3 text-indigo-500" />Recent Claims</CardTitle>
                  <Button variant="ghost" onClick={() => navigate('/insurance/claims')} className="text-sm text-indigo-600">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {claimsHistory.slice(0, 3).map(claim => (
                    <div key={claim.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{claim.service}</h4>
                          <p className="text-sm text-gray-500">{claim.insurer} - Claim ID: {claim.id}</p>
                        </div>
                        <p className={`font-bold ${getClaimStatusColor(claim.status)}`}>{claim.status}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <p>Claim Amount: ₹{claim.claimAmount.toLocaleString('en-IN')}</p>
                        <p>Claim Date: {new Date(claim.date).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center"><BarChart className="w-6 h-6 mr-3 text-indigo-500" />Microinsurance Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {microInsurancePlans.map(plan => (
                  <div key={plan.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => toast({ title: `Selected ${plan.name}`, description: 'Feature to buy plan is coming soon!' })}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${plan.color}`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{plan.name}</p>
                      <p className="text-sm text-gray-600">₹{plan.premium} for {plan.duration}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Explore All Plans</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center"><Bot className="w-6 h-6 mr-3 text-indigo-500" />Insurance Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">Get instant help with your insurance queries.</p>
                {insuranceSupportTopics.map(topic => (
                  <Button key={topic.id} variant="ghost" className="w-full justify-start text-gray-700 hover:bg-indigo-50">
                    <topic.icon className="w-4 h-4 mr-2" />
                    {topic.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;