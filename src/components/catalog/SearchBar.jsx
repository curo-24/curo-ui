import React from 'react';
import { Search, MapPin, ChevronDown, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, onUpload }) => {
  const { toast } = useToast();

  const handleLocationClick = () => {
    toast({
      title: "📍 Change Location",
      description: "Location selector coming soon!",
    });
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="bg-white rounded-lg border-2 border-gray-200 p-2 focus-within:border-teal-500 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for Medicine and Health Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleLocationClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 px-4 py-3 whitespace-nowrap"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Varanasi - 221007</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            
            <Button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-between bg-teal-50 border border-teal-100 rounded-lg p-3">
         <p className="text-sm text-teal-800">
          Have a prescription? Upload it here for quick order.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Upload className="w-4 h-4 mr-2" />
              Upload Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-gray-200 text-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-800">Upload Your Prescription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 mb-2">Drag and drop your file here</p>
                <p className="text-gray-500 text-sm mb-4">or click to browse</p>
                <Button 
                  onClick={onUpload}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Choose File
                </Button>
              </div>
              <p className="text-gray-500 text-xs text-center">
                Supported formats: JPG, PNG, PDF. Max file size: 10MB. Our AI will scan your prescription for authenticity.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchBar;