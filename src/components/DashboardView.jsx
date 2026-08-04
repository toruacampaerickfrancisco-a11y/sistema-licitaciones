import React from 'react';
import { DollarSign, Percent, FileText, Layers, TrendingUp, ShieldCheck, ArrowUpRight, Sparkles, PieChart, CheckCircle2 } from 'lucide-react';

export function formatCurrency(num) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(num || 0);
}

export function formatPercent(num) {
  return ((num || 0) * 100).toFixed(4) + '%';
}

export default function DashboardView({ projectData, catalogResult, apuResult, fsrResult, setActiveTab, setSelectedApuId }) {
  const totalPropuesta = catalogResult.totalPropuesta;
  const totalCD = catalogResult.totalCostoDirectoPropuesta;
  const sobrecostosImporte = catalogResult.diferenciaSobrecostos;

  const pctCD = totalPropuesta > 0 ? (totalCD / totalPropuesta) * 100 : 0;
  const pctSobrecostos = totalPropuesta > 0 ? (sobrecostosImporte / totalPropuesta) * 100 : 0;

  // Aggregate breakdown across APU cards
  let totalMat = 0;
  let totalMo = 0;
  let totalEq = 0;
  let totalHmEs = 0;

  catalogResult.conceptosCalculados.forEach(c => {
    if (!c.esEncabezado && c.apuId) {
      const apu = apuResult.tarjetasCalculadas[c.apuId];
      if (apu) {
        totalMat += (apu.sumaMateriales || 0) * c.cantidad;
        totalMo += (apu.sumaManoObra || 0) * c.cantidad;
        totalEq += (apu.sumaEquipo || 0) * c.cantidad;
        totalHmEs += (apu.sumaHerramientaSeguridad || 0) * c.cantidad;
      }
    }
  });

  const pctMat = totalPropuesta > 0 ? (totalMat / totalPropuesta) * 100 : 0;
  const pctMo = totalPropuesta > 0 ? (totalMo / totalPropuesta) * 100 : 0;
  const pctEq = totalPropuesta > 0 ? (totalEq / totalPropuesta) * 100 : 0;
  const pctHmEs = totalPropuesta > 0 ? (totalHmEs / totalPropuesta) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="relative overflow-hidden rounded-3xl glass-panel-glow p-8 border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Licitación Oficial CFE
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {projectData.info.obra}
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              Concurso No. <span className="text-emerald-400 font-bold font-mono">{projectData.info.licitacion}</span> | Contratista: <span className="text-slate-200 font-bold">{projectData.info.licitante}</span>
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 text-right min-w-[280px] shadow-xl">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Importe Total de la Propuesta</span>
            <div className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-mono mt-1">
              {formatCurrency(totalPropuesta)}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">M.N. Sin I.V.A. (Cumple LOPSRM)</span>
          </div>
        </div>

        {/* Visual Cost Composition Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-emerald-400" />
              Composición Global de la Oferta Económica
            </span>
            <span className="text-slate-400 font-mono">100% Presupuestado</span>
          </div>

          <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800 shadow-inner">
            <div style={{ width: `${pctMat}%` }} className="bg-emerald-500 h-full rounded-l-full transition-all duration-500" title={`Materiales: ${pctMat.toFixed(1)}%`}></div>
            <div style={{ width: `${pctMo}%` }} className="bg-amber-500 h-full transition-all duration-500" title={`Mano de Obra: ${pctMo.toFixed(1)}%`}></div>
            <div style={{ width: `${pctEq}%` }} className="bg-cyan-500 h-full transition-all duration-500" title={`Equipo: ${pctEq.toFixed(1)}%`}></div>
            <div style={{ width: `${pctHmEs}%` }} className="bg-purple-500 h-full transition-all duration-500" title={`Herramientas/Seg: ${pctHmEs.toFixed(1)}%`}></div>
            <div style={{ width: `${pctSobrecostos}%` }} className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-r-full transition-all duration-500" title={`Sobrecostos & Utilidad: ${pctSobrecostos.toFixed(1)}%`}></div>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] font-semibold pt-1">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Materiales: {pctMat.toFixed(1)}% ({formatCurrency(totalMat)})
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Mano de Obra: {pctMo.toFixed(1)}% ({formatCurrency(totalMo)})
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Equipo: {pctEq.toFixed(1)}% ({formatCurrency(totalEq)})
            </div>
            <div className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Herram/Seg: {pctHmEs.toFixed(1)}% ({formatCurrency(totalHmEs)})
            </div>
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400"></span> Indirectos/Utilidad: {pctSobrecostos.toFixed(1)}% ({formatCurrency(sobrecostosImporte)})
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Costo Directo (CD)</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-3">
            {formatCurrency(totalCD)}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between font-medium">
            <span>Proporción CD:</span>
            <span className="font-bold text-blue-400 font-mono">{pctCD.toFixed(2)}%</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sobrecostos Totales</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-3">
            {formatCurrency(sobrecostosImporte)}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between font-medium">
            <span>Factor Sobrecosto:</span>
            <span className="font-bold text-amber-400 font-mono">+{pctSobrecostos.toFixed(2)}%</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Factor Salario Real</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-purple-400 font-mono mt-3">
            {(fsrResult.tpOverTl || 0).toFixed(4)}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between font-medium">
            <span>Días Tp / Tl:</span>
            <span className="font-bold text-purple-300 font-mono">{fsrResult.tp} / {fsrResult.tl}</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conceptos Obra</span>
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-3">
            {catalogResult.conceptosCalculados.filter(c => !c.esEncabezado).length} Partidas
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between font-medium">
            <span>Tarjetas APU activas:</span>
            <span className="font-bold text-teal-400 font-mono">{Object.keys(apuResult.tarjetasCalculadas).length} Tarjetas</span>
          </div>
        </div>
      </div>

      {/* Grid with Overheads breakdown and Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overheads Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Matriz de Sobrecostos de Licitación CFE
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">1. Costo Indirecto (%I)</span>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400 font-mono">{formatPercent(projectData.sobrecostos.indirectos)}</div>
                <div className="text-[10px] text-slate-400">Oficina central + campo</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">2. Financiamiento (%F)</span>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400 font-mono">{formatPercent(projectData.sobrecostos.financiamiento)}</div>
                <div className="text-[10px] text-slate-400">Flujo de caja contratista</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">3. Cargo por Utilidad (%U)</span>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400 font-mono">{formatPercent(projectData.sobrecostos.utilidad)}</div>
                <div className="text-[10px] text-slate-400">Ganancia neta licitación</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">4. Cargos Adicionales (%A)</span>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400 font-mono">{formatPercent(projectData.sobrecostos.cargosAdicionales)}</div>
                <div className="text-[10px] text-slate-400">5 al millar (SFP/CFE)</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-slate-950/70 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">5. Herramienta y Seguridad</span>
              <div className="text-right">
                <div className="text-xs font-bold text-purple-400 font-mono">
                  Kh: {formatPercent(projectData.sobrecostos.herramientaMano)} | Ks: {formatPercent(projectData.sobrecostos.equipoSeguridad)}
                </div>
                <div className="text-[10px] text-slate-400">Aplicado sobre Mano de Obra</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('sobrecostos')}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 shadow-md"
          >
            Ajustar Porcentajes de Sobrecostos <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Top APUs Table */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Precios Unitarios (APU) Destacados
            </h3>
            <button
              onClick={() => setActiveTab('apu')}
              className="text-xs text-emerald-400 hover:underline font-bold"
            >
              Ver todas las tarjetas ({Object.keys(apuResult.tarjetasCalculadas).length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Código</th>
                  <th className="py-3 px-3">Concepto</th>
                  <th className="py-3 px-3">Unidad</th>
                  <th className="py-3 px-3 text-right">C. Directo</th>
                  <th className="py-3 px-3 text-right">P. Unitario</th>
                  <th className="py-3 px-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-medium">
                {Object.values(apuResult.tarjetasCalculadas).map(apu => (
                  <tr key={apu.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{apu.codigoConcepto}</td>
                    <td className="py-3 px-3 text-slate-200 line-clamp-2">{apu.descripcion}</td>
                    <td className="py-3 px-3 text-slate-400 font-mono">{apu.unidad}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">{formatCurrency(apu.costoDirecto)}</td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-400 font-bold text-sm">{formatCurrency(apu.precioUnitarioRedondeado)}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedApuId(apu.id);
                          setActiveTab('apu');
                        }}
                        className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-emerald-500/30 transition shadow-sm"
                      >
                        Abrir APU
                      </button>
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
