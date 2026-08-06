import React, { useState } from 'react';
import { UserRole, Clinic, Patient, Appointment, PaymentRecord, ToothRecord } from './types';
import { INITIAL_CLINICS, INITIAL_PATIENTS, INITIAL_APPOINTMENTS, INITIAL_PAYMENTS } from './mockData';
import { RoleSelector } from './components/RoleSelector';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { PublicWeb } from './components/PublicWeb';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { DentistDashboard } from './components/DentistDashboard';
import { PatientPortal } from './components/PatientPortal';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [activeModule, setActiveModule] = useState<string>('home');

  // App Centralized State
  const [clinics, setClinics] = useState<Clinic[]>(INITIAL_CLINICS);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);

  // Role selection handler
  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'public') setActiveModule('home');
    else if (role === 'superadmin') setActiveModule('clinics');
    else if (role === 'dentist') setActiveModule('patients');
    else if (role === 'patient') setActiveModule('portal');
  };

  const handleGoHome = () => {
    setCurrentRole(null);
  };

  // State Handler Functions
  const handleUpdateClinic = (updated: Clinic) => {
    setClinics((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleAddClinic = (newClinic: Clinic) => {
    setClinics((prev) => [newClinic, ...prev]);
  };

  const handleDeleteClinic = (clinicId: string) => {
    setClinics((prev) => prev.filter((c) => c.id !== clinicId));
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  const handleUpdatePatientOdontogram = (patientId: string, updatedOdontogram: ToothRecord[]) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, odontogram: updatedOdontogram } : p))
    );
  };

  const handleUpdateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleAddNewAppointment = (appt: Appointment) => {
    setAppointments((prev) => [appt, ...prev]);
  };

  const handleAddPayment = (record: PaymentRecord) => {
    setPayments((prev) => [record, ...prev]);
  };

  // If no role selected, render the 2-column minimalist RoleSelector home view
  if (!currentRole) {
    return <RoleSelector onSelectRole={handleSelectRole} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Navbar Header */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        onGoHome={handleGoHome}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar for Desktop */}
        <Sidebar
          currentRole={currentRole}
          activeModule={activeModule}
          onSelectModule={setActiveModule}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentRole === 'public' && (
              <PublicWeb
                activeModule={activeModule}
                onSelectModule={setActiveModule}
                onAddNewAppointment={handleAddNewAppointment}
              />
            )}

            {currentRole === 'superadmin' && (
              <SuperAdminDashboard
                activeModule={activeModule}
                clinics={clinics}
                onUpdateClinic={handleUpdateClinic}
                onAddClinic={handleAddClinic}
                onDeleteClinic={handleDeleteClinic}
              />
            )}

            {currentRole === 'dentist' && (
              <DentistDashboard
                activeModule={activeModule}
                patients={patients}
                appointments={appointments}
                payments={payments}
                onAddPatient={handleAddPatient}
                onUpdatePatientOdontogram={handleUpdatePatientOdontogram}
                onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
                onAddNewAppointment={handleAddNewAppointment}
                onAddPayment={handleAddPayment}
              />
            )}

            {currentRole === 'patient' && (
              <PatientPortal
                patients={patients}
                appointments={appointments}
                payments={payments}
                onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              />
            )}
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile & Tablet */}
      <BottomNav
        currentRole={currentRole}
        activeModule={activeModule}
        onSelectModule={setActiveModule}
      />
    </div>
  );
}
