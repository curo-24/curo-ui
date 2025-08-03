import { Shield, FileText, Bot, Sun, Heart, TestTube } from 'lucide-react';

export const linkedPolicies = [
  {
    id: 1,
    insurer: "Star Health",
    policyNumber: "2345-XXXX-567",
    type: "Family Floater",
    validity: "2025-12-31",
    sumInsured: 500000,
    usedAmount: 120000,
    status: "Active",
    logo: "Star Health insurance logo",
    coverages: ["Hospitalization", "Day Care", "OPD", "Diagnostics"]
  },
  {
    id: 2,
    insurer: "Niva Bupa",
    policyNumber: "NB-8765-XXXX",
    type: "Individual",
    validity: "2026-06-15",
    sumInsured: 1000000,
    usedAmount: 50000,
    status: "Active",
    logo: "Niva Bupa insurance logo",
    coverages: ["Critical Illness", "Hospitalization", "Maternity"]
  },
  {
    id: 3,
    insurer: "HDFC Ergo",
    policyNumber: "HDFC-1234-XXXX",
    type: "Family Floater",
    validity: "2024-08-20",
    sumInsured: 750000,
    usedAmount: 0,
    status: "Expired",
    logo: "HDFC Ergo insurance logo",
    coverages: ["Hospitalization", "Accidental Cover"]
  }
];

export const claimsHistory = [
  {
    id: "CLM001",
    policyId: 1,
    service: "Doctor Consultation",
    insurer: "Star Health",
    claimAmount: 800,
    approvedAmount: 800,
    date: "2024-01-15",
    status: "Approved",
    stages: [
      { name: "Submitted", status: "completed", date: "2024-01-15" },
      { name: "Under Review", status: "completed", date: "2024-01-16" },
      { name: "Approved", status: "completed", date: "2024-01-18" },
      { name: "Paid", status: "completed", date: "2024-01-20" },
    ]
  },
  {
    id: "CLM002",
    policyId: 2,
    service: "Lab Test (Full Body Checkup)",
    insurer: "Niva Bupa",
    claimAmount: 2499,
    approvedAmount: 2000,
    date: "2024-01-20",
    status: "Under Review",
    stages: [
      { name: "Submitted", status: "completed", date: "2024-01-20" },
      { name: "Under Review", status: "active", date: "2024-01-21" },
      { name: "Approved", status: "pending", date: null },
      { name: "Paid", status: "pending", date: null },
    ]
  },
  {
    id: "CLM003",
    policyId: 1,
    service: "Hospitalization",
    insurer: "Star Health",
    claimAmount: 85000,
    approvedAmount: 0,
    date: "2023-12-10",
    status: "Rejected",
    reason: "Pre-existing condition not covered",
    stages: [
      { name: "Submitted", status: "completed", date: "2023-12-10" },
      { name: "Under Review", status: "completed", date: "2023-12-12" },
      { name: "Rejected", status: "active", date: "2023-12-15" },
      { name: "Paid", status: "skipped", date: null },
    ]
  }
];

export const microInsurancePlans = [
  {
    id: 1,
    name: "MediCover Mini",
    icon: Shield,
    duration: "7 Days",
    premium: 29,
    cover: 5000,
    description: "Covers outpatient expenses like doctor consultations and medicines.",
    color: "bg-blue-500",
    provider: "Plum"
  },
  {
    id: 2,
    name: "Lab Secure",
    icon: TestTube,
    duration: "30 Days",
    premium: 99,
    cover: 10000,
    description: "Full coverage for all diagnostic and lab tests.",
    color: "bg-purple-500",
    provider: "Ditto"
  },
  {
    id: 3,
    name: "Daily Health Shield",
    icon: Sun,
    duration: "1 Day",
    premium: 19,
    cover: 2000,
    description: "One-day coverage for accidental injuries and emergencies.",
    color: "bg-orange-500",
    provider: "ACKO"
  },
  {
    id: 4,
    name: "Cardiac Care",
    icon: Heart,
    duration: "15 Days",
    premium: 149,
    cover: 25000,
    description: "Specialized cover for cardiac-related consultations and tests.",
    color: "bg-red-500",
    provider: "Paytm Insurance"
  }
];

export const insuranceSupportTopics = [
  { id: 1, title: "Claim Rejection Issues", icon: FileText },
  { id: 2, title: "Coverage Doubts", icon: Shield },
  { id: 3, title: "Policy Details Help", icon: Bot },
  { id: 4, title: "Document Upload Problem", icon: FileText }
];