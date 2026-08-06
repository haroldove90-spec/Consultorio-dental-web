import React, { useState } from 'react';
import { Patient, ToothRecord } from '../../types';
import { InteractiveOdontogram } from './InteractiveOdontogram';
import { 
  Users, Search, Plus, UserCheck, AlertCircle, FileText, Calendar, 
  Smile, Activity, CheckCircle, Edit2, ShieldAlert
} from 'lucide-react';
import { motion } from 'motion/react';

interface PatientManagementProps {
  patients: Patient[];
  onAddPatient: (newPatient: Patient) => void;
  onUpdatePatientOdontogram: (patientId: string, updatedOdontogram: ToothRecord[]) => void;
}

export const PatientManagement: React.FC<PatientManagementProps> = ({
  patients,
  onAddPatient,
  onUpdatePatientOdontogram
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'expediente' | 'odontograma' | 'historial'>('expediente');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Patient Form
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'Masculino' | 'Femenino' | 'Otro'>('Masculino');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [allergies, setAllergies] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [bloodType, setBloodType] = useState('O+');

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
  );

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newPatient: Patient = {
      id: `PAC-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      age: Number(age),
      gender,
      phone,
      email,
      address: 'Col. Centro, CDMX',
      medicalHistory: {
        allergies: allergies ? allergies.split(',').map((s) => s.trim()) : [],
        chronicDiseases: chronicDiseases ? chronicDiseases.split(',').map((s) => s.trim()) : [],
        medications: [],
        bloodType,
        notes: 'Expediente creado en sistema.'
      },
      odontogram: [],
      registeredAt: new Date().toISOString().split('T')[0]
    };

    onAddPatient(newPatient);
    setSelectedPatientId(newPatient.id);
    setShowAddModal(false);

    // Reset Form
    setFullName('');
    setPhone('');
    setEmail('');
    setAllergies('');
    setChronicDiseases('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Patient List */}
        <div className="lg:col-span-1 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base flex items-center space-x-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>Pacientes ({patients.length})</span>
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
              title="Nuevo Paciente"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredPatients.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedPatient?.id === p.id
                    ? 'border-teal-500 bg-teal-50/70 shadow-sm'
                    : 'border-slate-100 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">{p.fullName}</h3>
                    <p className="text-[11px] text-slate-500">{p.id} • {p.age} años • {p.gender}</p>
                  </div>
                  {p.medicalHistory.allergies.length > 0 && (
                    <span className="p-1 bg-red-100 text-red-700 rounded-lg" title="Tiene alergias registradas">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Patient Digital Record Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedPatient ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Header profile */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold text-[10px]">
                      {selectedPatient.id}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">{selectedPatient.fullName}</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedPatient.age} años • {selectedPatient.gender} • Tel: {selectedPatient.phone}
                  </p>
                </div>

                {/* Submodule tabs */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    onClick={() => setActiveTab('expediente')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'expediente' ? 'bg-teal-600 text-white shadow' : 'text-slate-600'
                    }`}
                  >
                    Expediente Médicos
                  </button>
                  <button
                    onClick={() => setActiveTab('odontograma')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === 'odontograma' ? 'bg-teal-600 text-white shadow' : 'text-slate-600'
                    }`}
                  >
                    Odontograma
                  </button>
                </div>
              </div>

              {/* Tab 1: Expediente Médico & Antecedentes */}
              {activeTab === 'expediente' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Allergies Highlight Banner */}
                  {selectedPatient.medicalHistory.allergies.length > 0 && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-red-900">
                      <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider">¡Alergias Destacadas del Paciente!</h4>
                        <p className="text-xs font-semibold mt-0.5">
                          {selectedPatient.medicalHistory.allergies.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Clinical Background Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 uppercase text-[10px]">Enfermedades Crónicas:</span>
                      <p className="font-semibold text-slate-800">
                        {selectedPatient.medicalHistory.chronicDiseases.join(', ') || 'Ninguna reportada'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 uppercase text-[10px]">Medicamentos Actuales:</span>
                      <p className="font-semibold text-slate-800">
                        {selectedPatient.medicalHistory.medications.join(', ') || 'Ninguno'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 uppercase text-[10px]">Tipo de Sangre:</span>
                      <p className="font-bold text-teal-700">{selectedPatient.medicalHistory.bloodType}</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-400 uppercase text-[10px]">Correo Electrónico:</span>
                      <p className="font-semibold text-slate-800">{selectedPatient.email}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Notas de Diagnóstico Inicial:</span>
                    <p className="text-slate-700 leading-relaxed">{selectedPatient.medicalHistory.notes}</p>
                  </div>
                </div>
              )}

              {/* Tab 2: Odontograma */}
              {activeTab === 'odontograma' && (
                <InteractiveOdontogram
                  patient={selectedPatient}
                  onUpdatePatientOdontogram={onUpdatePatientOdontogram}
                />
              )}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
              Seleccione un paciente de la lista para ver su expediente.
            </div>
          )}
        </div>
      </div>

      {/* MODAL CREAR PACIENTE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Registrar Nuevo Paciente</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block">Nombre Completo:</label>
                <input
                  type="text"
                  placeholder="Ej. Sofía Ramírez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block">Edad:</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Género:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block">Teléfono WhatsApp:</label>
                  <input
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block">Tipo de Sangre:</label>
                  <input
                    type="text"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-red-600 block">Alergias (Separadas por coma):</label>
                <input
                  type="text"
                  placeholder="Ej. Penicilina, Latex, AINEs"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-red-200 bg-red-50/50 text-xs focus:bg-white focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block">Enfermedades Crónicas:</label>
                <input
                  type="text"
                  placeholder="Ej. Diabetes, Hipertensión"
                  value={chronicDiseases}
                  onChange={(e) => setChronicDiseases(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Guardar Paciente
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
