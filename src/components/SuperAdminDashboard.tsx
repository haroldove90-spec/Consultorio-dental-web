import React, { useState } from 'react';
import { Clinic } from '../types';
import { 
  Users, Plus, Edit3, Trash2, ShieldCheck, CreditCard, AlertTriangle, 
  Lock, Unlock, Globe, Key, CheckCircle, Search, RefreshCw, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuperAdminDashboardProps {
  activeModule: string;
  clinics: Clinic[];
  onUpdateClinic: (updated: Clinic) => void;
  onAddClinic: (newClinic: Clinic) => void;
  onDeleteClinic: (clinicId: string) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  activeModule,
  clinics,
  onUpdateClinic,
  onAddClinic,
  onDeleteClinic
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  // New Clinic Form State
  const [name, setName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [plan, setPlan] = useState<'Básico' | 'Pro' | 'Enterprise'>('Pro');

  // Generated Credentials Modal State
  const [generatedCreds, setGeneratedCreds] = useState<{ email: string; pass: string; clinicName: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredClinics = clinics.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expiredClinics = clinics.filter((c) => c.status === 'Vencido' || c.status === 'Bloqueado');

  const handleCreateClinicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const monthlyFee = plan === 'Básico' ? 49 : plan === 'Pro' ? 99 : 199;
    const initialPass = `Dental#${Math.floor(1000 + Math.random() * 9000)}`;

    const newClinic: Clinic = {
      id: `CLI-${Math.floor(100 + Math.random() * 900)}`,
      name,
      doctorName,
      email,
      phone,
      address,
      city,
      plan,
      status: 'Activo',
      nextBillingDate: '2026-09-06',
      monthlyFee,
      publicWebActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddClinic(newClinic);
    setShowAddModal(false);

    // Show generated credentials popup
    setGeneratedCreds({
      email,
      pass: initialPass,
      clinicName: name
    });

    // Reset Form
    setName('');
    setDoctorName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCity('');
  };

  const handleToggleStatus = (clinic: Clinic) => {
    const newStatus = clinic.status === 'Bloqueado' ? 'Activo' : 'Bloqueado';
    const updated = {
      ...clinic,
      status: newStatus as Clinic['status'],
      publicWebActive: newStatus === 'Activo' ? clinic.publicWebActive : false
    };
    onUpdateClinic(updated);
  };

  const handleTogglePublicWeb = (clinic: Clinic) => {
    const updated = {
      ...clinic,
      publicWebActive: !clinic.publicWebActive
    };
    onUpdateClinic(updated);
  };

  const handleCopyCredentials = () => {
    if (!generatedCreds) return;
    const text = `Credenciales de Acceso SaaS Dental:\nClínica: ${generatedCreds.clinicName}\nEmail: ${generatedCreds.email}\nContraseña Temporal: ${generatedCreds.pass}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* SaaS Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Clientes</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{clinics.length}</h3>
            <p className="text-[11px] text-teal-600 font-semibold mt-0.5">Clínicas Registradas</p>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ingreso SaaS Mensual</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              ${clinics.filter(c => c.status === 'Activo').reduce((acc, curr) => acc + curr.monthlyFee, 0)} USD
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Suscripciones Activas</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Alertas de Pago</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">{expiredClinics.length}</h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Vencidos o Bloqueados</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Webs Públicas</p>
            <h3 className="text-2xl font-bold text-indigo-600 mt-1">
              {clinics.filter(c => c.publicWebActive).length}
            </h3>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Sitios Web Activos</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Gestión de Clientes (Consultorios SaaS)</h2>
            <p className="text-xs text-slate-500">Alta de dentistas, control de renovaciones y activación de sitios web.</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por clínica o doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Alta de Clínica</span>
            </button>
          </div>
        </div>

        {/* Table list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4 rounded-l-xl">Clínica & Doctor</th>
                <th className="py-3 px-4">Plan & Cuota</th>
                <th className="py-3 px-4">Estado Suscripción</th>
                <th className="py-3 px-4">Próximo Pago</th>
                <th className="py-3 px-4">Página Web</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredClinics.map((clinic) => (
                <tr key={clinic.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-bold text-slate-900">{clinic.name}</p>
                      <p className="text-slate-500 text-[11px]">{clinic.doctorName} • {clinic.city}</p>
                      <p className="text-[10px] text-slate-400">{clinic.email}</p>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-800">{clinic.plan}</span>
                    <p className="text-[11px] text-slate-500">${clinic.monthlyFee} USD/mes</p>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        clinic.status === 'Activo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : clinic.status === 'Vencido'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          clinic.status === 'Activo'
                            ? 'bg-emerald-500'
                            : clinic.status === 'Vencido'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                      ></span>
                      <span>{clinic.status}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 font-medium text-slate-700">
                    {clinic.nextBillingDate}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleTogglePublicWeb(clinic)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1.5 cursor-pointer transition-colors ${
                        clinic.publicWebActive
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                          : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{clinic.publicWebActive ? 'Web Activa' : 'Inactiva'}</span>
                    </button>
                  </td>

                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(clinic)}
                      className={`p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                        clinic.status === 'Bloqueado'
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                      title={clinic.status === 'Bloqueado' ? 'Desbloquear acceso' : 'Bloquear acceso por falta de pago'}
                    >
                      {clinic.status === 'Bloqueado' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() =>
                        setGeneratedCreds({
                          email: clinic.email,
                          pass: `Temp#${Math.floor(1000 + Math.random() * 9000)}`,
                          clinicName: clinic.name
                        })
                      }
                      className="p-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      title="Generar credenciales de acceso iniciales"
                    >
                      <Key className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteClinic(clinic.id)}
                      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                      title="Eliminar cliente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL ALTA CLINICA */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Alta de Nueva Clínica Dental</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateClinicSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Nombre del Consultorio:</label>
                  <input
                    type="text"
                    placeholder="Ej. Clínica Sonrisa Sana"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Dentista Titular:</label>
                  <input
                    type="text"
                    placeholder="Ej. Dr. Mario Ortiz"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Correo de Acceso:</label>
                  <input
                    type="email"
                    placeholder="doctor@consultorio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Teléfono WhatsApp:</label>
                  <input
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Ciudad:</label>
                  <input
                    type="text"
                    placeholder="Ej. Querétaro"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Plan de Membresía:</label>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value as any)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Básico">Básico ($49 USD/mes)</option>
                    <option value="Pro">Pro ($99 USD/mes)</option>
                    <option value="Enterprise">Enterprise ($199 USD/mes)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase">Dirección Física:</label>
                <input
                  type="text"
                  placeholder="Av. Principal 123, Col. Centro"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Guardar y Generar Credenciales
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* CREDENTIALS GENERATED POPUP */}
      {generatedCreds && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 text-center"
          >
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
              <Key className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Credenciales Generadas</h3>
              <p className="text-xs text-slate-500 mt-1">Para enviar al dentista titular de {generatedCreds.clinicName}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <p className="text-slate-500">
                <strong>Email:</strong> <span className="text-slate-900 font-mono">{generatedCreds.email}</span>
              </p>
              <p className="text-slate-500">
                <strong>Contraseña Temporal:</strong> <span className="text-indigo-600 font-bold font-mono">{generatedCreds.pass}</span>
              </p>
              <p className="text-[10px] text-slate-400 pt-1">
                El dentista podrá ingresar con su email y cambiar su contraseña en el primer inicio de sesión.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopyCredentials}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow flex items-center justify-center space-x-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Credenciales'}</span>
              </button>
              <button
                onClick={() => setGeneratedCreds(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
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
