import { Clinic, Patient, Appointment, PaymentRecord, Speciality, BeforeAfterCase } from './types';

export const INITIAL_CLINICS: Clinic[] = [
  {
    id: 'CLI-001',
    name: 'Clínica Dental OdontoValle',
    doctorName: 'Dra. Elena Del Valle',
    email: 'contacto@odontovalle.com',
    phone: '+52 55 4123 9876',
    address: 'Av. Insurgentes Sur 1240, Col. Del Valle, CDMX',
    city: 'Ciudad de México',
    plan: 'Pro',
    status: 'Activo',
    nextBillingDate: '2026-08-25',
    monthlyFee: 99,
    publicWebActive: true,
    createdAt: '2025-03-15',
  },
  {
    id: 'CLI-002',
    name: 'Consultorio Dental Sonrisa Real',
    doctorName: 'Dr. Roberto Mendoza',
    email: 'roberto@sonrisareal.com',
    phone: '+52 81 8345 6789',
    address: 'Calzada del Valle 400, San Pedro Garza García, NL',
    city: 'Monterrey',
    plan: 'Enterprise',
    status: 'Activo',
    nextBillingDate: '2026-08-18',
    monthlyFee: 199,
    publicWebActive: true,
    createdAt: '2025-01-10',
  },
  {
    id: 'CLI-003',
    name: 'Estética Dental Integral Pro',
    doctorName: 'Dra. Sofía Morales',
    email: 'info@esteticadentalpro.com',
    phone: '+52 33 3612 8899',
    address: 'Av. Vallarta 2450, Col. Lafayette, Guadalajara, Jal.',
    city: 'Guadalajara',
    plan: 'Básico',
    status: 'Vencido',
    nextBillingDate: '2026-08-01',
    monthlyFee: 49,
    publicWebActive: false,
    createdAt: '2025-05-20',
  },
  {
    id: 'CLI-004',
    name: 'Dental Kids & Care',
    doctorName: 'Dr. Andrés Castro',
    email: 'castro@dentalkids.com',
    phone: '+52 22 2243 1122',
    address: 'Calle 5 de Mayo 102, Centro Histórico, Puebla',
    city: 'Puebla',
    plan: 'Pro',
    status: 'Bloqueado',
    nextBillingDate: '2026-07-15',
    monthlyFee: 99,
    publicWebActive: false,
    createdAt: '2025-02-01',
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'PAC-8492',
    fullName: 'Carlos Mendoza Ríos',
    age: 34,
    gender: 'Masculino',
    phone: '+52 55 8899 1234',
    email: 'carlos.mendoza@email.com',
    address: 'Col. Napoles, Benito Juárez, CDMX',
    medicalHistory: {
      allergies: ['Penicilina'],
      chronicDiseases: ['Hipertensión arterial controlada'],
      medications: ['Losartán 50mg'],
      bloodType: 'O+',
      notes: 'Sensibilidad dental post-blanqueamiento previa.'
    },
    odontogram: [
      { toothNumber: 16, condition: 'caries', surfaces: { center: 'caries', left: 'caries' }, notes: 'Caries oclusal leve', updatedAt: '2026-07-10' },
      { toothNumber: 21, condition: 'resina', surfaces: { center: 'resina' }, notes: 'Restauración estética realizada', updatedAt: '2026-06-15' },
      { toothNumber: 36, condition: 'endodoncia', notes: 'Tratamiento de conducto en proceso', updatedAt: '2026-08-01' },
      { toothNumber: 48, condition: 'extraccion', notes: 'Tercer molar extraído por falta de espacio', updatedAt: '2025-11-20' }
    ],
    registeredAt: '2025-09-12'
  },
  {
    id: 'PAC-8493',
    fullName: 'Mariana Gómez Peralta',
    age: 28,
    gender: 'Femenino',
    phone: '+52 55 7766 5432',
    email: 'mariana.gomez@email.com',
    address: 'Col. Roma Norte, Cuauhtémoc, CDMX',
    medicalHistory: {
      allergies: ['Aspirina / AINEs'],
      chronicDiseases: [],
      medications: [],
      bloodType: 'A+',
      notes: 'Paciente con tratamiento de ortodoncia invisible activo.'
    },
    odontogram: [
      { toothNumber: 11, condition: 'ortodoncia', notes: 'Alineador 8/14 instalado', updatedAt: '2026-07-28' },
      { toothNumber: 21, condition: 'ortodoncia', notes: 'Alineador 8/14 instalado', updatedAt: '2026-07-28' },
      { toothNumber: 46, condition: 'resina', surfaces: { center: 'resina' }, notes: 'Resina fotocurada impecable', updatedAt: '2026-05-10' }
    ],
    registeredAt: '2026-01-15'
  },
  {
    id: 'PAC-8494',
    fullName: 'Mateo Hernández (Pediatría)',
    age: 7,
    gender: 'Masculino',
    phone: '+52 55 1122 3344 (Mamá: Ana)',
    email: 'ana.hernandez@email.com',
    address: 'Col. Narvarte, CDMX',
    isPediatric: true,
    medicalHistory: {
      allergies: ['Ninguna conocida'],
      chronicDiseases: [],
      medications: [],
      bloodType: 'O+',
      notes: 'Primera visita al dentista. Excelente colaboración.'
    },
    odontogram: [
      { toothNumber: 54, condition: 'caries', surfaces: { center: 'caries' }, notes: 'Caries en molar de leche', updatedAt: '2026-08-02' },
      { toothNumber: 61, condition: 'sano', notes: 'Erupción adecuada', updatedAt: '2026-08-02' }
    ],
    registeredAt: '2026-08-02'
  },
  {
    id: 'PAC-8495',
    fullName: 'Roberto Silva Alvarado',
    age: 52,
    gender: 'Masculino',
    phone: '+52 55 9900 4455',
    email: 'roberto.silva@email.com',
    address: 'Col. Condesa, CDMX',
    medicalHistory: {
      allergies: ['Sulfa'],
      chronicDiseases: ['Diabetes Tipo 2'],
      medications: ['Metformina 850mg'],
      bloodType: 'B+',
      notes: 'Requiere profilaxis antibiótica previa si hay cirugía.'
    },
    odontogram: [
      { toothNumber: 26, condition: 'implante', notes: 'Implante titanio en integración', updatedAt: '2026-06-20' },
      { toothNumber: 27, condition: 'corona', notes: 'Corona Zirconio colocada', updatedAt: '2026-04-12' }
    ],
    registeredAt: '2025-04-03'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'CIT-1001',
    patientId: 'PAC-8492',
    patientName: 'Carlos Mendoza Ríos',
    patientPhone: '+52 55 8899 1234',
    service: 'Limpieza Dental Ultrasonido y Diagnóstico',
    dentistName: 'Dra. Elena Del Valle',
    date: '2026-08-07',
    time: '10:00',
    status: 'Confirmada',
    source: 'Web Pública',
    notes: 'Revisión periódica y remoción de sarro.',
    cost: 1200
  },
  {
    id: 'CIT-1002',
    patientId: 'PAC-8493',
    patientName: 'Mariana Gómez Peralta',
    patientPhone: '+52 55 7766 5432',
    service: 'Ajuste de Ortodoncia / Cambio Alineadores',
    dentistName: 'Dra. Elena Del Valle',
    date: '2026-08-07',
    time: '11:30',
    status: 'Pendiente',
    source: 'Web Pública',
    notes: 'Revisión de avance alineador 9.',
    cost: 1800
  },
  {
    id: 'CIT-1003',
    patientId: 'PAC-8494',
    patientName: 'Mateo Hernández',
    patientPhone: '+52 55 1122 3344',
    service: 'Odontopediatría / Selladores de Fosetas',
    dentistName: 'Dra. Elena Del Valle',
    date: '2026-08-08',
    time: '16:00',
    status: 'Confirmada',
    source: 'Interno',
    notes: 'Aplicación de flúor y selladores.',
    cost: 950
  },
  {
    id: 'CIT-1004',
    patientId: 'PAC-8495',
    patientName: 'Roberto Silva Alvarado',
    patientPhone: '+52 55 9900 4455',
    service: 'Evaluación Implante Dental y Corona',
    dentistName: 'Dra. Elena Del Valle',
    date: '2026-08-10',
    time: '12:00',
    status: 'Confirmada',
    source: 'WhatsApp',
    notes: 'Toma de impresión digital 3D.',
    cost: 3500
  },
  {
    id: 'CIT-1005',
    patientId: 'PAC-8492',
    patientName: 'Carlos Mendoza Ríos',
    patientPhone: '+52 55 8899 1234',
    service: 'Resina Fotocurada Molar 16',
    dentistName: 'Dra. Elena Del Valle',
    date: '2026-08-14',
    time: '09:30',
    status: 'Pendiente',
    source: 'Web Pública',
    notes: 'Obturación estético-funcional.',
    cost: 1400
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAG-901',
    patientId: 'PAC-8492',
    patientName: 'Carlos Mendoza Ríos',
    treatmentName: 'Endodoncia Molar 36 y Corona Provisional',
    totalAmount: 6500,
    paidAmount: 4000,
    remainingAmount: 2500,
    date: '2026-08-01',
    status: 'Parcial',
    paymentMethod: 'Tarjeta',
    receiptNumber: 'REC-2026-0841'
  },
  {
    id: 'PAG-902',
    patientId: 'PAC-8493',
    patientName: 'Mariana Gómez Peralta',
    treatmentName: 'Plan Ortodoncia Invisible - Mensualidad 3/12',
    totalAmount: 2500,
    paidAmount: 2500,
    remainingAmount: 0,
    date: '2026-07-28',
    status: 'Pagado',
    paymentMethod: 'Transferencia',
    receiptNumber: 'REC-2026-0839'
  },
  {
    id: 'PAG-903',
    patientId: 'PAC-8495',
    patientName: 'Roberto Silva Alvarado',
    treatmentName: 'Fase 1 Implante Titanio Grado Quirúrgico',
    totalAmount: 14000,
    paidAmount: 14000,
    remainingAmount: 0,
    date: '2026-06-20',
    status: 'Pagado',
    paymentMethod: 'Tarjeta',
    receiptNumber: 'REC-2026-0711'
  },
  {
    id: 'PAG-904',
    patientId: 'PAC-8494',
    patientName: 'Mateo Hernández',
    treatmentName: 'Limpieza Pediatría y Tratamiento Fluoruro',
    totalAmount: 950,
    paidAmount: 950,
    remainingAmount: 0,
    date: '2026-08-02',
    status: 'Pagado',
    paymentMethod: 'Efectivo',
    receiptNumber: 'REC-2026-0850'
  }
];

