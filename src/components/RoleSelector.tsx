import React from 'react';
import { UserRole } from '../types';
import { Globe, ShieldCheck, Stethoscope, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface RoleSelectorProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  const roles: { id: UserRole; title: string; icon: React.ReactNode; bg: string; text: string; badge: string }[] = [
    {
      id: 'public',
      title: 'Vista Pública',
      icon: <Globe className="w-10 h-10" />,
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      badge: 'Paciente Final'
    },
    {
      id: 'superadmin',
      title: 'SuperAdministrador',
      icon: <ShieldCheck className="w-10 h-10" />,
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      badge: 'Gestión SaaS'
    },
    {
      id: 'dentist',
      title: 'Dentista / Odontólogo',
      icon: <Stethoscope className="w-10 h-10" />,
      bg: 'bg-sky-50',
      text: 'text-sky-600',
      badge: 'Control Interno'
    },
    {
      id: 'patient',
      title: 'Portal Paciente',
      icon: <User className="w-10 h-10" />,
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      badge: 'Autogestión'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-4xl mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-600 text-white rounded-2xl shadow-lg shadow-sky-200 mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">
            Consultorio Dental
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Bienvenido de nuevo, selecciona tu acceso
          </p>
        </div>

        {/* 2-Column Minimalist Role Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {roles.map((role, idx) => (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectRole(role.id)}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer text-center"
            >
              <div className={`w-20 h-20 ${role.bg} ${role.text} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              <span className="text-xl font-bold text-slate-700">{role.title}</span>
              <div className="mt-4 px-4 py-1 rounded-full bg-slate-100 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                {role.badge}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-10 text-center text-xs text-slate-400 font-medium">
          Seleccione una modalidad para ingresar a la plataforma.
        </div>
      </div>
    </div>
  );
};
