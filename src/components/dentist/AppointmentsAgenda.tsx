import React, { useState } from 'react';
import { Appointment } from '../../types';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, Send, 
  Filter, Plus, Globe, MessageSquare, Check, AlertCircle, Phone, User
} from 'lucide-react';
import { motion } from 'motion/react';

interface AppointmentsAgendaProps {
  appointments: Appointment[];
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onAddNewAppointment: (appt: Appointment) => void;
}

export const AppointmentsAgenda: React.FC<AppointmentsAgendaProps> = ({
  appointments,
  onUpdateAppointmentStatus,
  onAddNewAppointment
}) => {
  const [viewMode, setViewMode] = useState<'Día' | 'Semana' | 'Mes'>('Semana');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [whatsappSentId, setWhatsappSentId] = useState<string | null>(null);

  // New manual appointment form
  const [showAddModal, setShowAddModal] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [service, setService] = useState('Limpieza Dental Ultrasonido');
  const [date, setDate] = useState('2026-08-08');
  const [time, setTime] = useState('11:00');

  const filteredAppointments = appointments.filter((a) => {
    if (statusFilter === 'Todos') return true;
    return a.status === statusFilter;
  });

  const handleSendWhatsappReminder = (appt: Appointment) => {
    const msg = `Hola ${appt.patientName}, le recordamos su cita dental con la Dra. Elena Del Valle programada para el ${appt.date} a las ${appt.time} hrs para el servicio "${appt.service}". Por favor responda SI para confirmar.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${appt.patientPhone.replace(/\D/g, '')}?text=${encoded}`, '_blank');
    setWhatsappSentId(appt.id);
    setTimeout(() => setWhatsappSentId(null), 3000);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const newAppt: Appointment = {
      id: `CIT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: `PAC-MANUAL-${Math.floor(100 + Math.random() * 900)}`,
      patientName,
      patientPhone,
      service,
      dentistName: 'Dra. Elena Del Valle',
      date,
      time,
      status: 'Confirmada',
      source: 'Interno',
      cost: 1200
    };

    onAddNewAppointment(newAppt);
    setShowAddModal(false);

    setPatientName('');
    setPatientPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & View Mode */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-teal-600" />
            <span>Agenda & Citas Médicas</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Administración de citas, confirmación de solicitudes web y recordatorios vía WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Calendar View Selector */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
            {(['Día', 'Semana', 'Mes'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setViewMode(v)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  viewMode === v ? 'bg-teal-600 text-white shadow' : 'text-slate-600'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="Todos">Todas las Citas</option>
            <option value="Pendiente">Pendientes Web</option>
            <option value="Confirmada">Confirmadas</option>
            <option value="Completada">Completadas</option>
            <option value="Cancelada">Canceladas</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-2xl shadow flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>

      {/* Main Appointment Cards / Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
            No hay citas agendadas con el filtro seleccionado.
          </div>
        ) : (
          filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 transition-all hover:shadow-md ${
                appt.status === 'Pendiente'
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : appt.status === 'Confirmada'
                  ? 'border-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {appt.id}
                    </span>
                    {appt.source === 'Web Pública' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>Web</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{appt.patientName}</h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{appt.patientPhone}</span>
                  </p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    appt.status === 'Confirmada'
                      ? 'bg-emerald-100 text-emerald-800'
                      : appt.status === 'Pendiente'
                      ? 'bg-amber-100 text-amber-800'
                      : appt.status === 'Completada'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <p className="font-bold text-slate-800">{appt.service}</p>
                <div className="flex items-center space-x-3 text-slate-500 pt-1">
                  <span className="flex items-center space-x-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-teal-600" />
                    <span>{appt.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span>{appt.time} hrs</span>
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-100">
                {appt.status === 'Pendiente' && (
                  <button
                    onClick={() => onUpdateAppointmentStatus(appt.id, 'Confirmada')}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirmar Cita</span>
                  </button>
                )}

                {appt.status === 'Confirmada' && (
                  <button
                    onClick={() => onUpdateAppointmentStatus(appt.id, 'Completada')}
                    className="flex-1 py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Atendida</span>
                  </button>
                )}

                <button
                  onClick={() => handleSendWhatsappReminder(appt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
                    whatsappSentId === appt.id
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                  title="Enviar Recordatorio por WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{whatsappSentId === appt.id ? '¡Enviado!' : 'WhatsApp'}</span>
                </button>

                {appt.status !== 'Cancelada' && (
                  <button
                    onClick={() => onUpdateAppointmentStatus(appt.id, 'Cancelada')}
                    className="p-2 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                    title="Cancelar Cita"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL CREAR CITA MANUAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Agendar Cita Manualmente</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block">Nombre del Paciente:</label>
                <input
                  type="text"
                  placeholder="Ej. Roberto Gómez"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block">Teléfono / WhatsApp:</label>
                <input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block">Servicio Dental:</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block">Fecha:</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Horario:</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  Confirmar y Guardar Cita
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
