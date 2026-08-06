import React, { useState } from 'react';
import { Patient, Appointment, PaymentRecord } from '../types';
import { 
  User, Calendar, Clock, DollarSign, CheckCircle2, XCircle, 
  Receipt, FileText, Phone, MapPin, ArrowRight, ShieldCheck, Heart
} from 'lucide-react';
import { motion } from 'motion/react';

interface PatientPortalProps {
  patients: Patient[];
  appointments: Appointment[];
  payments: PaymentRecord[];
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  patients,
  appointments,
  payments,
  onUpdateAppointmentStatus
}) => {
  const [activePatientId, setActivePatientId] = useState<string>(patients[0]?.id || 'PAC-8492');
  const [activeReceiptModal, setActiveReceiptModal] = useState<PaymentRecord | null>(null);

  const activePatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const patientAppointments = appointments.filter((a) => a.patientId === activePatientId || a.patientName === activePatient.fullName);
  const patientPayments = payments.filter((p) => p.patientId === activePatientId || p.patientName === activePatient.fullName);

  const upcomingAppointments = patientAppointments.filter((a) => a.status === 'Confirmada' || a.status === 'Pendiente');
  const pastAppointments = patientAppointments.filter((a) => a.status === 'Completada' || a.status === 'Cancelada');

  const totalSpent = patientPayments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalPending = patientPayments.reduce((acc, p) => acc + p.remainingAmount, 0);

  return (
    <div className="space-y-8 pb-20">
      {/* Patient Simulation Selector Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Portal del Paciente — Autogestión</h2>
            <p className="text-[11px] text-slate-500">Bienvenido de vuelta, {activePatient.fullName}</p>
          </div>
        </div>

        {/* Switch patient demo */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Simular Paciente:</span>
          <select
            value={activePatientId}
            onChange={(e) => setActivePatientId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 outline-none"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.fullName} ({p.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Próxima Cita Dental</p>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {upcomingAppointments[0] ? upcomingAppointments[0].date : 'Sin cita próxima'}
            </h3>
            <p className="text-[11px] text-teal-600 font-semibold mt-0.5">
              {upcomingAppointments[0] ? `${upcomingAppointments[0].time} hrs` : 'Agende desde la web'}
            </p>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Pendiente Tratamiento</p>
            <h3 className="text-xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()} MXN</h3>
            <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
              {totalPending > 0 ? 'Abonable en clínica' : 'Estado de cuenta al día'}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pagado / Histórico</p>
            <h3 className="text-xl font-bold text-emerald-600 mt-1">${totalSpent.toLocaleString()} MXN</h3>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Tratamientos completados</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Receipt className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Management */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-teal-600" />
          <span>Gestión de Citas Próximas</span>
        </h3>

        {upcomingAppointments.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4">No tiene citas pendientes ni próximas agendadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    Cita #{appt.id}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      appt.status === 'Confirmada' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{appt.service}</h4>
                  <p className="text-xs text-slate-600 flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>Fecha: <strong>{appt.date}</strong> a las <strong>{appt.time} hrs</strong></span>
                  </p>
                  <p className="text-xs text-slate-500">Doctora: {appt.dentistName}</p>
                </div>

                {/* Confirm/Cancel actions */}
                <div className="pt-2 flex gap-2 border-t border-slate-200">
                  {appt.status === 'Pendiente' && (
                    <button
                      onClick={() => onUpdateAppointmentStatus(appt.id, 'Confirmada')}
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirmar Cita</span>
                    </button>
                  )}

                  <button
                    onClick={() => onUpdateAppointmentStatus(appt.id, 'Cancelada')}
                    className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancelar Cita</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Statement & Digital Receipts */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-emerald-600" />
          <span>Estado de Cuenta & Recibos Digitales</span>
        </h3>

        {patientPayments.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4">No hay comprobantes de pago registrados aún para este paciente.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                  <th className="py-3 px-4 rounded-l-xl">Folio Recibo</th>
                  <th className="py-3 px-4">Tratamiento</th>
                  <th className="py-3 px-4">Monto Total</th>
                  <th className="py-3 px-4">Abonado</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Comprobante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {patientPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{pay.receiptNumber}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{pay.treatmentName}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">${pay.totalAmount.toLocaleString()} MXN</td>
                    <td className="py-3 px-4 font-bold text-emerald-600">${pay.paidAmount.toLocaleString()} MXN</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          pay.status === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveReceiptModal(pay)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold rounded-xl transition-colors inline-flex items-center space-x-1 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RECEIPT PREVIEW MODAL */}
      {activeReceiptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900">Recibo Digital #{activeReceiptModal.receiptNumber}</span>
                <span className="text-[10px] text-slate-400">{activeReceiptModal.date}</span>
              </div>
              <p><strong>Paciente:</strong> {activeReceiptModal.patientName}</p>
              <p><strong>Tratamiento:</strong> {activeReceiptModal.treatmentName}</p>
              <p><strong>Monto Pagado:</strong> <span className="text-emerald-700 font-bold">${activeReceiptModal.paidAmount.toLocaleString()} MXN</span></p>
              <p><strong>Saldo Pendiente:</strong> ${activeReceiptModal.remainingAmount.toLocaleString()} MXN</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveReceiptModal(null)}
                className="py-2 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cerrar Comprobante
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
