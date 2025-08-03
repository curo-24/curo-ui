import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Plus, Edit, Trash2, Phone, User, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', relation: 'Father', phone: '+91-98765-43210', primary: true },
    { id: 2, name: 'Jane Smith', relation: 'Wife', phone: '+91-98765-43211', primary: false },
    { id: 3, name: 'Dr. Robert Wilson', relation: 'Family Doctor', phone: '+91-98765-43212', primary: false }
  ]);
  
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });
  const [editingContact, setEditingContact] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in name and phone number.",
      });
      return;
    }

    const contact = {
      id: Date.now(),
      ...newContact,
      primary: contacts.length === 0
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', relation: '', phone: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "✅ Contact Added",
      description: `${contact.name} has been added to your emergency contacts.`,
    });
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "🗑️ Contact Removed",
      description: "Emergency contact has been removed.",
    });
  };

  const handleSetPrimary = (id) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      primary: contact.id === id
    })));
    toast({
      title: "⭐ Primary Contact Updated",
      description: "Primary emergency contact has been updated.",
    });
  };

  const handleTestNotification = () => {
    toast({
      title: "📱 Test Notification Sent",
      description: "Test emergency notification sent to all contacts.",
    });
  };

  const relationOptions = [
    'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Brother', 'Sister',
    'Friend', 'Family Doctor', 'Neighbor', 'Colleague', 'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Emergency Contacts | Curo24</title>
        <meta name="description" content="Manage your emergency contacts for automatic notification during medical emergencies." />
      </Helmet>

      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-gray-700 hover:text-red-600">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Emergency Hub
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Emergency Contacts</h1>
              <p className="text-gray-600">Manage contacts who will be notified during emergencies</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border border-gray-200 text-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">Add Emergency Contact</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      placeholder="Enter full name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                    <select
                      value={newContact.relation}
                      onChange={(e) => setNewContact({...newContact, relation: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select relation</option>
                      {relationOptions.map(relation => (
                        <option key={relation} value={relation}>{relation}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      placeholder="+91-XXXXX-XXXXX"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleAddContact} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    Add Contact
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-semibold text-blue-800">Auto-Notification</h3>
                <p className="text-blue-600 text-sm">
                  These contacts will be automatically notified via SMS and WhatsApp when you use any emergency service.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-800 text-lg">{contact.name}</h3>
                            {contact.primary && (
                              <Badge className="bg-red-100 text-red-700">Primary</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{contact.relation}</p>
                          <p className="text-gray-500 text-sm">{contact.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast({ title: "📞 Calling", description: `Calling ${contact.name}...` })}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                        
                        {!contact.primary && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSetPrimary(contact.id)}
                          >
                            Set Primary
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingContact(contact)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {contacts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No emergency contacts added</h3>
                <p className="text-gray-600 mb-4">
                  Add emergency contacts to be notified automatically during medical emergencies.
                </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Add Your First Contact
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Contact Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  <h4 className="font-semibold mb-2">Notification Methods:</h4>
                  <ul className="space-y-1">
                    <li>• SMS alerts with location</li>
                    <li>• WhatsApp notifications</li>
                    <li>• Real-time status updates</li>
                    <li>• Emergency service details</li>
                  </ul>
                </div>
                
                <Button
                  onClick={handleTestNotification}
                  variant="outline"
                  className="w-full"
                >
                  Test Notifications
                </Button>
                
                <div className="text-xs text-gray-500 text-center">
                  <p>Contacts will receive notifications only during actual emergencies or when you test the system.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Add at least 2-3 emergency contacts</p>
                <p>• Include family members and close friends</p>
                <p>• Consider adding your family doctor</p>
                <p>• Keep contact information updated</p>
                <p>• Test notifications periodically</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;