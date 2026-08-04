import React from 'react';
import { ShieldCheck, Calendar, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function FsrView({ fsrConfig, fsrResult, onUpdateFsrConfig, onUpdateSalarioTabulado }) {
  const cfg = fsrConfig;
  const res = fsrResult;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            Cálculo del Factor de Salario Real (FSR) y Cargas IMSS/Infonavit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Conforme a la Ley del Seguro Social, Ley del INFONAVIT y la LOPSRM para licitaciones públicas de CFE.
          </p>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-6">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Factor Tp / Tl</span>
            <span className="text-lg font-black text-purple-400 font-mono">{res.tpOverTl?.toFixed(6)}</span>
          </div>
          <div className="border-l border-slate-800 pl-6">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Factor Base (FSBC)</span>
            <span className="text-lg font-black text-emerald-400 font-mono">{res.fsbc?.toFixed(6)}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Form */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4 text-xs">
          <h3 className="font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Días Anuales & Parámetros Oficiales
          </h3>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block font-medium mb-1">Año de Ejecución:</label>
                <input
                  type="number"
                  value={cfg.año}
                  onChange={(e) => onUpdateFsrConfig('año', parseInt(e.target.value) || 2026)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-2 py-1.5 rounded text-center focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-medium mb-1">UMA Diario ($):</label>
                <input
                  type="number"
                  step="any"
                  value={cfg.uma}
                  onChange={(e) => onUpdateFsrConfig('uma', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-2 py-1.5 rounded text-right focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block font-medium mb-1">Salario Mínimo ($):</label>
                <input
                  type="number"
                  step="any"
                  value={cfg.salarioMinimo}
                  onChange={(e) => onUpdateFsrConfig('salarioMinimo', parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-2 py-1.5 rounded text-right focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block font-medium mb-1">% Riesgo Trabajo:</label>
                <input
                  type="number"
                  step="any"
                  value={((cfg.riesgoTrabajo || 0) * 100).toFixed(4)}
                  onChange={(e) => onUpdateFsrConfig('riesgoTrabajo', (parseFloat(e.target.value) || 0) / 100)}
                  className="w-full bg-slate-950 border border-slate-700 text-purple-400 px-2 py-1.5 rounded text-right focus:outline-none focus:border-purple-500 font-mono font-bold"
                />
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase block">Desglose Días Pagados (Tp):</span>
              <div className="flex justify-between items-center text-slate-400">
                <span>Días Calendario (Dical):</span>
                <span className="font-mono text-slate-200 font-bold">{cfg.diasCalendario}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Aguinaldo (Diagi):</span>
                <input
                  type="number"
                  value={cfg.diasAguinaldo}
                  onChange={(e) => onUpdateFsrConfig('diasAguinaldo', parseInt(e.target.value) || 0)}
                  className="w-16 bg-slate-950 border border-slate-700 text-slate-200 px-1.5 py-0.5 rounded text-right font-mono"
                />
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Prima Vacacional (Pivac):</span>
                <input
                  type="number"
                  value={cfg.diasPrimaVacacional}
                  onChange={(e) => onUpdateFsrConfig('diasPrimaVacacional', parseInt(e.target.value) || 0)}
                  className="w-16 bg-slate-950 border border-slate-700 text-slate-200 px-1.5 py-0.5 rounded text-right font-mono"
                />
              </div>
              <div className="flex justify-between items-center text-emerald-400 font-bold pt-1 border-t border-slate-800/60">
                <span>TOTAL DÍAS PAGADOS (Tp):</span>
                <span className="font-mono text-sm">{res.tp} días</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase block">Desglose Días No Laborados (Dinla):</span>
              <div className="flex justify-between items-center text-slate-400">
                <span>Domingos (Didom):</span>
                <span className="font-mono text-slate-200">{cfg.diasDomingo}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Vacaciones (Divac):</span>
                <span className="font-mono text-slate-200">{cfg.diasVacaciones}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Festivos Oficiales (Difeo):</span>
                <span className="font-mono text-slate-200">{cfg.diasFestivos}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Condiciones Sindicales (Disin):</span>
                <span className="font-mono text-slate-200">{cfg.diasSindicales}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Mal Tiempo / Enfermedad (Dicau):</span>
                <span className="font-mono text-slate-200">{cfg.diasImprevistos}</span>
              </div>
              <div className="flex justify-between items-center text-amber-400 font-bold pt-1 border-t border-slate-800/60">
                <span>TOTAL NO LABORADOS (Dinla):</span>
                <span className="font-mono text-sm">{res.dinla} días</span>
              </div>
              <div className="flex justify-between items-center text-purple-400 font-bold pt-1">
                <span>DÍAS REALMENTE LABORADOS (Tl):</span>
                <span className="font-mono text-sm">{res.tl} días</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabulator & Real Wages Table */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="w-4 h-4 text-purple-400" />
            Tabulador de Salarios Base (SUTERM) y Salario Real ($S_r$)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Categoría de Mano de Obra</th>
                  <th className="py-2.5 px-3 text-right">Tabulado SUTERM</th>
                  <th className="py-2.5 px-3 text-right">Salario Base</th>
                  <th className="py-2.5 px-3 text-right">SBC IMSS</th>
                  <th className="py-2.5 px-3 text-right text-purple-400">F.S.R.</th>
                  <th className="py-2.5 px-3 text-right text-emerald-400">Salario Real (Sr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {res.salarios.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 text-slate-200 font-semibold">{s.categoria}</td>
                    <td className="py-3 px-3 text-right font-mono">
                      <input
                        type="number"
                        step="any"
                        value={s.suterm}
                        onChange={(e) => onUpdateSalarioTabulado(idx, parseFloat(e.target.value) || 0)}
                        className="w-24 bg-slate-950 border border-slate-700 focus:border-purple-500 text-slate-200 px-2 py-1 rounded text-right focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{formatCurrency(s.salarioBase)}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">{formatCurrency(s.sbcPesos)}</td>
                    <td className="py-3 px-3 text-right font-mono text-purple-400 font-bold">{s.fsr.toFixed(6)}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-extrabold text-sm">
                      {formatCurrency(s.salarioReal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
