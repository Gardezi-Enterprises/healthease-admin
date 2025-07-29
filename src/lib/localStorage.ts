// Data management with localStorage

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string | File;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details?: string;
  detailedTitle?: string;
  detailedDescription?: string;
  detailedContent?: string;
  processSteps?: string[];
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
      id: 'svc-medical-coding',
      title: 'Medical Coding',
      description: 'Accurate ICD-10, CPT, and HCPCS coding services for maximum reimbursement.',
      details: '',
      detailedTitle: 'Medical Coding Process',
      detailedDescription: 'Our comprehensive medical coding service ensures accurate and timely coding of medical records. We utilize state-of-the-art technology and expert coders to deliver high-quality results.',
      detailedContent: '1. Medical Record Review\n2. ICD-10 Diagnosis Coding\n3. CPT Procedure Coding\n4. HCPCS Supply Coding\n5. Modifier Application\n6. Coding Audits\n7. Final Review',
      processSteps: [
        'Medical Record Review',
        'ICD-10 Diagnosis Coding',
        'CPT Procedure Coding',
        'HCPCS Supply Coding',
        'Modifier Application',
        'Coding Audits',
        'Final Review'
      ],
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
      id: 'svc-claims-processing',
      title: 'Claims Processing',
      description: 'End-to-end claims management from submission to payment posting.',
      details: '',
      detailedTitle: 'Claims Processing Overview',
      detailedDescription: 'Our claims processing service streamlines your revenue cycle by managing all aspects of claims submission, tracking, and payment posting.',
      detailedContent: '1. Electronic Claims Submission\n2. Claims Tracking\n3. Denial Management\n4. Appeals Processing\n5. Payment Posting',
      processSteps: [
        'Electronic Claims Submission',
        'Claims Tracking',
        'Denial Management',
        'Appeals Processing',
        'Payment Posting'
      ],
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
      id: 'svc-revenue-cycle',
      title: 'Revenue Cycle Management',
      description: 'Comprehensive revenue cycle optimization to maximize your practice\'s financial performance.',
      details: '',
      detailedTitle: 'Revenue Cycle Optimization',
      detailedDescription: 'Our revenue cycle management service provides a holistic approach to optimizing your practice\'s financial performance and patient experience.',
      detailedContent: '1. Patient Registration\n2. Insurance Verification\n3. Prior Authorization\n4. Charge Capture\n5. Collections Management',
      processSteps: [
        'Patient Registration',
        'Insurance Verification',
        'Prior Authorization',
        'Charge Capture',
        'Collections Management'
      ],
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

// Helper function to convert File to data URL
async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Helper function to process team members before saving
async function processTeamMembersForStorage(team: TeamMember[]): Promise<TeamMember[]> {
  const processedTeam = await Promise.all(
    team.map(async (member) => {
      if (member.image instanceof File) {
        const dataURL = await fileToDataURL(member.image);
        return { ...member, image: dataURL };
      }
      return member;
    })
  );
  return processedTeam;
}

export async function saveTeamMembers(team: TeamMember[]): Promise<void> {
  const data = loadAdminData();
  const processedTeam = await processTeamMembersForStorage(team);
  saveAdminData({ ...data, team: processedTeam });
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