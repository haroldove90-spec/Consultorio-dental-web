import React from 'react';
import { Patient, Appointment, PaymentRecord, ToothRecord } from '../types';
import { PatientManagement } from './dentist/PatientManagement';
import { InteractiveOdontogram } from './dentist/InteractiveOdontogram';
import { AppointmentsAgenda } from './dentist/AppointmentsAgenda';
import { FinancialControl } from './dentist/FinancialControl';
import { ReportsMetrics } from './dentist/ReportsMetrics';

interface DentistDashboardProps {
  activeModule: string;
  patients: Patient[];
  appointments: Appointment[];
  payments: PaymentRecord[];
  onAddPatient: (newPatient: Patient) => void;
  onUpdatePatientOdontogram: (patientId: string, updatedOdontogram: ToothRecord[]) => void;
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onAddNewAppointment: (appt: Appointment) => void;
  onAddPayment: (record: PaymentRecord) => void;
}

export const DentistDashboard: React.FC<DentistDashboardProps> = ({
  activeModule,
  patients,
  appointments,
  payments,
  onAddPatient,
  onUpdatePatientOdontogram,
  onUpdateAppointmentStatus,
  onAddNewAppointment,
  onAddPayment
}) => {
  return (
    <div className="space-y-6 pb-20">
      {(!activeModule || activeModule === 'patients') && (
        <PatientManagement
          patients={patients}
          onAddPatient={onAddPatient}
          onUpdatePatientOdontogram={onUpdatePatientOdontogram}
        />
      )}

      {activeModule === 'odontogram' && (
        <InteractiveOdontogram
          patient={patients[0]}
          onUpdatePatientOdontogram={onUpdatePatientOdontogram}
        />
      )}

      {activeModule === 'agenda' && (
        <AppointmentsAgenda
          appointments={appointments}
          onUpdateAppointmentStatus={onUpdateAppointmentStatus}
          onAddNewAppointment={onAddNewAppointment}
        />
      )}

      {activeModule === 'financial' && (
        <FinancialControl
          payments={payments}
          patients={patients}
          onAddPayment={onAddPayment}
        />
      )}

      {activeModule === 'reports' && <ReportsMetrics />}
    </div>
  );
};
