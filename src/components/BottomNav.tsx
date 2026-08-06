import React from 'react';
import { UserRole } from '../types';
import { getNavItemsForRole } from './Sidebar';

interface BottomNavProps {
  currentRole: UserRole;
  activeModule: string;
  onSelectModule: (moduleId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentRole, activeModule, onSelectModule }) => {
  const navItems = getNavItemsForRole(currentRole);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const isActive = activeModule === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectModule(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-sky-600 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-sky-50' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] sm:text-xs tracking-tight line-clamp-1 mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
