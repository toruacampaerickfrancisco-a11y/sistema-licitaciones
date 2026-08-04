import React from 'react';
import { Sliders, Percent, ShieldAlert, History, HelpCircle } from 'lucide-react';
import { formatPercent } from './DashboardView';

export default function OverheadsView({ sobrecostos, onUpdateSobrecosto }) {
  const sob = sobrecostos;

  const historicalData = [
    { empresa: 'INDUSTREAM S.A. DE C.V.', concurso: 'CFE-0700-CSCON-0040-2025', indirectos: 0.229466, financiamiento: 0.013405, utilidad: 0.100000, adicion: 0.008390, kh: 0.05, ks: 0.05 },
    { empresa: 'SERAMAQ S.A. DE C.V.', concurso: 'CFE-0700-CSCON-0031-2022', indirectos: 0.248900, financiamiento: 0.011200, utilidad: 0.080000, adicion: 0.009600, kh: 0.03, ks: 0.03 },
    { empresa: 'URCOTAM S.A. DE C.V.', concurso: 'CFE-0600-CSCON-0008-2019', indirectos: 0.160000, financiamiento: 0.007100, utilidad: 0.100000, adicion: 0.006026, kh: 0.03, ks: 0.02 }
  ];

  const applyHistoricalAvg = () => {
    const avgI = (0.229466 + 0.248900 + 0.160000) / 3;
    const avgF = (0.013405 + 0.011200 + 0.007100) / 3;
    const avgU = (0.100000 + 0.080000 + 0.100000) / 3;
    const avgA = (0.008390 + 0.009600 + 0.006026) / 3;
    const avgKh = (0.05 + 0.03 + 0.03) / 3;
    const avgKs = (0.05 + 0.03 + 0.02) / 3;

    onUpdateSobrecosto('indirectos', avgI);
    onUpdateSobrecosto('financiamiento', avgF);
    onUpdateSobrecosto('utilidad', avgU);
    onUpdateSobrecosto('cargosAdicionales', avgA);
    onUpdateSobrecosto('herramientaMano', avgKh);
    onUpdateSobrecosto('equipoSeguridad', avgKs);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            Matriz de Sobrecostos y Porcentajes de Licitación
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Definición de factores de Indirectos, Financiamiento, Cargo por Utilidad y Cargos Adicionales según la Ley de Obras Públicas.
          </p>
        </div>

        <button
          onClick={applyHistoricalAvg}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold px-4 py-2.5 rounded-xl border border-amber-500/30 transition shadow-md whitespace-nowrap"
        >
          <History className="w-4 h-4" />
          Cargar Promedio Histórico
        </button>
      </div>

      {/* Main Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Indirectos */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase">1. Costos Indirectos (%I)</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{formatPercent(sob.indirectos)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Gastos de administración central y de campo de la contratista.</p>
          <input
            type="number"
            step="any"
            value={((sob.indirectos || 0) * 100).toFixed(4)}
            onChange={(e) => onUpdateSobrecosto('indirectos', (parseFloat(e.target.value) || 0) / 100)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-emerald-400 text-sm font-mono font-bold p-2 rounded-xl text-right focus:outline-none"
          />
        </div>

        {/* Financiamiento */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase">2. Financiamiento (%F)</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{formatPercent(sob.financiamiento)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Costo de capital derivado de los egresos no cubiertos por anticipos.</p>
          <input
            type="number"
            step="any"
            value={((sob.financiamiento || 0) * 100).toFixed(4)}
            onChange={(e) => onUpdateSobrecosto('financiamiento', (parseFloat(e.target.value) || 0) / 100)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-emerald-400 text-sm font-mono font-bold p-2 rounded-xl text-right focus:outline-none"
          />
        </div>

        {/* Utilidad */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase">3. Cargo por Utilidad (%U)</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{formatPercent(sob.utilidad)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Ganancia neta esperada por el contratista antes de impuestos.</p>
          <input
            type="number"
            step="any"
            value={((sob.utilidad || 0) * 100).toFixed(4)}
            onChange={(e) => onUpdateSobrecosto('utilidad', (parseFloat(e.target.value) || 0) / 100)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-emerald-400 text-sm font-mono font-bold p-2 rounded-xl text-right focus:outline-none"
          />
        </div>

        {/* Cargos Adicionales */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase">4. Cargos Adicionales (%A)</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{formatPercent(sob.cargosAdicionales)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Derecho de inspección (5 al millar CFE/SFP) y auditorías.</p>
          <input
            type="number"
            step="any"
            value={((sob.cargosAdicionales || 0) * 100).toFixed(4)}
            onChange={(e) => onUpdateSobrecosto('cargosAdicionales', (parseFloat(e.target.value) || 0) / 100)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-emerald-400 text-sm font-mono font-bold p-2 rounded-xl text-right focus:outline-none"
          />
        </div>

        {/* Herramienta de Mano */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase">5. Herramienta Menor (%Kh)</span>
            <span className="text-xs font-mono text-purple-400 font-bold">{formatPercent(sob.herramientaMano)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Porcentaje aplicado sobre el costo total de la Mano de Obra.</p>
          <input
            type="number"
            step="any"
            value={((sob.herramientaMano || 0) * 100).toFixed(4)}
            onChange={(e) => onUpdateSobrecosto('herramientaMano', (parseFloat(e.target.value) || 0) / 100)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-purple-500 text-purple-400 text-sm font-mono font-bold p-2 rounded-xl text-right focus:outline-none"
          />
        </div>

        {/* Equipo de Seguridad */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase">6. Equipo Seguridad (%Ks)</span>
            <span className="text-xs font-mono text-purple-400 font-bold">{formatPercent(sob.equipoSeguridad)}</span>
          </div>
          <p className="text-[11px] text-slate-400">Equipo de protección personal (EPP) sobre el costo de Mano de Obra.</p>
          <input
            type="number"
            step="any"
            value={((sob.equipoSeguridad || 0) * 100).toFixed(4)}
            onChange={(e) => onUpdateSobrecosto('equipoSeguridad', (parseFloat(e.target.value) || 0) / 100)}
            className="w-full bg-slate-950 border border-slate-700 focus:border-purple-500 text-purple-400 text-sm font-mono font-bold p-2 rounded-xl text-right focus:outline-none"
          />
        </div>
      </div>

      {/* Historical Benchmarking Table */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" />
          Tabla de Referencia Histórica de Empresas en Licitaciones CFE
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Compañía Licitante</th>
                <th className="py-2.5 px-3">Concurso CFE</th>
                <th className="py-2.5 px-3 text-right">Indirectos (%I)</th>
                <th className="py-2.5 px-3 text-right">Finan. (%F)</th>
                <th className="py-2.5 px-3 text-right">Utilidad (%U)</th>
                <th className="py-2.5 px-3 text-right">Adicional (%A)</th>
                <th className="py-2.5 px-3 text-right">Kh %</th>
                <th className="py-2.5 px-3 text-right">Ks %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-mono font-medium text-slate-300">
              {historicalData.map((h, i) => (
                <tr key={i} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 text-slate-200 font-sans font-bold">{h.empresa}</td>
                  <td className="py-2.5 px-3 text-slate-400">{h.concurso}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">{formatPercent(h.indirectos)}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">{formatPercent(h.financiamiento)}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">{formatPercent(h.utilidad)}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">{formatPercent(h.adicion)}</td>
                  <td className="py-2.5 px-3 text-right text-purple-400">{formatPercent(h.kh)}</td>
                  <td className="py-2.5 px-3 text-right text-purple-400">{formatPercent(h.ks)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
