import React from 'react';
import { Wrench, Shield, Zap, DollarSign, Calculator, ChevronRight, HelpCircle } from 'lucide-react';
import { calculateEquipoCostoHorario } from '../core/costoHorarioEngine';
import { formatCurrency } from './DashboardView';

export default function CostoHorarioView({ equipos, onUpdateEquipo }) {
  const [selectedEquipoId, setSelectedEquipoId] = React.useState(equipos[0]?.id || 'EQ_01');
  const selectedEquipo = equipos.find(e => e.id === selectedEquipoId) || equipos[0];

  const chData = calculateEquipoCostoHorario(selectedEquipo || {});

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto font-sans text-xs select-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b4a72] via-slate-900 to-sky-950 p-6 rounded-2xl border border-sky-500/30 text-white shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-sky-400 bg-sky-500/20 px-3 py-1 rounded-full border border-sky-500/30 font-mono">
            LOPSRM Artículos 194 al 212 - Maquinaria y Equipo
          </span>
          <span className="text-xs text-sky-300 font-mono font-bold">Análisis de Costo Horario Nube</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Análisis Detallado de Precio Horario de Maquinaria (Phm)</h2>
        <p className="text-xs text-slate-300">
          Calcula automáticamente los Costos Fijos (Depreciación, Inversión, Seguros, Mantenimiento), Consumos (Diésel/Gasolina, Aceite) y Operación con desglose normativo oficial.
        </p>
      </div>

      {/* Main Grid: Left Equipo Selector + Right Calculation Sheet */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left List of Equipment */}
        <div className="bg-white rounded-2xl border border-slate-300 shadow-md p-4 space-y-3">
          <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider border-b border-slate-200 pb-2">
            Catálogo de Maquinaria ({equipos.length})
          </span>
          <div className="space-y-1">
            {equipos.map(eq => {
              const isSelected = eq.id === selectedEquipoId;
              return (
                <div
                  key={eq.id}
                  onClick={() => setSelectedEquipoId(eq.id)}
                  className={`p-2.5 rounded-xl cursor-pointer transition flex items-center justify-between border ${
                    isSelected
                      ? 'bg-sky-50 border-sky-600 text-sky-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="font-mono text-[10px] text-sky-700 block">{eq.codigo}</span>
                    <span className="text-xs truncate block">{eq.descripcion}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sky-700' : 'text-slate-400'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Cost Calculation Sheet */}
        <div className="md:col-span-3 space-y-6">
          {/* Equipment Top Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded">
                CLAVE EQUIPO: {selectedEquipo?.codigo}
              </span>
              <h3 className="text-lg font-bold text-slate-900">{selectedEquipo?.descripcion}</h3>
              <span className="text-xs text-slate-500">Unidad de Medida: <strong className="text-slate-800">{selectedEquipo?.unidad || 'HORA'}</strong></span>
            </div>

            <div className="bg-sky-950 text-white p-4 rounded-xl text-right min-w-[200px] shadow-lg border border-sky-800">
              <span className="text-[10px] text-sky-300 font-semibold block uppercase">Costo Horario Total (Phm)</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {formatCurrency(chData.costoHorarioTotal)}
              </span>
              <span className="text-[10px] text-slate-400 block">/ Hora efectiva</span>
            </div>
          </div>

          {/* Breakdown Categories: 1. Costos Fijos, 2. Consumos, 3. Operación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Costos Fijos */}
            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
              <h4 className="font-extrabold text-sky-900 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2">
                <span>1. Costos Fijos</span>
                <span className="font-mono text-emerald-700">{formatCurrency(chData.totalCostoFijo)}</span>
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between text-slate-700">
                  <span>Depreciación (D):</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.depreciacion)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Inversión (I):</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.inversion)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Seguros (S):</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.seguros)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Mantenimiento (M):</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.mantenimiento)}</span>
                </div>
              </div>
            </div>

            {/* 2. Consumos */}
            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
              <h4 className="font-extrabold text-amber-900 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2">
                <span>2. Consumos</span>
                <span className="font-mono text-amber-700">{formatCurrency(chData.totalConsumos)}</span>
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between text-slate-700">
                  <span>Combustible ({chData.consumoCombustibleLts.toFixed(2)} Lts):</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.costoCombustible)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Lubricantes ({chData.consumoLubricanteLts.toFixed(2)} Lts):</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.costoLubricante)}</span>
                </div>
              </div>
            </div>

            {/* 3. Operación */}
            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-sm space-y-3">
              <h4 className="font-extrabold text-purple-900 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2">
                <span>3. Operación</span>
                <span className="font-mono text-purple-700">{formatCurrency(chData.costoOperacion)}</span>
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between text-slate-700">
                  <span>Salario Operador / Hora:</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(chData.costoOperacion)}</span>
                </div>
                <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                  Calculado sobre 8 hrs jornal ordinario conforme a Ley.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
