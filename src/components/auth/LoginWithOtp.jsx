import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const LoginWithOtp = () => {
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10 && /^\d+$/.test(mobile)) {
      toast({
        title: 'OTP Sent!',
        description: `An OTP has been sent to ${mobile}.`,
      });
      navigate(`/verify-otp?mobile=${mobile}`);
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Mobile Number',
        description: 'Please enter a valid 10-digit mobile number.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login with Mobile</CardTitle>
        <CardDescription>Enter your 10-digit mobile number to receive an OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            maxLength="10"
          />
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
            Send OTP
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginWithOtp;