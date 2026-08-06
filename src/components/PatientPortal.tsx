import React, { useState } from 'react';
import { Patient, Appointment, PaymentRecord } from '../types';
import { 
  User, Calendar, Clock, DollarSign, CheckCircle2, XCircle, 
  Receipt, FileText, Phone, MapPin, ArrowRight, ShieldCheck, Heart,
  Plus, AlertCircle, Sparkles, Smile, Download, Printer, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PatientPortalProps {
  activeModule?: string;
  patients: Patient[];
  appointments: Appointment[];
  payments: PaymentRecord[];
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onAddNewAppointment?: (appt: Appointment) => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  activeModule = 'portal',
  patients,
  appointments,
  payments,
  onUpdateAppointmentStatus,
  onAddNewAppointment
}) => {
  const [activePatientId, setActivePatientId] = useState<string>(patients[0]?.id || 'PAC-8492');
  const [activeReceiptModal, setActiveReceiptModal] = useState<PaymentRecord | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  // New Appointment Form state for Patient
  const [service, setService] = useState('Valoración Dental General');
  const [dentistName, setDentistName] = useState('Dra. Elena Del Valle');
  const [date, setDate] = useState('2026-08-20');
  const [time, setTime] = useState('11:00');
  const [notes, setNotes] = useState('');
  const [bookedToast, setBookedToast] = useState(false);

  const activePatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const patientAppointments = appointments.filter((a) => a.patientId === activePatientId || a.patientName === activePatient.fullName);
  const patientPayments = payments.filter((p) => p.patientId === activePatientId || p.patientName === activePatient.fullName);

  const upcomingAppointments = patientAppointments.filter((a) => a.status === 'Confirmada' || a.status === 'Pendiente');
  const pastAppointments = patientAppointments.filter((a) => a.status === 'Completada' || a.status === 'Cancelada');

  const totalSpent = patientPayments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalPending = patientPayments.reduce((acc, p) => acc + p.remainingAmount, 0);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddNewAppointment) return;

    const newAppt: Appointment = {
      id: `CIT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: activePatient.id,
      patientName: activePatient.fullName,
      dentistName,
      service,
      date,
      time,
      status: 'Pendiente',
      notes: notes || 'Agendada por el paciente desde el Portal'
    };

    onAddNewAppointment(newAppt);
    setShowBookModal(false);
    setBookedToast(true);
    setTimeout(() => setBookedToast(false), 3000);

    // reset
    setNotes('');
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Patient Simulation Selector Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Portal del Paciente — Autogestión Dental</h2>
            <p className="text-[11px] text-slate-500">Bienvenido de vuelta, <strong>{activePatient.fullName}</strong> ({activePatient.phone})</p>
          </div>
        </div>

        {/* Switch patient demo */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Simular Paciente:</span>
          <select
            value={activePatientId}
            onChange={(e) => setActivePatientId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-sky-500"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.fullName} ({p.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards (Always present at top) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Próxima Cita Dental</p>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {upcomingAppointments[0] ? upcomingAppointments[0].date : 'Sin cita próxima'}
            </h3>
            <p className="text-[11px] text-sky-600 font-semibold mt-0.5">
              {upcomingAppointments[0] ? `${upcomingAppointments[0].time} hrs • ${upcomingAppointments[0].service}` : 'Agende directamente'}
            </p>
          </div>
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Pendiente</p>
            <h3 className="text-xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()} MXN</h3>
            <p className="text-[11px] text-amber-700 font-semibold mt-0.5">
              {totalPending > 0 ? 'Tratamientos en proceso' : 'Estado de cuenta al día'}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Invertido</p>
            <h3 className="text-xl font-bold text-emerald-600 mt-1">${totalSpent.toLocaleString()} MXN</h3>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Tratamientos completados</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Receipt className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* MODULE 1: MIS CITAS */}
      {(activeModule === 'portal' || activeModule === 'citas' || !activeModule) && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  <span>Mis Citas Dental & Agendamiento</span>
                </h3>
                <p className="text-xs text-slate-500">Confirme, cancele o solicite una nueva cita en línea con su especialista.</p>
              </div>

              <button
                onClick={() => setShowBookModal(true)}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl text-xs flex items-center space-x-2 shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agendar Nueva Cita</span>
              </button>
            </div>

            {/* Upcoming Appointments Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Citas Próximas Pendientes ({upcomingAppointments.length})</h4>
              {upcomingAppointments.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">No tiene citas agendadas actualmente.</p>
                  <button
                    onClick={() => setShowBookModal(true)}
                    className="px-3.5 py-1.5 bg-sky-600 text-white text-xs font-bold rounded-xl"
                  >
                    Agendar Ahora
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingAppointments.map((appt) => (
                    <div key={appt.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
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
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          <span>Fecha: <strong>{appt.date}</strong> a las <strong>{appt.time} hrs</strong></span>
                        </p>
                        <p className="text-xs text-slate-500">Atiende: {appt.dentistName}</p>
                        {appt.notes && <p className="text-[11px] text-slate-400 italic">Nota: "{appt.notes}"</p>}
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

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Historial de Citas Anteriores</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white overflow-hidden text-xs">
                  {pastAppointments.map((p) => (
                    <div key={p.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <p className="font-bold text-slate-900">{p.service}</p>
                        <p className="text-[11px] text-slate-500">{p.date} a las {p.time} hrs • {p.dentistName}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.status === 'Completada' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODULE 2: HISTORIAL DENTAL & EXPEDIENTE */}
      {activeModule === 'history' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Smile className="w-5 h-5 text-sky-600" />
                  <span>Historial Dental & Odontograma Clínico</span>
                </h3>
                <p className="text-xs text-slate-500">Resumen de piezas dentales tratadas, diagnostico e indicaciones del odontólogo.</p>
              </div>

              <span className="px-3 py-1 bg-sky-50 text-sky-700 text-xs font-bold rounded-xl border border-sky-200">
                Expediente: #{activePatient.id}
              </span>
            </div>

            {/* Patient Clinical Profile Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Paciente Titular</p>
                <p className="font-bold text-slate-900 text-sm">{activePatient.fullName}</p>
                <p className="text-slate-500">{activePatient.age} Años • Sexo: {activePatient.gender || 'Femenino'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Antecedentes & Alergias</p>
                <p className="font-bold text-slate-800">{activePatient.allergies || 'Sin alergias reportadas'}</p>
                <p className="text-slate-500">Última revisión: {activePatient.lastVisit || '2026-08-01'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Progreso del Tratamiento</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-600 h-full w-[75%] rounded-full"></div>
                  </div>
                  <span className="font-bold text-sky-700">75%</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Plan de Restauración Activo</p>
              </div>
            </div>

            {/* Tooth Chart Summary */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Registro de Piezas Dentales (Odontograma Resumido)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {activePatient.odontogram && activePatient.odontogram.length > 0 ? (
                  activePatient.odontogram.map((tooth) => (
                    <div key={tooth.toothNumber} className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                        #{tooth.toothNumber}
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900">{tooth.notes || 'Pieza en observación'}</p>
                        <p className="text-[11px] text-slate-500">Estado: <span className="font-semibold text-sky-700">{tooth.status}</span></p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                        #16
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900">Molar Superior Derecho</p>
                        <p className="text-[11px] text-emerald-700 font-semibold">Resina Fotocurada Realizada</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                        #36
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900">Primer Molar Inferior</p>
                        <p className="text-[11px] text-amber-700 font-semibold">Endodoncia & Corona Temporal</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-extrabold text-sm flex items-center justify-center shrink-0">
                        #11
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900">Incisivo Central Superior</p>
                        <p className="text-[11px] text-sky-700 font-semibold">Limpieza Ultrasónica Sana</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Prescriptions & Doctor Notes */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Indicaciones Médicas & Recetas Digitales</span>
              </h4>

              <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-2">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Tratamiento: Endodoncia Molar 36</span>
                  <span className="text-slate-500">Recetado el 2026-08-01</span>
                </div>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li><strong>Amoxicilina 500mg:</strong> Tomar 1 cápsula cada 8 horas por 7 días completos.</li>
                  <li><strong>Ibuprofeno 600mg:</strong> Tomar 1 tableta cada 8 horas en caso de molestia o inflamación.</li>
                  <li><strong>Enjuague con Clorhexidina 0.12%:</strong> Realizar buches suaves 2 veces al día tras el cepillado.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: ESTADO DE CUENTA & RECIBOS DIGITALES */}
      {activeModule === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                  <span>Estado de Cuenta & Recibos Digitales</span>
                </h3>
                <p className="text-xs text-slate-500">Consulte el historial de pagos realizados y descargue comprobantes fiscales o recibos.</p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                  Saldo Restante: ${totalPending.toLocaleString()} MXN
                </span>
              </div>
            </div>

            {patientPayments.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">No hay comprobantes de pago registrados aún para este paciente.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                      <th className="py-3 px-4 rounded-l-xl">Folio Recibo</th>
                      <th className="py-3 px-4">Tratamiento</th>
                      <th className="py-3 px-4">Monto Total</th>
                      <th className="py-3 px-4">Abonado</th>
                      <th className="py-3 px-4">Saldo Pendiente</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 rounded-r-xl text-right">Comprobante</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {patientPayments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{pay.receiptNumber}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{pay.treatmentName}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">${pay.totalAmount.toLocaleString()} MXN</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600">${pay.paidAmount.toLocaleString()} MXN</td>
                        <td className="py-3.5 px-4 font-medium text-amber-700">${pay.remainingAmount.toLocaleString()} MXN</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              pay.status === 'Pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {pay.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setActiveReceiptModal(pay)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold rounded-xl transition-colors inline-flex items-center space-x-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Ver Recibo</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL AGENDAR NUEVA CITA DESDE EL PORTAL */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-sky-600" />
                <span>Agendar Nueva Cita Dental</span>
              </h3>
              <button onClick={() => setShowBookModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Servicio o Motivo de Consulta:</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="Valoración Dental General">Valoración Dental General</option>
                  <option value="Limpieza Dental Ultrasónica">Limpieza Dental Ultrasónica</option>
                  <option value="Resina Fotocurada">Resina Fotocurada (Carie / Estética)</option>
                  <option value="Revisión de Ortodoncia">Revisión de Ortodoncia / Brackets</option>
                  <option value="Urgencia Dental / Dolor">Urgencia Dental / Dolor</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Odontólogo Especialista:</label>
                <select
                  value={dentistName}
                  onChange={(e) => setDentistName(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="Dra. Elena Del Valle">Dra. Elena Del Valle (Odontología General)</option>
                  <option value="Dr. Roberto Mendoza">Dr. Roberto Mendoza (Ortodoncia)</option>
                  <option value="Dra. Sofía Morales">Dra. Sofía Morales (Endodoncia)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Fecha Deseada:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Horario Disponible:</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="09:00">09:00 hrs</option>
                    <option value="10:30">10:30 hrs</option>
                    <option value="11:00">11:00 hrs</option>
                    <option value="16:00">16:00 hrs</option>
                    <option value="17:30">17:30 hrs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Notas Adicionales (Opcional):</label>
                <input
                  type="text"
                  placeholder="Ej. Siento molestia al beber agua fría..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Confirmar Agendamiento
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* TOAST BOOKED CONFIRMATION */}
      {bookedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold flex items-center space-x-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Cita agendada exitosamente. La clínica revisará y confirmará a la brevedad.</span>
        </div>
      )}

      {/* RECEIPT PREVIEW MODAL */}
      {activeReceiptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-4 font-sans">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Consultorio Dental OdontoValle</h4>
                  <p className="text-[10px] text-slate-500">Comprobante de Pago Digital</p>
                </div>
                <span className="font-mono font-bold text-sky-700 text-xs">{activeReceiptModal.receiptNumber}</span>
              </div>

              <div className="space-y-1 text-slate-700">
                <p><strong>Paciente:</strong> {activeReceiptModal.patientName}</p>
                <p><strong>Tratamiento:</strong> {activeReceiptModal.treatmentName}</p>
                <p><strong>Fecha de Transacción:</strong> {activeReceiptModal.date}</p>
                <p><strong>Método de Pago:</strong> Transferencia / Tarjeta</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span>Monto Total Tratamiento:</span>
                  <span className="font-bold">${activeReceiptModal.totalAmount.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Abonado Hoy:</span>
                  <span>${activeReceiptModal.paidAmount.toLocaleString()} MXN</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                  <span>Saldo Pendiente:</span>
                  <span>${activeReceiptModal.remainingAmount.toLocaleString()} MXN</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>Firma Digital: 0x9f...8a2d</span>
                <span className="font-bold text-emerald-600 uppercase">Valido y Verificado</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setActiveReceiptModal(null)}
                className="py-2 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
