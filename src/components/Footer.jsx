import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleSocialClick = () => {
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Medicine Delivery", path: "/medicine-delivery" },
        { name: "Doctor Consultation", path: "/doctor-consultation" },
        { name: "Lab Tests", path: "/lab-tests" },
        { name: "Ambulance Booking", path: "/ambulance-booking" },
        { name: "Blood Bank", path: "/blood-bank" },
        { name: "Emergency Services", path: "/emergency-services" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help-center" },
        { name: "Contact Us", path: "/contact" },
        { name: "Track Order", path: "/track-order" },
        { name: "Insurance Claims", path: "/insurance-claims" },
        { name: "Prescription Upload", path: "/prescription-upload" },
        { name: "Emergency Helpline", path: "/emergency" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about-us" },
        { name: "Careers", path: "/careers" },
        { name: "Partner with Us", path: "/partner" },
        { name: "Press & Media", path: "/press-media" },
        { name: "Investor Relations", path: "/investor-relations" },
        { name: "Corporate Health", path: "/corporate-health" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Service", path: "/terms-of-service" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "HIPAA Compliance", path: "/hipaa-compliance" },
        { name: "Refund Policy", path: "/refund-policy" },
        { name: "Licensing", path: "/licensing" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-teal-400">Curo</span>
                <span className="text-3xl font-bold text-white">24</span>
              </div>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted healthcare partner providing 15-minute medicine
              delivery, online consultations, lab tests, and emergency services
              across India.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <span className="text-gray-300">+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <span className="text-gray-300">support@curo24.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-teal-400" />
                <span className="text-gray-300">
                  Available in 100+ cities across India
                </span>
              </div>
            </div>
          </motion.div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="text-lg font-semibold text-white mb-4 block">
                {section.title}
              </span>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.name === "Contact Us" ? (
                      <Link
                        to={link.path}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <button
                        onClick={handleSocialClick}
                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-left"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-700 pt-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-lg font-semibold text-white mb-4 block">
                Stay Updated
              </span>
              <p className="text-gray-400 mb-4">
                Get the latest health tips, offers, and updates delivered to
                your inbox.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex space-x-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500"
                />
                <Button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            <div className="text-center lg:text-right">
              <span className="text-lg font-semibold text-white mb-4 block">
                Follow Us
              </span>
              <div className="flex justify-center lg:justify-end space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSocialClick}
                    className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="border-t border-gray-700 pt-8 mt-8 text-center"
        >
          <p className="text-gray-500 flex items-center justify-center space-x-2">
            <span>© 2025 Curo24. Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for better health outcomes.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;