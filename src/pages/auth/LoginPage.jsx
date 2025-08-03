import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Phone, Fingerprint, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginWithOtp from '@/components/auth/LoginWithOtp';
import LoginWithAbha from '@/components/auth/LoginWithAbha';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Login - Curo24</title>
        <meta name="description" content="Login to Curo24 using your mobile number or ABHA ID." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Curo24
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your health, simplified.
          </p>
        </div>
        
        <Tabs defaultValue="otp" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="otp">
              <Phone className="w-4 h-4 mr-2" />
              Phone + OTP
            </TabsTrigger>
            <TabsTrigger value="abha">
              <Fingerprint className="w-4 h-4 mr-2" />
              ABHA ID
            </TabsTrigger>
          </TabsList>
          <TabsContent value="otp">
            <LoginWithOtp />
          </TabsContent>
          <TabsContent value="abha">
            <LoginWithAbha />
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-center text-sm text-gray-500">
          <Shield className="w-4 h-4 mr-2" />
          <span>Your information is safe and secure with us.</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;