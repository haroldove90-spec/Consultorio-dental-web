import React, { useState } from 'react';
import { ToothRecord, ToothCondition, ToothSurface, Patient } from '../../types';
import { Smile, Check, Plus, AlertCircle, History, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface InteractiveOdontogramProps {
  patient: Patient;
  onUpdatePatientOdontogram: (patientId: string, updatedOdontogram: ToothRecord[]) => void;
}

export const InteractiveOdontogram: React.FC<InteractiveOdontogramProps> = ({
  patient,
  onUpdatePatientOdontogram
}) => {
  const [isPediatric, setIsPediatric] = useState(patient.isPediatric || false);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(16);
  const [selectedCondition, setSelectedCondition] = useState<ToothCondition>('caries');
  const [surfaceSelection, setSurfaceSelection] = useState<ToothSurface>({ center: 'caries' });
  const [treatmentNotes, setTreatmentNotes] = useState('');

  // Adult FDI scheme: Upper right (18-11), Upper left (21-28), Lower left (31-38), Lower right (41-48)
  const adultUpperRight = [18, 17, 16, 15, 14, 13, 12, 11];
  const adultUpperLeft = [21, 22, 23, 24, 25, 26, 27, 28];
  const adultLowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];
  const adultLowerRight = [48, 47, 46, 45, 44, 43, 42, 41];

  // Pediatric FDI scheme: Upper right (55-51), Upper left (61-65), Lower left (71-75), Lower right (85-81)
  const pediatricUpperRight = [55, 54, 53, 52, 51];
  const pediatricUpperLeft = [61, 62, 63, 64, 65];
  const pediatricLowerLeft = [71, 72, 73, 74, 75];
  const pediatricLowerRight = [85, 84, 83, 82, 81];

  const upperTeeth = isPediatric
    ? [...pediatricUpperRight, ...pediatricUpperLeft]
    : [...adultUpperRight, ...adultUpperLeft];

  const lowerTeeth = isPediatric
    ? [...pediatricLowerRight, ...pediatricLowerLeft]
    : [...adultLowerRight, ...adultLowerLeft];

  const conditionColors: Record<ToothCondition, { bg: string; text: string; label: string; stroke: string }> = {
    sano: { bg: 'bg-emerald-100 text-emerald-800', text: 'Sano / Normal', label: 'Sano', stroke: '#10b981' },
    caries: { bg: 'bg-rose-100 text-rose-800', text: 'Caries Detectada', label: 'Caries', stroke: '#ef4444' },
    endodoncia: { bg: 'bg-sky-100 text-sky-800', text: 'Endodoncia / Conducto', label: 'Endodoncia', stroke: '#0284c7' },
    resina: { bg: 'bg-amber-100 text-amber-800', text: 'Resina Obturada', label: 'Resina', stroke: '#f59e0b' },
    extraccion: { bg: 'bg-slate-200 text-slate-800', text: 'Extracción / Ausente', label: 'Extracción', stroke: '#64748b' },
    corona: { bg: 'bg-purple-100 text-purple-800', text: 'Corona Zirconio/Porcelana', label: 'Corona', stroke: '#8b5cf6' },
    implante: { bg: 'bg-indigo-100 text-indigo-800', text: 'Implante Titanio', label: 'Implante', stroke: '#6366f1' },
    ortodoncia: { bg: 'bg-teal-100 text-teal-800', text: 'Bracket / Alineador', label: 'Ortodoncia', stroke: '#0d9488' }
  };

  const getToothRecord = (num: number) => {
    return patient.odontogram.find((t) => t.toothNumber === num);
  };

  const handleSaveCondition = () => {
    if (!selectedTooth) return;

    const existingIndex = patient.odontogram.findIndex((t) => t.toothNumber === selectedTooth);
    const newRecord: ToothRecord = {
      toothNumber: selectedTooth,
      condition: selectedCondition,
      surfaces: surfaceSelection,
      notes: treatmentNotes || `Marcado ${conditionColors[selectedCondition].label}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    let updatedOdontogram = [...patient.odontogram];
    if (existingIndex >= 0) {
      updatedOdontogram[existingIndex] = newRecord;
    } else {
      updatedOdontogram.push(newRecord);
    }

    onUpdatePatientOdontogram(patient.id, updatedOdontogram);
    setTreatmentNotes('');
  };

  // Render SVG interactive tooth schema with 5 surfaces (Top, Bottom, Left, Right, Center)
  const renderToothSVG = (toothNum: number) => {
    const record = getToothRecord(toothNum);
    const isSelected = selectedTooth === toothNum;
    const cond = record?.condition || 'sano';
    const mainColor = conditionColors[cond].stroke;

    return (
      <div
        key={toothNum}
        onClick={() => {
          setSelectedTooth(toothNum);
          if (record) {
            setSelectedCondition(record.condition);
            if (record.surfaces) setSurfaceSelection(record.surfaces);
            setTreatmentNotes(record.notes || '');
          }
        }}
        className={`flex flex-col items-center p-1.5 rounded-xl cursor-pointer transition-all ${
          isSelected ? 'bg-teal-100 ring-2 ring-teal-500 scale-105 shadow' : 'hover:bg-slate-100'
        }`}
      >
        <span className="text-[10px] font-bold text-slate-600 mb-1">{toothNum}</span>

        {/* 5-Surface Tooth SVG Box */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-white border border-slate-300 rounded-lg p-0.5 shadow-2xs">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Top surface (Vestibular / Palatino) */}
            <polygon
              points="0,0 100,0 70,30 30,30"
              fill={record?.surfaces?.top ? conditionColors[record.surfaces.top].stroke : cond !== 'sano' ? mainColor : '#f8fafc'}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Bottom surface (Lingual) */}
            <polygon
              points="0,100 100,100 70,70 30,70"
              fill={record?.surfaces?.bottom ? conditionColors[record.surfaces.bottom].stroke : cond !== 'sano' ? mainColor : '#f8fafc'}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Left surface (Mesial) */}
            <polygon
              points="0,0 30,30 30,70 0,100"
              fill={record?.surfaces?.left ? conditionColors[record.surfaces.left].stroke : cond !== 'sano' ? mainColor : '#f8fafc'}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Right surface (Distal) */}
            <polygon
              points="100,0 70,30 70,70 100,100"
              fill={record?.surfaces?.right ? conditionColors[record.surfaces.right].stroke : cond !== 'sano' ? mainColor : '#f8fafc'}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Center surface (Oclusal) */}
            <polygon
              points="30,30 70,30 70,70 30,70"
              fill={record?.surfaces?.center ? conditionColors[record.surfaces.center].stroke : cond !== 'sano' ? mainColor : '#ffffff'}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Cross overlay for extraction */}
            {cond === 'extraccion' && (
              <line x1="10" y1="10" x2="90" y2="90" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
            )}
          </svg>
        </div>

        <span className="text-[9px] font-semibold text-slate-500 mt-1 line-clamp-1">
          {conditionColors[cond].label}
        </span>
      </div>
    );
  };

  const currentSelectedRecord = selectedTooth ? getToothRecord(selectedTooth) : null;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Smile className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Odontograma Interactivo — {patient.fullName}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Esquema gráfico visual de dentadura y registro por superficie dental.
          </p>
        </div>

        {/* Dentition type selector */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setIsPediatric(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !isPediatric ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Adulto (32 piezas)
          </button>
          <button
            onClick={() => setIsPediatric(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isPediatric ? 'bg-teal-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Infantil / Deciduo (20 piezas)
          </button>
        </div>
      </div>

      {/* Main Dental Chart Grid */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Upper Arch */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block text-center">
            Maxilar Superior (Arcada Superior)
          </span>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-3 bg-slate-50/70 rounded-2xl border border-slate-200">
            {upperTeeth.map((num) => renderToothSVG(num))}
          </div>
        </div>

        {/* Divider / Bite line */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-200 rounded-full py-0.5">
            Línea de Oclusión / Mordida
          </span>
        </div>

        {/* Lower Arch */}
        <div className="space-y-2">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 p-3 bg-slate-50/70 rounded-2xl border border-slate-200">
            {lowerTeeth.map((num) => renderToothSVG(num))}
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block text-center">
            Maxilar Inferior (Arcada Inferior)
          </span>
        </div>
      </div>

      {/* Tooth Treatment Control & Evolution Form */}
      {selectedTooth && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Action Box */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-xl bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow">
                  {selectedTooth}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Pieza Dental #{selectedTooth}
                  </h3>
                  <p className="text-[11px] text-slate-500">Registrar o actualizar hallazgo clínico</p>
                </div>
              </div>

              {currentSelectedRecord && (
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${conditionColors[currentSelectedRecord.condition].bg}`}>
                  Estado: {conditionColors[currentSelectedRecord.condition].label}
                </span>
              )}
            </div>

            {/* Condition Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Seleccione Diagnóstico / Tratamiento:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(conditionColors) as ToothCondition[]).map((condKey) => (
                  <button
                    key={condKey}
                    type="button"
                    onClick={() => {
                      setSelectedCondition(condKey);
                      setSurfaceSelection({ center: condKey });
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-left border ${
                      selectedCondition === condKey
                        ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-xs ring-1 ring-teal-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {conditionColors[condKey].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes & Evolución */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Observaciones de Evolución Clínica:
              </label>
              <input
                type="text"
                placeholder="Ej. Resina oclusal realizada. Ausencia de sintomatología."
                value={treatmentNotes}
                onChange={(e) => setTreatmentNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <button
              onClick={handleSaveCondition}
              className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Guardar en Odontograma de {patient.fullName}</span>
            </button>
          </div>

          {/* Evolution History Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <History className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-sm">Historial de Evolución</h3>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {patient.odontogram.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No hay registros aún en este odontograma.</p>
              ) : (
                patient.odontogram.map((rec) => (
                  <div key={rec.toothNumber} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Pieza #{rec.toothNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${conditionColors[rec.condition].bg}`}>
                        {conditionColors[rec.condition].label}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{rec.notes}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Actualizado: {rec.updatedAt}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
