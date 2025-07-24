// Data management with localStorage

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits?: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  type: string; // Full-time, Part-time, Contract
  location: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface AdminData {
  team: TeamMember[];
  services: Service[];
  jobs: Job[];
}

const STORAGE_KEY = 'medibilling-admin-data';

// Default data
const defaultData: AdminData = {
  team: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Billing Director',
      bio: 'Over 15 years of experience in medical billing and healthcare administration.',
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Senior Medical Coder',
      bio: 'Certified Professional Coder with expertise in multiple specialty areas.',
    },
  ],
  services: [
    {
      id: '1',
      title: 'Medical Coding',
      description: 'Accurate ICD-10, CPT, and HCPCS coding services for maximum reimbursement.',
      features: [
        'ICD-10 Diagnosis Coding',
        'CPT Procedure Coding',
        'HCPCS Supply Coding',
        'Modifier Application',
        'Coding Audits'
      ],
      benefits: [
        'Improved accuracy rates',
        'Faster claim processing',
        'Reduced denials',
        'Compliance assurance'
      ]
    },
    {
      id: '2',
      title: 'Claims Processing',
      description: 'End-to-end claims management from submission to payment posting.',
      features: [
        'Electronic Claims Submission',
        'Claims Tracking',
        'Denial Management',
        'Appeals Processing',
        'Payment Posting'
      ],
      benefits: [
        'Faster reimbursements',
        'Reduced administrative burden',
        'Improved cash flow',
        'Real-time reporting'
      ]
    },
    {
      id: '3',
      title: 'Revenue Cycle Management',
      description: 'Comprehensive revenue cycle optimization to maximize your practice\'s financial performance.',
      features: [
        'Patient Registration',
        'Insurance Verification',
        'Prior Authorization',
        'Charge Capture',
        'Collections Management'
      ],
      benefits: [
        'Increased revenue',
        'Reduced operating costs',
        'Better patient experience',
        'Strategic insights'
      ]
    }
  ],
  jobs: [
    {
      id: '1',
      title: 'Medical Billing Specialist',
      department: 'Billing',
      type: 'Full-time',
      location: 'Remote',
      description: 'We are seeking an experienced Medical Billing Specialist to join our growing team.',
      requirements: [
        'Associate degree or relevant certification',
        '2+ years medical billing experience',
        'Knowledge of ICD-10, CPT codes',
        'Experience with EMR systems',
        'Strong attention to detail'
      ],
      postedDate: '2024-01-15'
    }
  ]
};

export function loadAdminData(): AdminData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading admin data:', error);
  }
  return defaultData;
}

export function saveAdminData(data: AdminData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving admin data:', error);
  }
}

export function getTeamMembers(): TeamMember[] {
  return loadAdminData().team;
}

export function saveTeamMembers(team: TeamMember[]): void {
  const data = loadAdminData();
  saveAdminData({ ...data, team });
}

export function getServices(): Service[] {
  return loadAdminData().services;
}

export function saveServices(services: Service[]): void {
  const data = loadAdminData();
  saveAdminData({ ...data, services });
}

export function getJobs(): Job[] {
  return loadAdminData().jobs;
}

export function saveJobs(jobs: Job[]): void {
  const data = loadAdminData();
  saveAdminData({ ...data, jobs });
}