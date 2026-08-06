import React, { useState } from 'react';
import { UserRole } from '../types';
import { Sparkles, ArrowLeftRight, ChevronDown, Bell, CheckCircle, Globe, ShieldCheck, Stethoscope, User } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRole, onSelectRole, onGoHome }) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, { title: string; icon: React.ReactNode; color: string }> = {
    public: { title: 'Vista Pública', icon: <Globe className="w-4 h-4 text-emerald-600" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    superadmin: { title: 'SuperAdmin SaaS', icon: <ShieldCheck className="w-4 h-4 text-indigo-600" />, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    dentist: { title: 'Dentista / Odontólogo', icon: <Stethoscope className="w-4 h-4 text-sky-600" />, color: 'bg-sky-50 text-sky-700 border-sky-200' },
    patient: { title: 'Portal Paciente', icon: <User className="w-4 h-4 text-orange-600" />, color: 'bg-orange-50 text-orange-700 border-orange-200' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand logo & title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onGoHome}
          className="flex items-center space-x-3 text-slate-800 hover:text-sky-600 transition-colors focus:outline-none"
          title="Ir al selector de roles"
        >
          <div className="w-10 h-10 bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-800 leading-tight">
              Consultorio Dental
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Sistema Dental OS
            </p>
          </div>
        </button>
      </div>

      {/* Center / Right Role Switcher */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Active Role Badge & Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border ${roleLabels[currentRole].color} text-xs sm:text-sm font-semibold transition-all hover:shadow-sm cursor-pointer`}
          >
            {roleLabels[currentRole].icon}
            <span className="hidden xs:inline">{roleLabels[currentRole].title}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-1" />
          </button>

          {/* Role selector dropdown */}
          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Cambiar Rol</span>
                <ArrowLeftRight className="w-3 h-3 text-slate-400" />
              </div>
              <div className="p-1 space-y-1">
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onSelectRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      currentRole === r
                        ? 'bg-sky-50 text-sky-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      {roleLabels[r].icon}
                      <span>{roleLabels[r].title}</span>
                    </div>
                    {currentRole === r && <CheckCircle className="w-3.5 h-3.5 text-sky-600" />}
                  </button>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-1 px-1">
                <button
                  onClick={() => {
                    onGoHome();
                    setRoleMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Regresar al Inicio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User profile indicator */}
        <div className="hidden sm:flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-800">Dr. Alejandro Vera</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Odontólogo</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-sky-100 border-2 border-white shadow-sm flex items-center justify-center text-sky-700 font-bold text-xs italic">
            AV
          </div>
        </div>

        {/* System notification icon */}
        <div className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full ring-2 ring-white"></span>
        </div>
      </div>
    </header>
  );
};
