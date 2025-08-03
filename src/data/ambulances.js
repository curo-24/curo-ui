export const ambulanceTypes = [
  {
    id: 1,
    type: "Basic Life Support (BLS)",
    description: "General patient transfer with basic medical equipment",
    features: [
      "Oxygen cylinder",
      "First aid kit",
      "Stretcher",
      "Basic monitoring equipment",
      "Trained EMT"
    ],
    price: 1500,
    eta: "8-12 mins",
    useCase: "Non-critical patient transfers, routine hospital visits",
    icon: "🚑"
  },
  {
    id: 2,
    type: "ICU Ambulance",
    description: "Advanced life support with ventilator and paramedic",
    features: [
      "Ventilator support",
      "Cardiac monitor",
      "Defibrillator",
      "IV fluids",
      "Paramedic on board",
      "Oxygen concentrator"
    ],
    price: 3500,
    eta: "10-15 mins",
    useCase: "Critical patients, ICU transfers, ventilator support needed",
    icon: "🏥"
  },
  {
    id: 3,
    type: "Cardiac Ambulance",
    description: "Specialized for heart emergencies with ECG and defibrillator",
    features: [
      "12-lead ECG machine",
      "Defibrillator",
      "Cardiac medications",
      "Oxygen support",
      "Cardiac specialist paramedic",
      "Direct hospital communication"
    ],
    price: 4000,
    eta: "6-10 mins",
    useCase: "Heart attacks, chest pain, cardiac emergencies",
    icon: "❤️"
  },
  {
    id: 4,
    type: "Neonatal Ambulance",
    description: "Equipped for infant and pediatric emergencies",
    features: [
      "Infant incubator",
      "Pediatric ventilator",
      "Temperature control",
      "Pediatric medications",
      "Neonatal specialist",
      "Baby monitoring equipment"
    ],
    price: 5000,
    eta: "12-18 mins",
    useCase: "Newborn transfers, pediatric emergencies, NICU transport",
    icon: "👶"
  }
];

export const ambulanceProviders = [
  {
    id: 1,
    name: "MedRescue Services",
    rating: 4.8,
    totalAmbulances: 45,
    responseTime: "8 mins",
    coverage: ["Delhi", "Gurgaon", "Noida"],
    verified: true,
    available24x7: true
  },
  {
    id: 2,
    name: "LifeLine Emergency",
    rating: 4.7,
    totalAmbulances: 32,
    responseTime: "10 mins",
    coverage: ["Mumbai", "Pune", "Thane"],
    verified: true,
    available24x7: true
  },
  {
    id: 3,
    name: "CareRush Ambulance",
    rating: 4.6,
    totalAmbulances: 28,
    responseTime: "12 mins",
    coverage: ["Bangalore", "Chennai", "Hyderabad"],
    verified: true,
    available24x7: true
  },
  {
    id: 4,
    name: "QuickMed Transport",
    rating: 4.5,
    totalAmbulances: 38,
    responseTime: "9 mins",
    coverage: ["Kolkata", "Bhubaneswar", "Guwahati"],
    verified: true,
    available24x7: true
  }
];

export const medicalStaff = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Paramedic",
    experience: "8 years",
    certifications: ["CPR Certified", "Ventilator Trained", "Trauma Specialist"],
    rating: 4.9,
    profileImage: "Paramedic in uniform with medical equipment"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "EMT",
    experience: "5 years",
    certifications: ["Basic Life Support", "First Aid Certified", "Emergency Response"],
    rating: 4.7,
    profileImage: "Female EMT with ambulance background"
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    role: "Emergency Doctor",
    experience: "12 years",
    certifications: ["MBBS", "Emergency Medicine", "ACLS Certified", "Cardiac Specialist"],
    rating: 4.8,
    profileImage: "Emergency doctor in medical uniform"
  },
  {
    id: 4,
    name: "Sunita Reddy",
    role: "Neonatal Specialist",
    experience: "10 years",
    certifications: ["Pediatric Life Support", "Neonatal Care", "Infant Transport"],
    rating: 4.9,
    profileImage: "Neonatal specialist with infant care equipment"
  }
];

export const hospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    address: "Sarita Vihar, Delhi",
    distance: "2.3 km",
    eta: "8 mins",
    emergencyContact: "+91-11-2692-5858",
    specialties: ["Cardiology", "Emergency", "ICU", "Trauma"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Fortis Hospital",
    address: "Sector 62, Noida",
    distance: "3.1 km",
    eta: "12 mins",
    emergencyContact: "+91-120-247-2222",
    specialties: ["Emergency", "Neurology", "Orthopedics", "ICU"],
    rating: 4.7
  },
  {
    id: 3,
    name: "Max Hospital",
    address: "Patparganj, Delhi",
    distance: "4.2 km",
    eta: "15 mins",
    emergencyContact: "+91-11-2692-6666",
    specialties: ["Cardiac Surgery", "Emergency", "Trauma", "ICU"],
    rating: 4.6
  },
  {
    id: 4,
    name: "AIIMS",
    address: "Ansari Nagar, Delhi",
    distance: "5.8 km",
    eta: "18 mins",
    emergencyContact: "+91-11-2658-8500",
    specialties: ["All Specialties", "Emergency", "Trauma", "Research"],
    rating: 4.9
  }
];