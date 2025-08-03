export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodComponents = ["Whole Blood", "Platelets", "Plasma", "PRBC", "Cryoprecipitate"];

export const bloodBanks = [
  {
    id: 1,
    name: "Red Cross Blood Bank",
    address: "123 Main Street, Delhi",
    contact: "+91-11-2345-6789",
    operatingHours: "24/7",
    verified: true,
    type: "NGO",
    distance: 5.2,
    rating: 4.8,
    reviews: 1250,
    inventory: {
      "A+": { units: 12, status: 'In Stock' },
      "A-": { units: 3, status: 'Low Stock' },
      "B+": { units: 8, status: 'In Stock' },
      "B-": { units: 1, status: 'Low Stock' },
      "AB+": { units: 5, status: 'In Stock' },
      "AB-": { units: 0, status: 'Out of Stock' },
      "O+": { units: 15, status: 'In Stock' },
      "O-": { units: 4, status: 'Low Stock' },
    },
    componentsAvailable: ["Whole Blood", "Platelets", "Plasma"],
    lastUpdate: "2 hours ago"
  },
  {
    id: 2,
    name: "Apollo Hospital Blood Bank",
    address: "Sarita Vihar, Delhi",
    contact: "+91-11-2692-5858",
    operatingHours: "24/7",
    verified: true,
    type: "Private",
    distance: 8.1,
    rating: 4.9,
    reviews: 980,
    inventory: {
      "A+": { units: 10, status: 'In Stock' },
      "A-": { units: 1, status: 'Low Stock' },
      "B+": { units: 12, status: 'In Stock' },
      "B-": { units: 2, status: 'Low Stock' },
      "AB+": { units: 3, status: 'Low Stock' },
      "AB-": { units: 1, status: 'Low Stock' },
      "O+": { units: 20, status: 'In Stock' },
      "O-": { units: 6, status: 'In Stock' },
    },
    componentsAvailable: ["Whole Blood", "Platelets", "Plasma", "PRBC", "Cryoprecipitate"],
    lastUpdate: "1 hour ago"
  },
  {
    id: 3,
    name: "Rotary Blood Bank",
    address: "Tughlakabad Institutional Area, Delhi",
    contact: "+91-11-4058-6923",
    operatingHours: "9 AM - 6 PM",
    verified: true,
    type: "NGO",
    distance: 12.5,
    rating: 4.7,
    reviews: 750,
    inventory: {
      "A+": { units: 6, status: 'In Stock' },
      "A-": { units: 0, status: 'Out of Stock' },
      "B+": { units: 5, status: 'In Stock' },
      "B-": { units: 1, status: 'Low Stock' },
      "AB+": { units: 2, status: 'Low Stock' },
      "AB-": { units: 0, status: 'Out of Stock' },
      "O+": { units: 10, status: 'In Stock' },
      "O-": { units: 2, status: 'Low Stock' },
    },
    componentsAvailable: ["Whole Blood", "Platelets"],
    lastUpdate: "5 hours ago"
  },
  {
    id: 4,
    name: "AIIMS Blood Bank",
    address: "Ansari Nagar, Delhi",
    contact: "+91-11-2658-8500",
    operatingHours: "24/7",
    verified: true,
    type: "Government",
    distance: 15.0,
    rating: 4.9,
    reviews: 2100,
    inventory: {
      "A+": { units: 25, status: 'In Stock' },
      "A-": { units: 8, status: 'In Stock' },
      "B+": { units: 18, status: 'In Stock' },
      "B-": { units: 5, status: 'In Stock' },
      "AB+": { units: 10, status: 'In Stock' },
      "AB-": { units: 3, status: 'Low Stock' },
      "O+": { units: 30, status: 'In Stock' },
      "O-": { units: 12, status: 'In Stock' },
    },
    componentsAvailable: ["Whole Blood", "Platelets", "Plasma", "PRBC"],
    lastUpdate: "30 minutes ago"
  }
];

export const bloodRequestHistory = [
  {
    id: "REQ001",
    bloodGroup: "A+",
    component: "Platelets",
    units: 2,
    bankName: "Red Cross Blood Bank",
    requestDate: "2024-01-15",
    status: "Delivered",
    patientName: "John Doe",
    deliveryAddress: "123 Patient Home, Delhi"
  },
  {
    id: "REQ002",
    bloodGroup: "O-",
    component: "Whole Blood",
    units: 1,
    bankName: "Apollo Hospital Blood Bank",
    requestDate: "2024-01-20",
    status: "Reserved",
    patientName: "Jane Smith",
    pickupTime: "2024-01-21 10:00 AM"
  },
  {
    id: "REQ003",
    bloodGroup: "B+",
    component: "Plasma",
    units: 1,
    bankName: "AIIMS Blood Bank",
    requestDate: "2024-01-22",
    status: "Cancelled",
    patientName: "Robert Wilson",
  }
];