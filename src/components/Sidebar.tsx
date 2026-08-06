import React from 'react';
import { UserRole } from '../types';
import { 
  Globe, Sparkles, Users, Calendar, DollarSign, BarChart3, 
  ShieldCheck, CreditCard, AlertTriangle, Smile, Home, Image, 
  MapPin, Clock, FileText, CheckSquare, Settings
} from 'lucide-react';

interface SidebarProps {
  currentRole: UserRole;
  activeModule: string;
  onSelectModule: (moduleId: string) => void;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const getNavItemsForRole = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'public':
      return [
        { id: 'home', label: 'Inicio', icon: <Home className="w-5 h-5" /> },
        { id: 'specialties', label: 'Especialidades', icon: <Sparkles className="w-5 h-5" /> },
        { id: 'gallery', label: 'Antes y Después', icon: <Image className="w-5 h-5" /> },
        { id: 'booking', label: 'Agendar Cita', icon: <Calendar className="w-5 h-5" /> },
        { id: 'contact', label: 'Ubicación & Horarios', icon: <MapPin className="w-5 h-5" /> },
      ];

    case 'superadmin':
      return [
        { id: 'clinics', label: 'Gestión de Clientes', icon: <Users className="w-5 h-5" /> },
        { id: 'subscriptions', label: 'Membresías & Pagos', icon: <CreditCard className="w-5 h-5" /> },
        { id: 'alerts', label: 'Alertas Vencimiento', icon: <AlertTriangle className="w-5 h-5" /> },
      ];

    case 'dentist':
      return [
        { id: 'patients', label: 'Expediente Pacientes', icon: <Users className="w-5 h-5" /> },
        { id: 'odontogram', label: 'Odontograma 3D', icon: <Smile className="w-5 h-5" /> },
        { id: 'agenda', label: 'Agenda & Citas', icon: <Calendar className="w-5 h-5" /> },
        { id: 'financial', label: 'Finanzas & Recibos', icon: <DollarSign className="w-5 h-5" /> },
        { id: 'reports', label: 'Reportes & Métricas', icon: <BarChart3 className="w-5 h-5" /> },
      ];

    case 'patient':
      return [
        { id: 'portal', label: 'Mis Citas', icon: <Calendar className="w-5 h-5" /> },
        { id: 'history', label: 'Historial Dental', icon: <FileText className="w-5 h-5" /> },
        { id: 'billing', label: 'Estado de Cuenta', icon: <DollarSign className="w-5 h-5" /> },
      ];

    default:
      return [];
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ currentRole, activeModule, onSelectModule }) => {
  const navItems = getNavItemsForRole(currentRole);

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-65px)] p-4 shrink-0">
      <div className="mb-4 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Módulos de {currentRole === 'public' ? 'Página Web' : currentRole === 'superadmin' ? 'SuperAdmin' : currentRole === 'dentist' ? 'Dentista' : 'Paciente'}
        </p>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-sky-50 text-sky-600 border border-sky-100/80 shadow-sm'
                  : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
              }`}
            >
              <span className={isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-sky-600'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-100">
        <div className="p-3 bg-sky-50/60 rounded-2xl border border-sky-100 flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
          <p className="text-xs font-semibold text-sky-800">
            {currentRole === 'superadmin' ? 'SaaS Activo' : 'Consultorio Conectado'}
          </p>
        </div>
      </div>
    </aside>
  );
};
