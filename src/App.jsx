import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesGrid from '@/components/ServicesGrid';
import StatsSection from '@/components/StatsSection';
import SecuritySection from '@/components/SecuritySection';
import AISection from '@/components/AISection';
import AdminDashboardSection from '@/components/AdminDashboardSection';
import Footer from '@/components/Footer';
import EmergencyButton from '@/components/EmergencyButton';
import MedicineCatalog from '@/components/MedicineCatalog';
import ProductDetailPage from '@/pages/ProductDetailPage';
import DoctorConsultation from '@/pages/DoctorConsultation';
import DoctorProfile from '@/pages/DoctorProfile';
import ConsultationHistory from '@/pages/ConsultationHistory';
import LabTests from '@/pages/LabTests';
import TestDetail from '@/pages/TestDetail';
import TestHistory from '@/pages/TestHistory';
import AmbulanceBooking from '@/pages/AmbulanceBooking';
import AmbulanceTracking from '@/pages/AmbulanceTracking';
import AmbulanceHistory from '@/pages/AmbulanceHistory';
import BloodBankSearch from '@/pages/BloodBankSearch';
import BloodBankDetails from '@/pages/BloodBankDetails';
import BloodRequestHistory from '@/pages/BloodRequestHistory';
import EmergencyHub from '@/pages/EmergencyHub';
import EmergencyTriage from '@/pages/EmergencyTriage';
import EmergencyContacts from '@/pages/EmergencyContacts';
import InsuranceDashboard from '@/pages/insurance/InsuranceDashboard';
import LinkInsurancePage from '@/pages/insurance/LinkInsurancePage';
import ClaimHistoryPage from '@/pages/insurance/ClaimHistoryPage';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginPage from '@/pages/auth/LoginPage';
import OtpVerificationPage from '@/pages/auth/OtpVerificationPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import FamilyMembersPage from '@/pages/profile/FamilyMembersPage';
import CreateAbhaIdPage from '@/pages/profile/CreateAbhaIdPage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import HealthVaultPage from '@/pages/vault/HealthVaultPage';
import UploadDocumentPage from '@/pages/vault/UploadDocumentPage';
import DocumentDetailPage from '@/pages/vault/DocumentDetailPage';
import ContactUs from './components/ContactUs';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <StatsSection />
      <SecuritySection />
      <AISection />
      <AdminDashboardSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <Helmet>
            <title>Curo24 - Complete Healthcare Solutions</title>
            <meta name="description" content="Get medicines delivered in 15 minutes, consult doctors online, book lab tests, ambulance services, and access emergency healthcare with Curo24." />
          </Helmet>
          
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/medicines" element={<MedicineCatalog />} />
              <Route path="/medicines/:id" element={<ProductDetailPage />} />
              <Route path="/consult-doctors" element={<DoctorConsultation />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/lab-tests" element={<LabTests />} />
              <Route path="/test/:id" element={<TestDetail />} />
              <Route path="/ambulance" element={<AmbulanceBooking />} />
              <Route path="/blood-bank" element={<BloodBankSearch />} />
              <Route path="/emergency" element={<EmergencyHub />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/verify-otp" element={<OtpVerificationPage />} />

              <Route path="/consultation-history" element={<ProtectedRoute><ConsultationHistory /></ProtectedRoute>} />
              <Route path="/test-history" element={<ProtectedRoute><TestHistory /></ProtectedRoute>} />
              <Route path="/ambulance-tracking/:id" element={<ProtectedRoute><AmbulanceTracking /></ProtectedRoute>} />
              <Route path="/ambulance-history" element={<ProtectedRoute><AmbulanceHistory /></ProtectedRoute>} />
              <Route path="/blood-bank/:id" element={<ProtectedRoute><BloodBankDetails /></ProtectedRoute>} />
              <Route path="/blood-requests" element={<ProtectedRoute><BloodRequestHistory /></ProtectedRoute>} />
              <Route path="/emergency-triage" element={<ProtectedRoute><EmergencyTriage /></ProtectedRoute>} />
              <Route path="/emergency-contacts" element={<ProtectedRoute><EmergencyContacts /></ProtectedRoute>} />
              <Route path="/insurance" element={<ProtectedRoute><InsuranceDashboard /></ProtectedRoute>} />
              <Route path="/insurance/link" element={<ProtectedRoute><LinkInsurancePage /></ProtectedRoute>} />
              <Route path="/insurance/claims" element={<ProtectedRoute><ClaimHistoryPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile/family" element={<ProtectedRoute><FamilyMembersPage /></ProtectedRoute>} />
              <Route path="/profile/create-abha" element={<ProtectedRoute><CreateAbhaIdPage /></ProtectedRoute>} />
              <Route path="/vault" element={<ProtectedRoute><HealthVaultPage /></ProtectedRoute>} />
              <Route path="/vault/upload" element={<ProtectedRoute><UploadDocumentPage /></ProtectedRoute>} />
              <Route path="/vault/:id" element={<ProtectedRoute><DocumentDetailPage /></ProtectedRoute>} />

              <Route path="/contact" element={<ContactUs />} />

            </Routes>
          </main>
          
          <Footer />
          <EmergencyButton />
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;