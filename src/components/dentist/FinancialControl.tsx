import React, { useState } from 'react';
import { PaymentRecord, Patient } from '../../types';
import { 
  DollarSign, Receipt, Plus, Search, FileText, CheckCircle2, 
  Printer, Download, Sparkles, CreditCard, ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface FinancialControlProps {
  payments: PaymentRecord[];
  patients: Patient[];
  onAddPayment: (record: PaymentRecord) => void;
}

export const FinancialControl: React.FC<FinancialControlProps> = ({
  payments,
  patients,
  onAddPayment
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  // New Payment Form
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [treatmentName, setTreatmentName] = useState('Resina Fotocurada Molar');
  const [totalAmount, setTotalAmount] = useState<number>(1400);
  const [paidAmount, setPaidAmount] = useState<number>(1400);
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Efectivo');

  const filteredPayments = payments.filter(
    (p) =>
      p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.treatmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCollected = payments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalPending = payments.reduce((acc, p) => acc + p.remainingAmount, 0);

  const handleCreatePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientObj = patients.find((p) => p.id === patientId);
    const pName = patientObj ? patientObj.fullName : 'Paciente Registrar';

    const remaining = Math.max(0, totalAmount - paidAmount);
    const status = remaining === 0 ? 'Pagado' : paidAmount > 0 ? 'Parcial' : 'Pendiente';

    const newRecord: PaymentRecord = {
      id: `PAG-${Math.floor(100 + Math.random() * 900)}`,
      patientId,
      patientName: pName,
      treatmentName,
      totalAmount,
      paidAmount,
      remainingAmount: remaining,
      date: new Date().toISOString().split('T')[0],
      status,
      paymentMethod,
      receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    onAddPayment(newRecord);
    setSelectedReceipt(newRecord);
    setShowAddPaymentModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ingresos Totales Recaudados</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">${totalCollected.toLocaleString()} MXN</h3>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Pagos confirmados</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Pendiente por Cobrar</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()} MXN</h3>
            <p className="text-[11px] text-amber-700 font-semibold mt-0.5">Abonos pendientes</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recibos Emitidos</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{payments.length}</h3>
            <p className="text-[11px] text-teal-600 font-semibold mt-0.5">Comprobantes válidos</p>
          </div>
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Receipt className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Payment & Budget Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Control Financiero & Presupuestos</h2>
            <p className="text-xs text-slate-500">Registro de pagos, abonos por tratamiento y generación de comprobantes.</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar paciente o recibo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <button
              onClick={() => setShowAddPaymentModal(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Pago / Abono</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50">
                <th className="py-3 px-4 rounded-l-xl">Recibo & Paciente</th>
                <th className="py-3 px-4">Tratamiento</th>
                <th className="py-3 px-4">Monto Total</th>
                <th className="py-3 px-4">Abonado / Restante</th>
                <th className="py-3 px-4">Método & Estatus</th>
                <th className="py-3 px-4 rounded-r-xl text-right">Comprobante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-900">{p.receiptNumber}</p>
                    <p className="text-slate-600 font-medium text-[11px]">{p.patientName}</p>
                    <p className="text-[10px] text-slate-400">{p.date}</p>
                  </td>

                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {p.treatmentName}
                  </td>

                  <td className="py-4 px-4 font-bold text-slate-900">
                    ${p.totalAmount.toLocaleString()} MXN
                  </td>

                  <td className="py-4 px-4">
                    <p className="font-bold text-emerald-600">${p.paidAmount.toLocaleString()} MXN</p>
                    {p.remainingAmount > 0 && (
                      <p className="text-[10px] font-bold text-amber-600">
                        Resta: ${p.remainingAmount.toLocaleString()} MXN
                      </p>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-medium text-slate-700 block">{p.paymentMethod}</span>
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'Pagado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'Parcial'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(p)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 ml-auto cursor-pointer"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Ver Recibo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECEIPT MODAL VIEWER */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6"
          >
            {/* Printable Receipt Frame */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-slate-800 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Clínica Dental OdontoValle</h3>
                  <p className="text-[10px] text-slate-500">Dra. Elena Del Valle • Céd. Prof. 8492019</p>
                  <p className="text-[10px] text-slate-500">Av. Insurgentes Sur 1240, CDMX</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-full">
                    {selectedReceipt.receiptNumber}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Fecha: {selectedReceipt.date}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-slate-400">Paciente:</p>
                <p className="text-sm font-bold text-slate-900">{selectedReceipt.patientName}</p>
              </div>

              <div className="border-t border-b border-slate-200 py-3 space-y-2">
                <p className="text-[10px] font-bold uppercase text-slate-400">Concepto de Tratamiento:</p>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{selectedReceipt.treatmentName}</span>
                  <span>${selectedReceipt.totalAmount.toLocaleString()} MXN</span>
                </div>
              </div>

              <div className="space-y-1 text-right">
                <p className="text-xs">Monto Pagado: <strong className="text-emerald-700 font-bold">${selectedReceipt.paidAmount.toLocaleString()} MXN</strong></p>
                <p className="text-xs">Saldo Restante: <strong className="text-slate-900 font-bold">${selectedReceipt.remainingAmount.toLocaleString()} MXN</strong></p>
                <p className="text-[10px] text-slate-500 pt-1">Método de Pago: {selectedReceipt.paymentMethod}</p>
              </div>

              <div className="text-center pt-4 border-t border-slate-200 text-[10px] text-slate-400">
                ¡Gracias por confiar tu salud dental en Clínica OdontoValle!
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => window.print()}
                className="py-2.5 px-4 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow flex items-center space-x-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Recibo</span>
              </button>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL REGISTRAR PAGO */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Registrar Pago / Abono</h3>
              <button onClick={() => setShowAddPaymentModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreatePaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block">Seleccionar Paciente:</label>
                <select
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs outline-none"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>{p.fullName} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block">Concepto / Tratamiento:</label>
                <input
                  type="text"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block">Costo Total ($ MXN):</label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block">Monto Abonado ($ MXN):</label>
                  <input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block">Método de Pago:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs outline-none"
                >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta de Débito/Crédito</option>
                  <option value="Transferencia">Transferencia SPEI</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddPaymentModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  Emitir Recibo
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
