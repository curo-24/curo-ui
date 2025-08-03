import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MapPin, Clock, Phone, Star, Droplets, CheckCircle, Shield, Upload, User, Hotel as Hospital } from 'lucide-react';
import { bloodBanks, bloodComponents } from '@/data/bloodBanks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const BloodBankDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const bank = bloodBanks.find(b => b.id === parseInt(id));

  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [units, setUnits] = useState(1);

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [idProof, setIdProof] = useState(null);

  if (!bank) {
    return <div className="flex items-center justify-center h-screen text-gray-800 text-2xl">Blood Bank not found.</div>;
  }
  
  const getStockColor = (status) => {
    if (status === 'In Stock') return 'text-green-600';
    if (status === 'Low Stock') return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleReservation = () => {
    if (!patientName || !patientAge || !hospitalName || !idProof) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill all fields and upload ID proof to reserve.',
      });
      return;
    }
    toast({
      title: '🩸 Reservation Successful!',
      description: `${units} unit(s) of ${selectedGroup} ${selectedComponent} reserved at ${bank.name}.`,
    });
    navigate('/blood-requests');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>{bank.name} - Blood Bank Details | Curo24</title>
        <meta name="description" content={`Find details, inventory, and reserve blood at ${bank.name}.`} />
      </Helmet>

      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-orange-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Droplets className="w-12 h-12 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-800">{bank.name}</h1>
                      {bank.verified && <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>}
                    </div>
                    <p className="text-lg text-gray-600 mb-4">{bank.address}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-500" /><span>{bank.contact}</span></div>
                      <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-gray-500" /><span>{bank.operatingHours}</span></div>
                      <div className="flex items-center space-x-2"><Star className="w-4 h-4 text-yellow-400 fill-current" /><span>{bank.rating} ({bank.reviews} reviews)</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Live Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Blood Group</th>
                      <th className="p-2">Units Available</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(bank.inventory).map(([group, data]) => (
                      <tr key={group} className="border-b">
                        <td className="p-2 font-bold">{group}</td>
                        <td className="p-2">{data.units}</td>
                        <td className={`p-2 font-semibold ${getStockColor(data.status)}`}>{data.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-500 mt-4">Last updated: {bank.lastUpdate}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Available Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {bank.componentsAvailable.map(comp => (
                    <Badge key={comp} variant="secondary" className="text-sm bg-orange-100 text-orange-700">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-800">Reserve Blood Units</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select Group</option>
                    {Object.entries(bank.inventory).filter(([,data]) => data.units > 0).map(([group]) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Component</label>
                  <select value={selectedComponent} onChange={e => setSelectedComponent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select Component</option>
                    {bank.componentsAvailable.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Units</label>
                  <Input type="number" min="1" value={units} onChange={e => setUnits(parseInt(e.target.value))} className="w-full" />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={!selectedGroup || !selectedComponent}>
                      Reserve Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border border-gray-200 text-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-800">Patient Details for Reservation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                        <Input placeholder="Enter patient's full name" value={patientName} onChange={e => setPatientName(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Patient Age *</label>
                        <Input type="number" placeholder="Enter patient's age" value={patientAge} onChange={e => setPatientAge(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name *</label>
                        <Input placeholder="Enter hospital name" value={hospitalName} onChange={e => setHospitalName(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload ID Proof (Aadhaar/DL) *</label>
                        <Input type="file" onChange={e => setIdProof(e.target.files[0])} className="text-sm" />
                        {idProof && <p className="text-xs text-green-600 mt-1">{idProof.name} uploaded</p>}
                      </div>
                      <Button onClick={handleReservation} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                        Confirm Reservation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="text-xs text-gray-500 text-center pt-2">
                  <p>• Pickup or delivery options available</p>
                  <p>• Government ID proof is mandatory</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BloodBankDetails;