export const CLINIC_SPECIALITIES: Speciality[] = [
  {
    id: 'esp-1',
    title: 'Ortodoncia & Alineadores',
    description: 'Brackets estéticos, metálicos y alineadores invisibles de última generación para una sonrisa alineada.',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'esp-2',
    title: 'Implantología & Prótesis',
    description: 'Reemplazo permanente de dientes perdidos con implantes de titanio biocompatible y coronas de zirconio.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'esp-3',
    title: 'Estética Dental & Carillas',
    description: 'Diseño de sonrisa digital, blanqueamiento led y carillas de porcelana de ultra alta definición.',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'esp-4',
    title: 'Endodoncia sin Dolor',
    description: 'Tratamientos de conductos avanzados con tecnología mecanizada e iluminación microscópica.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'esp-5',
    title: 'Odontopediatría',
    description: 'Atención dental especializada, lúdica y preventiva para niños y adolescentes sin temor.',
    iconName: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'esp-6',
    title: 'Periodoncia & Limpieza',
    description: 'Cuidado integral de encías, eliminación de sarro ultrasonido y profilaxis profunda preventiva.',
    iconName: 'CheckCircle2',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80'
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-1',
    title: 'Diseño de Sonrisa con Carillas de Porcelana',
    category: 'Estética Dental',
    beforeImg: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    description: 'Reconstrucción de bordes incisales, armonización de color y alineación estética en 2 sesiones.'
  },
  {
    id: 'case-2',
    title: 'Ortodoncia Invisible Alineadores',
    category: 'Ortodoncia',
    beforeImg: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
    description: 'Corrección de apiñamiento severo superior e inferior en 12 meses de tratamiento continuo.'
  },
  {
    id: 'case-3',
    title: 'Rehabilitación sobre Implante de Titanio',
    category: 'Implantología',
    beforeImg: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80',
    description: 'Restauración funcional y estética de pieza 26 con corona de zirconio sobre implante.'
  }
];
