import React from 'react';
export const otcMedicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      salt: "Paracetamol",
      brand: "Crocin",
      price: 45,
      originalPrice: 55,
      rating: 4.5,
      reviews: 1250,
      category: "Pain Relief",
      inStock: true,
      fastDelivery: true,
      expiryDate: "2026-12-31",
      image: "Pain relief tablets with paracetamol"
    },
    {
      id: 2,
      name: "Vitamin D3 Tablets",
      salt: "Cholecalciferol",
      brand: "HealthVit",
      price: 299,
      originalPrice: 399,
      rating: 4.3,
      reviews: 890,
      category: "Vitamins",
      inStock: true,
      fastDelivery: true,
      expiryDate: "2027-05-20",
      image: "Vitamin D3 supplement bottles"
    },
    {
      id: 3,
      name: "Cough Syrup",
      salt: "Dextromethorphan",
      brand: "Benadryl",
      price: 89,
      originalPrice: 110,
      rating: 4.2,
      reviews: 567,
      category: "Cold & Cough",
      inStock: true,
      fastDelivery: false,
      expiryDate: "2026-08-15",
      image: "Cough syrup bottle for cold relief"
    },
    {
      id: 4,
      name: "Antiseptic Cream",
      salt: "Chlorhexidine Gluconate",
      brand: "Savlon",
      price: 65,
      originalPrice: 75,
      rating: 4.4,
      reviews: 432,
      category: "Skincare",
      inStock: true,
      fastDelivery: true,
      expiryDate: "2025-11-30",
      image: "Antiseptic cream tube for wound care"
    },
    {
      id: 5,
      name: "Multivitamin Tablets",
      salt: "Various Vitamins & Minerals",
      brand: "Revital",
      price: 450,
      originalPrice: 550,
      rating: 4.1,
      reviews: 1100,
      category: "Wellness",
      inStock: true,
      fastDelivery: true,
      expiryDate: "2027-01-10",
      image: "Multivitamin supplement bottle"
    },
    {
      id: 6,
      name: "Digestive Tablets",
      salt: "Svarjiksara, Nimbukamlam",
      brand: "ENO",
      price: 35,
      originalPrice: 45,
      rating: 4.6,
      reviews: 789,
      category: "Digestive",
      inStock: true,
      fastDelivery: true,
      expiryDate: "2026-10-01",
      image: "Digestive relief tablets"
    }
];

export const rxMedicines = [
    {
      id: 7,
      name: "Amoxicillin 250mg",
      salt: "Amoxicillin",
      brand: "Novamox",
      price: 79,
      originalPrice: 95,
      rating: 4.7,
      reviews: 234,
      category: "Antibiotics",
      inStock: true,
      fastDelivery: true,
      requiresPrescription: true,
      expiryDate: "2026-09-18",
      image: "Antibiotic capsules for bacterial infections"
    },
    {
      id: 8,
      name: "Insulin Injection",
      salt: "Insulin Glargine",
      brand: "Lantus",
      price: 1250,
      originalPrice: 1400,
      rating: 4.8,
      reviews: 156,
      category: "Diabetes",
      inStock: true,
      fastDelivery: false,
      requiresPrescription: true,
      expiryDate: "2025-12-05",
      image: "Insulin injection pen for diabetes"
    },
    {
      id: 9,
      name: "Amlodipine 5mg",
      salt: "Amlodipine Besylate",
      brand: "Amlong",
      price: 120,
      originalPrice: 150,
      rating: 4.5,
      reviews: 345,
      category: "Cardiovascular",
      inStock: true,
      fastDelivery: true,
      requiresPrescription: true,
      expiryDate: "2027-03-22",
      image: "Blood pressure medication tablets"
    },
    {
      id: 10,
      name: "Sertraline 50mg",
      salt: "Sertraline Hydrochloride",
      brand: "Zoloft",
      price: 180,
      originalPrice: 220,
      rating: 4.3,
      reviews: 89,
      category: "Mental Health",
      inStock: true,
      fastDelivery: false,
      requiresPrescription: true,
      expiryDate: "2026-07-14",
      image: "Antidepressant medication tablets"
    },
     {
      id: 11,
      name: "Sildenafil 100mg",
      salt: "Sildenafil Citrate",
      brand: "Cenforce",
      price: 250,
      originalPrice: 300,
      rating: 4.9,
      reviews: 1502,
      category: "Sexual Health",
      inStock: true,
      fastDelivery: true,
      requiresPrescription: true,
      expiryDate: "2027-01-01",
      image: "Erectile dysfunction medication tablets"
    }
];

export const allMedicines = [...otcMedicines, ...rxMedicines];

export const categories = [
    "All Categories", "Pain Relief", "Cold & Cough", "Vitamins", "Skincare", 
    "Wellness", "Digestive", "Antibiotics", "Diabetes", "Cardiovascular", "Mental Health", "Sexual Health"
];