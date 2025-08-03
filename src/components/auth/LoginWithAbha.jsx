import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const LoginWithAbha = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateAbha = () => {
    navigate('/profile/create-abha');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast({
      title: 'Redirecting to ABDM',
      description: 'Please complete the consent on the ABDM portal.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login with ABHA</CardTitle>
        <CardDescription>Use your ABHA ID or number to log in.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          <Input placeholder="ABHA ID (e.g., john@ndhm) or Number" />
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Login with ABHA
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don't have an ABHA ID?{' '}
          <Button variant="link" className="p-0 h-auto" onClick={handleCreateAbha}>
            Create one now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginWithAbha;