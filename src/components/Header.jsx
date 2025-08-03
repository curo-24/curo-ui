import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, Upload, Shield, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully." });
    navigate('/');
  };

  const handleWaitlistClick = () => {
    toast({
      title: "🎉 Join Our Waitlist!",
      description: "Get early access to new features and exclusive offers!",
    });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Consult Doctors', path: '/consult-doctors' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Lab Test', path: '/lab-tests' },
    { name: 'Ambulance', path: '/ambulance' },
    { name: 'Blood Bank', path: '/blood-bank' },
    { name: 'Insurance', path: '/insurance', icon: Shield },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigateTo('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">Curo</span>
              <span className="text-2xl font-bold text-gray-800">24</span>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="text-gray-700 hover:text-teal-600 font-medium"
                onClick={() => navigateTo(link.path)}
              >
                {link.icon && <link.icon className="w-4 h-4 mr-2 text-indigo-500" />}
                {link.name}
              </Button>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.profilePicture} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/consultation-history')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                onClick={() => navigateTo('/login')}
                className="hidden md:block text-gray-700 hover:text-teal-600 font-medium"
              >
                Login | Signup
              </Button>
            )}

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toast({ title: "Feature coming soon!" })}
                className="relative text-gray-700 hover:text-teal-600"
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-1.5 py-0.5">
                  2
                </Badge>
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-teal-600"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-700 hover:text-teal-600"
                  onClick={() => navigateTo(link.path)}
                >
                   {link.icon && <link.icon className="w-4 h-4 mr-2 text-indigo-500" />}
                   {link.name}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-orange-600 hover:text-orange-700"
                onClick={handleWaitlistClick}
              >
                Waitlist
              </Button>
              <Button
                variant="ghost"
                className="w-full text-left justify-start text-gray-700 hover:text-teal-600"
                onClick={() => toast({ title: 'Feature coming soon!' })}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Prescription
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="ghost"
                  className="w-full text-left justify-start text-gray-700 hover:text-teal-600"
                  onClick={() => navigateTo('/login')}
                >
                  Login | Signup
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;