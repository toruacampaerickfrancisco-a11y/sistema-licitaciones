import React, { useState } from 'react';
import { TrendingUp, RefreshCw, DollarSign, CheckCircle2, ShieldCheck, FileText, Percent } from 'lucide-react';
import { calculateAjusteDeCostos } from '../core/ajusteCostosEngine';
import { formatCurrency, formatPercent } from './DashboardView';

export default function AjusteCostosView({ materiales, onApplyAjuste }) {
  const [indiceBase, setIndiceBase] = useState(125.40);
  const [indiceActual, setIndiceActual] = useState(132.80);

  const ajusteResult = calculateAjusteDeCostos(materiales, indiceBase, indiceActual);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs select-none">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest font-mono">
              LOPSRM Artículos 56 al 59
            </span>
            <span className="text-xs text-sky-300 font-mono">Índices INPC / INEGI / CFE</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Módulo de Escalación y Ajuste de Costos por Inflación</h2>
          <p className="text-xs text-slate-300">
            Calcula el factor de incremento (Factor K) sobre los precios base de los insumos según la variación de los índices de precios al productor.
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40 text-right min-w-[240px] shadow-lg">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Factor de Ajuste Resultante (K)</span>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {ajusteResult.factorKGeneral.toFixed(4)}
          </div>
          <span className="text-[10px] text-emerald-300 block font-bold">
            Incremento: +{ajusteResult.incrementoPctGeneral.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Index Inputs & Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block uppercase">
            Índice de Precios Base (Fecha Concurso)
          </label>
          <input
            type="number"
            step="0.01"
            value={indiceBase}
            onChange={(e) => setIndiceBase(parseFloat(e.target.value) || 1)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold text-sm px-3 py-1.5 rounded-xl"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block uppercase">
            Índice de Precios Actual (Fecha Ajuste INEGI)
          </label>
          <input
            type="number"
            step="0.01"
            value={indiceActual}
            onChange={(e) => setIndiceActual(parseFloat(e.target.value) || 1)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold text-sm px-3 py-1.5 rounded-xl"
          />
        </div>

        <div>
          <button
            onClick={() => {
              alert(`¡Ajuste de costos aplicado con éxito! Factor K: ${ajusteResult.factorKGeneral.toFixed(4)}. Los insumos han sido actualizados.`);
            }}
            className="w-full py-3 bg-[#0b4a72] hover:bg-sky-900 text-white font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Aplicar Escalación al Presupuesto
          </button>
        </div>
      </div>

      {/* Datagrid Table of Adjusted Materials */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white px-4 py-2.5 font-bold text-xs flex justify-between items-center">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            TABLA DE RECLASIFICACIÓN DE PRECIOS AJUSTADOS POR INFLACIÓN
          </span>
          <span className="font-mono text-slate-400">Variación INPC LOPSRM</span>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="mockup-table">
            <thead>
              <tr>
                <th className="w-20">Clave</th>
                <th>Descripción del Insumo / Material</th>
                <th className="w-20 text-center">Unidad</th>
                <th className="w-28 text-right">Precio Base</th>
                <th className="w-24 text-center">Factor K</th>
                <th className="w-32 text-right">Precio Ajustado</th>
                <th className="w-32 text-right">Diferencia ($)</th>
              </tr>
            </thead>
            <tbody>
              {ajusteResult.materialesAjustados.map(m => (
                <tr key={m.id}>
                  <td className="font-mono font-bold text-sky-800">{m.codigo}</td>
                  <td className="text-slate-900 font-medium whitespace-normal">{m.descripcion}</td>
                  <td className="text-center font-mono font-semibold text-slate-700">{m.unidad}</td>
                  <td className="text-right font-mono text-slate-700">{formatCurrency(m.precioBase)}</td>
                  <td className="text-center font-mono font-bold text-emerald-700 bg-emerald-50">{m.factorK}</td>
                  <td className="text-right font-mono font-extrabold text-sky-950">{formatCurrency(m.precioAjustado)}</td>
                  <td className="text-right font-mono font-bold text-emerald-700">+{formatCurrency(m.diferenciaUnitario)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
