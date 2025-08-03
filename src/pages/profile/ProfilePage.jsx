import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Users, LogOut, Edit } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>My Profile - Curo24</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="mb-8">
            <CardContent className="p-6 flex items-center space-x-6">
              <img  class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" alt={user.name} src="https://images.unsplash.com/photo-1652841190565-b96e0acbae17" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">+91 {user.mobile}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Edit className="w-3 h-3 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-green-500" /> ABHA Details</CardTitle>
              </CardHeader>
              <CardContent>
                {user.abhaStatus === 'linked' ? (
                  <div>
                    <p className="text-gray-700">Your ABHA ID is linked.</p>
                    <p className="font-mono bg-gray-100 p-2 rounded mt-2">{user.abhaId}</p>
                    <Badge className="mt-2 bg-green-100 text-green-700">Verified</Badge>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700">Link your ABHA ID to access all your health records in one place.</p>
                    <Button onClick={() => navigate('/profile/create-abha')} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
                      Create/Link ABHA ID
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Users className="w-5 h-5 mr-2 text-blue-500" /> Family Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.familyMembers.slice(0, 2).map(member => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img  class="w-10 h-10 rounded-full object-cover" alt={member.name} src="https://images.unsplash.com/photo-1691437155211-6986ef08cf27" />
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.relation}</p>
                        </div>
                      </div>
                      <Badge variant={member.abhaStatus === 'linked' ? 'default' : 'secondary'}>
                        {member.abhaStatus === 'linked' ? 'ABHA Linked' : 'Not Linked'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate('/profile/family')} variant="outline" className="w-full mt-4">
                  Manage Family Members
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="destructive" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;