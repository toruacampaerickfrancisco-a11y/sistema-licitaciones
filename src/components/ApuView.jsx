import React from 'react';
import { Calculator, Hammer, HardHat, Wrench, Shield, ArrowRight, Percent, Sparkles, PieChart } from 'lucide-react';
import { formatCurrency, formatPercent } from './DashboardView';

export default function ApuView({ selectedApuId, setSelectedApuId, apuResult, onUpdateApuItem }) {
  const tarjetas = apuResult.tarjetasCalculadas;
  const apuKeys = Object.keys(tarjetas);
  const currentApu = tarjetas[selectedApuId] || tarjetas[apuKeys[0]];

  if (!currentApu) return null;

  const cd = currentApu.costoDirecto || 1;
  const pctMat = (currentApu.sumaMateriales / cd) * 100;
  const pctMo = (currentApu.sumaManoObra / cd) * 100;
  const pctEq = (currentApu.sumaEquipo / cd) * 100;
  const pctHmEs = (currentApu.sumaHerramientaSeguridad / cd) * 100;

  return (
    <div className="space-y-6">
      {/* Selector of APUs */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 whitespace-nowrap flex items-center gap-1.5">
          <Calculator className="w-4 h-4 text-emerald-400" />
          Seleccionar Tarjeta:
        </span>
        {apuKeys.map((key) => {
          const card = tarjetas[key];
          const isActive = card.id === currentApu.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedApuId(card.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Concepto {card.codigoConcepto}
            </button>
          );
        })}
      </div>

      {/* APU Main Card Header */}
      <div className="glass-panel-glow p-6 rounded-3xl border border-emerald-500/20 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 font-mono">
                CONCEPTO {currentApu.codigoConcepto} | ESPEC. {currentApu.especificacion}
              </span>
              <span className="text-xs text-slate-400 font-mono font-medium">Hoja {currentApu.hoja} de {currentApu.totalHojas}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-1 leading-snug">
              {currentApu.descripcion}
            </h2>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 text-right min-w-[220px] shadow-lg">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Precio Unitario Final (PU)</span>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono mt-0.5">
              {formatCurrency(currentApu.precioUnitarioRedondeado)}
            </div>
            <span className="text-[11px] text-slate-400 font-mono">por {currentApu.unidad}</span>
          </div>
        </div>

        {/* Visual Progress Bar for Direct Cost Breakdown */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300 flex items-center gap-1.5">
              <PieChart className="w-3.5 h-3.5 text-emerald-400" />
              Desglose Relativo del Costo Directo (CD = {formatCurrency(currentApu.costoDirecto)})
            </span>
            <span className="text-emerald-400 font-mono">100% CD</span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div style={{ width: `${pctMat}%` }} className="bg-emerald-500 h-full rounded-l-full" title={`Materiales: ${pctMat.toFixed(1)}%`}></div>
            <div style={{ width: `${pctMo}%` }} className="bg-amber-500 h-full" title={`Mano de Obra: ${pctMo.toFixed(1)}%`}></div>
            <div style={{ width: `${pctEq}%` }} className="bg-cyan-500 h-full" title={`Equipo: ${pctEq.toFixed(1)}%`}></div>
            <div style={{ width: `${pctHmEs}%` }} className="bg-purple-500 h-full rounded-r-full" title={`Herram/Seg: ${pctHmEs.toFixed(1)}%`}></div>
          </div>
        </div>

        {/* Summary Breakdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="glass-card p-3 rounded-2xl border border-emerald-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">1. Materiales ({pctMat.toFixed(0)}%)</span>
            <span className="font-extrabold text-emerald-400 font-mono text-sm">{formatCurrency(currentApu.sumaMateriales)}</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-amber-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">2. Mano de Obra ({pctMo.toFixed(0)}%)</span>
            <span className="font-extrabold text-amber-400 font-mono text-sm">{formatCurrency(currentApu.sumaManoObra)}</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-cyan-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">3. Equipo ({pctEq.toFixed(0)}%)</span>
            <span className="font-extrabold text-cyan-400 font-mono text-sm">{formatCurrency(currentApu.sumaEquipo)}</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-purple-500/20">
            <span className="text-[10px] text-slate-400 block font-semibold">4. Herram./Seg. ({pctHmEs.toFixed(0)}%)</span>
            <span className="font-extrabold text-purple-400 font-mono text-sm">{formatCurrency(currentApu.sumaHerramientaSeguridad)}</span>
          </div>
          <div className="glass-card p-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 col-span-2 md:col-span-1">
            <span className="text-[10px] text-emerald-300 block font-bold uppercase">Costo Directo (CD)</span>
            <span className="font-black text-emerald-400 font-mono text-sm">{formatCurrency(currentApu.costoDirecto)}</span>
          </div>
        </div>
      </div>

      {/* APU Breakdown Sections */}

      {/* 1. Materiales */}
      <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-950/90 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Hammer className="w-4 h-4 text-emerald-400" />
            1. Materiales (M = Pm × Cm)
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">Subtotal Materiales: {formatCurrency(currentApu.sumaMateriales)}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Descripción del Material</th>
                <th className="py-3 px-4 text-center w-20">Unidad</th>
                <th className="py-3 px-4 text-right w-32">Precio Base (Pm)</th>
                <th className="py-3 px-4 text-right w-36">Consumo (Cm)</th>
                <th className="py-3 px-4 text-right w-36">Importe Pesos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-medium">
              {currentApu.matDetalle.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 text-slate-200">{m.descripcion}</td>
                  <td className="py-3 px-4 text-center font-mono text-slate-400">{m.unidad}</td>
                  <td className="py-3 px-4 text-right text-slate-300 font-mono">{formatCurrency(m.pm)}</td>
                  <td className="py-3 px-4 text-right font-mono">
                    <input
                      type="number"
                      step="any"
                      value={m.cm}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        onUpdateApuItem(currentApu.id, 'materiales', idx, 'consumo', val);
                      }}
                      className="w-28 bg-slate-950 border border-slate-700 focus:border-emerald-500 text-emerald-400 px-2 py-1 rounded-lg text-right font-mono text-xs focus:outline-none shadow-inner"
                    />
                  </td>
                  <td className="py-3 px-4 text-right text-slate-100 font-mono font-bold">{formatCurrency(m.importe)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Mano de Obra */}
      <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-950/90 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <HardHat className="w-4 h-4 text-amber-400" />
            2. Mano de Obra (Mo = Sr / R)
          </h3>
          <span className="text-xs font-mono text-amber-400 font-bold">Subtotal Mano Obra: {formatCurrency(currentApu.sumaManoObra)}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Cuadrilla de Trabajo</th>
                <th className="py-3 px-4 text-center w-20">Unidad</th>
                <th className="py-3 px-4 text-right w-36">Salario Jornal (Sr)</th>
                <th className="py-3 px-4 text-right w-36">Rendimiento (R)</th>
                <th className="py-3 px-4 text-right w-36">Importe Pesos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-medium">
              {currentApu.moDetalle.map((mo, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 text-slate-200">{mo.nombre}</td>
                  <td className="py-3 px-4 text-center font-mono text-slate-400">{mo.unidad}</td>
                  <td className="py-3 px-4 text-right text-slate-300 font-mono">{formatCurrency(mo.sr)}</td>
                  <td className="py-3 px-4 text-right font-mono">
                    <input
                      type="number"
                      step="any"
                      value={mo.rendimiento}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 1;
                        onUpdateApuItem(currentApu.id, 'manoObra', idx, 'rendimiento', val);
                      }}
                      className="w-28 bg-slate-950 border border-slate-700 focus:border-amber-500 text-amber-400 px-2 py-1 rounded-lg text-right font-mono text-xs focus:outline-none shadow-inner"
                    />
                  </td>
                  <td className="py-3 px-4 text-right text-slate-100 font-mono font-bold">{formatCurrency(mo.importe)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Maquinaria y Equipo */}
      <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-950/90 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-400" />
            3. Maquinaria y Equipo (ME = Phm / Rhm)
          </h3>
          <span className="text-xs font-mono text-cyan-400 font-bold">Subtotal Equipo: {formatCurrency(currentApu.sumaEquipo)}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Descripción del Equipo</th>
                <th className="py-3 px-4 text-center w-20">Unidad</th>
                <th className="py-3 px-4 text-right w-36">Precio Hora (Phm)</th>
                <th className="py-3 px-4 text-right w-36">Rendimiento (Rhm)</th>
                <th className="py-3 px-4 text-right w-36">Importe Pesos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 font-medium">
              {currentApu.eqDetalle.map((eq, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 text-slate-200">{eq.descripcion}</td>
                  <td className="py-3 px-4 text-center font-mono text-slate-400">{eq.unidad}</td>
                  <td className="py-3 px-4 text-right text-slate-300 font-mono">{formatCurrency(eq.phm)}</td>
                  <td className="py-3 px-4 text-right font-mono">
                    <input
                      type="number"
                      step="any"
                      value={eq.rendimiento}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 1;
                        onUpdateApuItem(currentApu.id, 'equipo', idx, 'rendimiento', val);
                      }}
                      className="w-28 bg-slate-950 border border-slate-700 focus:border-cyan-500 text-cyan-400 px-2 py-1 rounded-lg text-right font-mono text-xs focus:outline-none shadow-inner"
                    />
                  </td>
                  <td className="py-3 px-4 text-right text-slate-100 font-mono font-bold">{formatCurrency(eq.importe)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Herramienta, Seguridad y Cascada de Sobrecostos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3 text-xs">
          <h4 className="font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            4. Herramienta y Equipo de Seguridad (% sobre Mo)
          </h4>
          <div className="flex justify-between items-center p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-300 font-medium">Herramienta de Mano (Hm = Kh × Mo)</span>
            <span className="font-bold text-purple-400 font-mono text-sm">{formatCurrency(currentApu.hm)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-slate-300 font-medium">Equipo de Seguridad (Es = Ks × Mo)</span>
            <span className="font-bold text-purple-400 font-mono text-sm">{formatCurrency(currentApu.es)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/30">
            <span className="text-purple-300 font-bold uppercase">Total Herramienta y Seguridad:</span>
            <span className="font-black text-purple-400 font-mono text-sm">{formatCurrency(currentApu.sumaHerramientaSeguridad)}</span>
          </div>
        </div>

        {/* Overheads Cascade Details */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-2 text-xs">
          <h4 className="font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Percent className="w-4 h-4 text-emerald-400" />
            Cascada de Sobrecostos y Precio Unitario
          </h4>

          <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-300 font-bold">(CD) COSTO DIRECTO:</span>
            <span className="font-black text-emerald-400 font-mono">{formatCurrency(currentApu.costoDirecto)}</span>
          </div>

          <div className="flex justify-between p-2 bg-slate-950/60 rounded-lg">
            <span className="text-slate-400">(CI) COSTO INDIRECTO:</span>
            <span className="font-mono text-slate-200">{formatCurrency(currentApu.indirectosImporte)}</span>
          </div>

          <div className="flex justify-between p-2 bg-slate-950/60 rounded-lg">
            <span className="text-slate-400">(CF) FINANCIAMIENTO:</span>
            <span className="font-mono text-slate-200">{formatCurrency(currentApu.financiamientoImporte)}</span>
          </div>

          <div className="flex justify-between p-2 bg-slate-950/60 rounded-lg">
            <span className="text-slate-400">(CU) CARGO POR UTILIDAD:</span>
            <span className="font-mono text-slate-200">{formatCurrency(currentApu.utilidadImporte)}</span>
          </div>

          <div className="flex justify-between p-2 bg-slate-950/60 rounded-lg">
            <span className="text-slate-400">(CA) CARGOS ADICIONALES:</span>
            <span className="font-mono text-slate-200">{formatCurrency(currentApu.cargosAdicionalesImporte)}</span>
          </div>

          <div className="flex justify-between p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/40 text-sm font-black mt-2">
            <span className="text-emerald-400 uppercase">(PU) PRECIO UNITARIO FINAL:</span>
            <span className="text-emerald-400 font-mono">{formatCurrency(currentApu.precioUnitarioRedondeado)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
