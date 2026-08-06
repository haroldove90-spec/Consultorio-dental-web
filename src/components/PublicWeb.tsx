import React, { useState } from 'react';
import { Appointment, Speciality } from '../types';
import { CLINIC_SPECIALITIES, BEFORE_AFTER_CASES } from '../mockData';
import { 
  Sparkles, Calendar, Clock, MapPin, Phone, MessageSquare, 
  CheckCircle2, ArrowRight, ShieldCheck, HeartHandshake, Smile, Star,
  Send, User, Mail, FileText, Check, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PublicWebProps {
  activeModule: string;
  onSelectModule: (module: string) => void;
  onAddNewAppointment: (appointment: Appointment) => void;
}

export const PublicWeb: React.FC<PublicWebProps> = ({ activeModule, onSelectModule, onAddNewAppointment }) => {
  // Booking Form State
  const [selectedService, setSelectedService] = useState('Limpieza Dental Ultrasonido y Diagnóstico');
  const [selectedDate, setSelectedDate] = useState('2026-08-11');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState<Appointment | null>(null);

  // WhatsApp Floating Modal State
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waMessage, setWaMessage] = useState('¡Hola! Me gustaría agendar una cita de evaluación dental.');

  // Before/After Gallery filter/toggle state
  const [activeCaseIdx, setActiveCaseIdx] = useState<Record<string, boolean>>({});

  const availableTimes = ['09:00', '10:00', '11:30', '12:30', '16:00', '17:00', '18:00'];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const newAppt: Appointment = {
      id: `CIT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: `PAC-NEW-${Math.floor(100 + Math.random() * 900)}`,
      patientName,
      patientPhone,
      service: selectedService,
      dentistName: 'Dra. Elena Del Valle',
      date: selectedDate,
      time: selectedTime,
      status: 'Pendiente',
      source: 'Web Pública',
      notes: patientNotes || 'Agendado desde el sitio web público.',
      cost: 1200
    };

    onAddNewAppointment(newAppt);
    setBookingSubmitted(newAppt);
  };

  const handleSendWhatsApp = (customMsg?: string) => {
    const textToSend = customMsg || waMessage;
    const encodedText = encodeURIComponent(textToSend);
    window.open(`https://wa.me/525541239876?text=${encodedText}`, '_blank');
  };

  return (
    <div className="relative pb-24 lg:pb-12 space-y-12">
      {/* 1. HERO & PRESENTATION SECTION */}
      {(!activeModule || activeModule === 'home') && (
        <section className="space-y-12 animate-in fade-in duration-300">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 md:p-14 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Clínica Dental del Valle - Salud & Estética Dental</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Transformamos tu sonrisa con tecnología 3D y calidez humana.
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Dirigido por la Dra. Elena Del Valle. Especialistas en ortodoncia invisible, diseño de sonrisa, implantes y odontopediatría en la Col. Del Valle, CDMX.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => onSelectModule('booking')}
                  className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/25 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Cita en Línea</span>
                </button>

                <button
                  onClick={() => setWaModalOpen(true)}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Consulta por WhatsApp</span>
                </button>
              </div>

              {/* Stats highlights */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <p className="text-2xl font-bold text-sky-400">+12,000</p>
                  <p className="text-xs text-slate-400">Pacientes Atendidos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-sky-400">15+ Años</p>
                  <p className="text-xs text-slate-400">Experiencia Clínica</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-2xl font-bold text-sky-400">4.9 / 5.0 ★</p>
                  <p className="text-xs text-slate-400">Opiniones Verificadas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors presentation */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 text-center">
              <div className="relative inline-block">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80"
                  alt="Dra. Elena Del Valle"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-lg mx-auto"
                />
                <span className="absolute bottom-2 right-2 px-3 py-1 bg-teal-600 text-white text-[11px] font-bold rounded-full shadow">
                  Directora Médica
                </span>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Dra. Elena Del Valle & Equipo
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Especialista en Rehabilitación Oral & Odontología Estética
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Nuestra misión es ofrecerte un diagnóstico preciso y un tratamiento sin dolor en instalaciones modernas diseñadas para tu total confort. Contamos con escáner intraoral 3D y quirófano esterilizado bajo estándares internacionales.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Escáner Intraoral 3D</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Sedación Consciente Disponible</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Garantía de Tratamiento</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Estacionamiento & Valet</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. SPECIALTIES SECTION */}
      {(activeModule === 'home' || activeModule === 'specialties') && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                Nuestros Servicios
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Especialidades Odontológicas
              </h2>
            </div>
            {activeModule === 'home' && (
              <button
                onClick={() => onSelectModule('specialties')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center space-x-1"
              >
                <span>Ver todas las especialidades</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLINIC_SPECIALITIES.map((esp) => (
              <div
                key={esp.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={esp.image}
                      alt={esp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white">
                      {esp.title}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {esp.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedService(esp.title);
                      onSelectModule('booking');
                    }}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Agendar {esp.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. BEFORE & AFTER GALLERY */}
      {(activeModule === 'home' || activeModule === 'gallery') && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                Casos Clínicos de Éxito
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Galería de Resultados (Antes y Después)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BEFORE_AFTER_CASES.map((item) => {
              const showAfter = activeCaseIdx[item.id] ?? true;
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100">
                      {item.category}
                    </span>
                    <button
                      onClick={() =>
                        setActiveCaseIdx((prev) => ({
                          ...prev,
                          [item.id]: !showAfter
                        }))
                      }
                      className="text-xs font-semibold text-slate-500 hover:text-teal-600 underline cursor-pointer"
                    >
                      Ver {showAfter ? 'Antes' : 'Después'}
                    </button>
                  </div>

                  <div className="relative h-52 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={showAfter ? item.afterImg : item.beforeImg}
                      alt={item.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    <span
                      className={`absolute top-2 left-2 px-2.5 py-1 text-[10px] font-bold rounded-md shadow text-white ${
                        showAfter ? 'bg-emerald-600' : 'bg-slate-700'
                      }`}
                    >
                      {showAfter ? 'DESPUÉS (Resultado Final)' : 'ANTES (Diagnóstico Inicial)'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. ONLINE BOOKING FORM */}
      {(activeModule === 'home' || activeModule === 'booking') && (
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Reserva en Tiempo Real</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Agendamiento de Citas en Línea
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Seleccione el servicio, la fecha y el horario de su preferencia para confirmar su atención en la clínica.
            </p>
          </div>

          {bookingSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-teal-50 border border-teal-200 rounded-2xl p-6 sm:p-8 text-center space-y-4 max-w-lg mx-auto"
            >
              <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-teal-600/30">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-teal-900">¡Cita Solicitada con Éxito!</h3>
              <p className="text-xs sm:text-sm text-teal-800">
                Hemos registrado su solicitud para el <strong className="font-bold">{bookingSubmitted.date}</strong> a las <strong className="font-bold">{bookingSubmitted.time} hrs</strong>.
              </p>
              <div className="bg-white p-4 rounded-xl border border-teal-100 text-left text-xs space-y-1.5 text-slate-700">
                <p><strong>Código Cita:</strong> {bookingSubmitted.id}</p>
                <p><strong>Paciente:</strong> {bookingSubmitted.patientName}</p>
                <p><strong>Servicio:</strong> {bookingSubmitted.service}</p>
                <p><strong>Doctora:</strong> {bookingSubmitted.dentistName}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() =>
                    handleSendWhatsApp(
                      `Hola, acabo de solicitar la cita ${bookingSubmitted.id} para el ${bookingSubmitted.date} a las ${bookingSubmitted.time} hrs a nombre de ${bookingSubmitted.patientName}.`
                    )
                  }
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Confirmación por WhatsApp</span>
                </button>
                <button
                  onClick={() => setBookingSubmitted(null)}
                  className="py-3 px-4 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs"
                >
                  Agendar otra cita
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="max-w-3xl mx-auto space-y-6">
              {/* Step 1: Service */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1. Seleccione el Tratamiento / Servicio:
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="Limpieza Dental Ultrasonido y Diagnóstico">Limpieza Dental Ultrasonido y Diagnóstico ($1,200 MXN)</option>
                  <option value="Evaluación de Ortodoncia Invisible">Evaluación de Ortodoncia Invisible ($1,800 MXN)</option>
                  <option value="Consulta de Valoración Implante Dental">Consulta de Valoración Implante Dental ($1,500 MXN)</option>
                  <option value="Resina Fotocurada Estética">Resina Fotocurada Estética ($1,400 MXN)</option>
                  <option value="Odontopediatría Preventiva">Odontopediatría Preventiva ($950 MXN)</option>
                  <option value="Urgencia / Dolor Agudo Dental">Urgencia / Dolor Agudo Dental ($1,000 MXN)</option>
                </select>
              </div>

              {/* Step 2: Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    2. Fecha deseada:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    3. Horario disponible en tiempo real:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableTimes.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${
                          selectedTime === t
                            ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {t} hrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Patient Info */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  4. Datos de Contacto del Paciente:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 mb-1 block">Nombre Completo:</span>
                    <input
                      type="text"
                      placeholder="Ej. Ana María Martínez"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 mb-1 block">Teléfono / WhatsApp:</span>
                    <input
                      type="tel"
                      placeholder="+52 55 1234 5678"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 mb-1 block">Correo Electrónico (Opcional):</span>
                  <input
                    type="email"
                    placeholder="paciente@correo.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 mb-1 block">Motivo o molestia principal:</span>
                  <textarea
                    rows={2}
                    placeholder="Describa brevemente si siente dolor, molestia o si es una consulta estética..."
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-teal-600/25 transition-all text-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmar y Reservar Cita Dental</span>
              </button>
            </form>
          )}
        </section>
      )}

      {/* 5. CONTACT & LOCATION */}
      {(activeModule === 'home' || activeModule === 'contact') && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 text-white p-6 sm:p-10 rounded-3xl">
          <div className="space-y-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Ubicación & Contacto
            </span>
            <h2 className="text-2xl font-bold text-white">
              Clínica Dental OdontoValle
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>Av. Insurgentes Sur 1240, Col. Del Valle, Benito Juárez, 03100 Ciudad de México, CDMX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <span>+52 55 4123 9876 / +52 55 8899 1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Lunes a Viernes: 09:00 - 19:30 hrs | Sábados: 09:00 - 14:00 hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-4">
            <h3 className="text-sm font-bold text-white">¿Tienes alguna duda rápida antes de agendar?</h3>
            <p className="text-xs text-slate-400">
              Chatea directamente con la Dra. Elena o nuestro personal en recepción vía WhatsApp.
            </p>
            <button
              onClick={() => setWaModalOpen(true)}
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Abrir WhatsApp directo</span>
            </button>
          </div>
        </section>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-20 lg:bottom-6 right-6 z-50">
        <button
          onClick={() => setWaModalOpen(!waModalOpen)}
          className="relative group p-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
          title="Contacto directo por WhatsApp"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
          <MessageSquare className="w-7 h-7" />
        </button>
      </div>

      {/* WHATSAPP MODAL POPUP */}
      <AnimatePresence>
        {waModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-32 lg:bottom-20 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Smile className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Atención WhatsApp Dental</h4>
                  <p className="text-[10px] text-emerald-100">En línea • Respuesta en &lt; 5 min</p>
                </div>
              </div>
              <button
                onClick={() => setWaModalOpen(false)}
                className="text-white/80 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 space-y-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 shadow-sm">
                👋 ¡Hola! Soy la asistente de la Dra. Elena Del Valle. ¿En qué te podemos ayudar hoy?
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Respuestas rápidas:</p>
                <button
                  onClick={() => handleSendWhatsApp('Hola, quiero agendar cita para hoy o esta semana.')}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 hover:border-emerald-300 font-medium transition-colors"
                >
                  📅 Agendar cita urgente
                </button>
                <button
                  onClick={() => handleSendWhatsApp('Hola, quisiera saber los costos de Ortodoncia Invisible.')}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 hover:border-emerald-300 font-medium transition-colors"
                >
                  ✨ Informes de Ortodoncia / Alineadores
                </button>
                <button
                  onClick={() => handleSendWhatsApp('Hola, tengo un dolor dental fuerte, ¿tienen espacio hoy?')}
                  className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 text-slate-800 rounded-xl border border-slate-200 hover:border-emerald-300 font-medium transition-colors text-red-600"
                >
                  🚨 Urgencia dental / Dolor agudo
                </button>
              </div>

              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Escribe tu mensaje..."
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                onClick={() => handleSendWhatsApp()}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Iniciar Chat en WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
