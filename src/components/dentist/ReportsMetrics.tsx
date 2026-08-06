import React from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Users, Award, 
  Calendar, CheckCircle2, ArrowUpRight, PieChart, Sparkles 
} from 'lucide-react';

export const ReportsMetrics: React.FC = () => {
  // Financial breakdown & stats
  const dailyIncome = 4200;
  const weeklyIncome = 24800;
  const monthlyIncome = 89500;

  const topTreatments = [
    { name: 'Limpieza Dental & Profilaxis', count: 48, percentage: '35%', revenue: 57600 },
    { name: 'Ortodoncia Invisible Alineadores', count: 22, percentage: '28%', revenue: 39600 },
    { name: 'Resina Fotocurada Estética', count: 36, percentage: '18%', revenue: 50400 },
    { name: 'Implantes & Coronas Zirconio', count: 8, percentage: '12%', revenue: 112000 },
    { name: 'Endodoncia Rotatoria', count: 12, percentage: '7%', revenue: 42000 }
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Periods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Ingresos Hoy</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp className="w-4 h-4" /></span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900">${dailyIncome.toLocaleString()} <span className="text-xs font-semibold text-slate-400">MXN</span></h3>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+15% vs ayer</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Ingresos Semana</span>
            <span className="p-1.5 bg-teal-50 text-teal-600 rounded-lg"><BarChart3 className="w-4 h-4" /></span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900">${weeklyIncome.toLocaleString()} <span className="text-xs font-semibold text-slate-400">MXN</span></h3>
          <p className="text-[11px] text-teal-600 font-semibold flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+22% vs semana previa</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Ingresos Mensuales</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><DollarSign className="w-4 h-4" /></span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900">${monthlyIncome.toLocaleString()} <span className="text-xs font-semibold text-slate-400">MXN</span></h3>
          <p className="text-[11px] text-indigo-600 font-semibold flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Meta mensual alcanzada (94%)</span>
          </p>
        </div>
      </div>

      {/* Main Charts & Popular Treatments Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Treatments Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Tratamientos Más Solicitados</h3>
              <p className="text-xs text-slate-500">Volumen y rendimiento financiero del mes activo.</p>
            </div>
            <Award className="w-5 h-5 text-amber-500" />
          </div>

          <div className="space-y-4">
            {topTreatments.map((t, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>{t.name}</span>
                  <span className="text-teal-700">${t.revenue.toLocaleString()} MXN ({t.count} pac.)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all duration-500"
                    style={{ width: t.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Balance & Conversion Summary */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Balance Financiero & KPIs</h3>
              <p className="text-xs text-slate-500">Indicadores clave de rendimiento clínico.</p>
            </div>
            <PieChart className="w-5 h-5 text-indigo-600" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Citas Web Convertidas</span>
              <p className="text-xl font-bold text-slate-900">88%</p>
              <p className="text-[10px] text-emerald-600 font-semibold">Tasa de Asistencia</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Ticket Promedio / Paciente</span>
              <p className="text-xl font-bold text-slate-900">$2,450 MXN</p>
              <p className="text-[10px] text-teal-600 font-semibold">Por consulta realizada</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Pacientes Nuevos (Mes)</span>
              <p className="text-xl font-bold text-slate-900">+34</p>
              <p className="text-[10px] text-indigo-600 font-semibold">Captados vía Web Pública</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Ausentismo / Cancelaciones</span>
              <p className="text-xl font-bold text-slate-900">4.2%</p>
              <p className="text-[10px] text-emerald-600 font-semibold">Reducido con WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
