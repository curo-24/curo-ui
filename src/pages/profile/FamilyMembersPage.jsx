import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, ShieldCheck, Trash2 } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const FamilyMembersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Family Members - Curo24</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Family Members</h1>
            <Button onClick={() => toast({ title: 'Add Family Member form coming soon!' })}>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>

          <div className="space-y-4">
            {user.familyMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img  class="w-16 h-16 rounded-full object-cover" alt={member.name} src="https://images.unsplash.com/photo-1691437155211-6986ef08cf27" />
                      <div>
                        <p className="text-lg font-bold">{member.name}</p>
                        <p className="text-gray-600">{member.relation}, {member.age} years</p>
                        <Badge variant={member.abhaStatus === 'linked' ? 'default' : 'secondary'} className="mt-1">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          {member.abhaStatus === 'linked' ? 'ABHA Linked' : 'Link ABHA'}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toast({ title: `Removing ${member.name}...`, variant: 'destructive' })}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FamilyMembersPage;