export type UserRole = 'public' | 'superadmin' | 'dentist' | 'patient';

export interface Clinic {
  id: string;
  name: string;
  doctorName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  plan: 'Básico' | 'Pro' | 'Enterprise';
  status: 'Activo' | 'Vencido' | 'Bloqueado';
  nextBillingDate: string;
  monthlyFee: number;
  publicWebActive: boolean;
  createdAt: string;
  logoUrl?: string;
}

export type ToothCondition = 
  | 'sano'
  | 'caries'
  | 'endodoncia'
  | 'resina'
  | 'extraccion'
  | 'corona'
  | 'implante'
  | 'ortodoncia';

export interface ToothSurface {
  top?: ToothCondition;    // Vestibular / Palatino
  bottom?: ToothCondition; // Lingual / Vestibular
  left?: ToothCondition;   // Mesial
  right?: ToothCondition;  // Distal
  center?: ToothCondition; // Oclusal / Incisal
}

export interface ToothRecord {
  toothNumber: number; // FDI scheme (11-48 adult, 51-85 pediatric)
  condition: ToothCondition;
  surfaces?: ToothSurface;
  notes?: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: 'Masculino' | 'Femenino' | 'Otro';
  phone: string;
  email: string;
  address: string;
  medicalHistory: {
    allergies: string[];
    chronicDiseases: string[];
    medications: string[];
    bloodType: string;
    notes: string;
  };
  odontogram: ToothRecord[];
  isPediatric?: boolean;
  registeredAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  service: string;
  dentistName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'Pendiente' | 'Confirmada' | 'Completada' | 'Cancelada';
  source: 'Web Pública' | 'Interno' | 'WhatsApp';
  notes?: string;
  cost: number;
}

export interface PaymentRecord {
  id: string;
  patientId: string;
  patientName: string;
  treatmentName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  date: string;
  status: 'Pagado' | 'Parcial' | 'Pendiente';
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  receiptNumber: string;
}

export interface Speciality {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  description: string;
}
