
export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  specialty?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  type: 'VIDEO' | 'IN_PERSON';
  notes?: string;
  aiSummary?: string;
}

export interface MedicalRecord {
  id: string;
  userId: string;
  title: string;
  date: string;
  type: 'LAB' | 'PRESCRIPTION' | 'NOTE';
  content: string;
  fileUrl?: string;
}
