import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Stethoscope, TestTube, Bus as Ambulance, Droplets, Shield, FileText, Phone } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { useNavigate } from 'react-router-dom';

const ServicesGrid = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const services = [
    {
      icon: Pill,
      title: "15-Min Medicine Delivery",
      description: "Get your medicines delivered in just 15 minutes with real-time tracking and cold chain compliance.",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      delay: 0.1,
      onClick: () => handleNavigation('/medicines')
    },
    {
      icon: Stethoscope,
      title: "Doctor Consultation",
      description: "Book online or offline consultations with verified doctors. Emergency access within 5-10 minutes.",
      iconBgColor: "bg-green-100",
      iconColor: "text-green-600",
      delay: 0.2,
      onClick: () => handleNavigation('/consult-doctors')
    },
    {
      icon: TestTube,
      title: "Lab Tests & Diagnostics",
      description: "Doorstep sample collection and digital report delivery from top partner labs.",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      delay: 0.3,
      onClick: () => handleNavigation('/lab-tests')
    },
    {
      icon: Ambulance,
      title: "Ambulance Booking",
      description: "GPS-based ambulance dispatch with live tracking. Basic, ICU, and specialized ambulances available.",
      iconBgColor: "bg-red-100",
      iconColor: "text-red-600",
      delay: 0.4,
      onClick: () => handleNavigation('/ambulance')
    },
    {
      icon: Droplets,
      title: "Blood Bank Access",
      description: "Search and reserve blood units from verified blood banks with real-time inventory.",
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      delay: 0.5,
      onClick: () => handleNavigation('/blood-bank')
    },
    {
      icon: Shield,
      title: "Health Insurance",
      description: "Link insurance policies, auto-apply coverage, and track reimbursements seamlessly.",
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      delay: 0.6,
      onClick: () => handleNavigation('/insurance')
    },
    {
      icon: Phone,
      title: "Emergency Services",
      description: "One-click access to emergency services with SOS button and automatic location sharing.",
      iconBgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      delay: 0.7,
      onClick: () => handleNavigation('/emergency')
    },
    {
      icon: FileText,
      title: "Health Records Vault",
      description: "Secure digital storage for prescriptions, reports, and health records with ABHA integration.",
      iconBgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
      delay: 0.8,
      onClick: () => handleNavigation('/vault')
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Complete Healthcare
            <span className="text-teal-600">
              {" "}Ecosystem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From emergency services to routine healthcare, we've got everything you need 
            for you and your family's health and wellness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              iconBgColor={service.iconBgColor}
              iconColor={service.iconColor}
              delay={service.delay}
              onClick={service.onClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;