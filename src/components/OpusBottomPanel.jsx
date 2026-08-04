import React from 'react';
import { Calculator, X, Hammer, HardHat, Wrench, Shield, ChevronUp, ChevronDown } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function OpusBottomPanel({ apu, onClose, onUpdateApuItem }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeMatrixTab, setActiveMatrixTab] = React.useState('todos');

  if (!apu) return null;

  const totalMat = apu.sumaMateriales || 0;
  const totalMo = apu.sumaManoObra || 0;
  const totalEq = apu.sumaEquipo || 0;
  const totalHmEs = apu.sumaHerramientaSeguridad || 0;

  return (
    <div className="bg-[#f8fafc] border-t-2 border-blue-600 shadow-lg text-xs text-slate-800 shrink-0 font-sans">
      {/* Matrix Header */}
      <div className="bg-[#1d4ed8] text-white px-3 py-1 flex items-center justify-between font-sans text-[11px]">
        <div className="flex items-center gap-2">
          <button onClick={() => setCollapsed(!collapsed)} className="text-blue-100 hover:text-white">
            {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <span className="font-bold font-mono">DESGLOSE DE MATRIZ DE PRECIO UNITARIO: {apu.codigoConcepto}</span>
          <span>-</span>
          <span className="text-blue-100 font-medium truncate max-w-xl">{apu.descripcion}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-bold text-emerald-300 font-mono text-xs">
            PU: {formatCurrency(apu.precioUnitarioRedondeado)} / {apu.unidad}
          </span>
          <button onClick={onClose} className="text-blue-100 hover:text-red-300 p-0.5">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-1.5 space-y-1 bg-white">
          {/* Matrix Subtabs (Matching 3rd screenshot subtab icons & totals) */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 text-[11px] font-semibold text-slate-700 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveMatrixTab('todos')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${activeMatrixTab === 'todos' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <span>Todos</span>
              <span className="font-mono text-[10px]">{formatCurrency(apu.costoDirecto)}</span>
            </button>

            <button
              onClick={() => setActiveMatrixTab('materiales')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${activeMatrixTab === 'materiales' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <Hammer className="w-3.5 h-3.5 text-emerald-600" />
              <span>Materiales</span>
              <span className="font-mono text-[10px]">{formatCurrency(totalMat)}</span>
            </button>

            <button
              onClick={() => setActiveMatrixTab('manoObra')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${activeMatrixTab === 'manoObra' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <HardHat className="w-3.5 h-3.5 text-amber-600" />
              <span>Mano de obra</span>
              <span className="font-mono text-[10px]">{formatCurrency(totalMo)}</span>
            </button>

            <button
              onClick={() => setActiveMatrixTab('equipo')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${activeMatrixTab === 'equipo' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <Wrench className="w-3.5 h-3.5 text-cyan-600" />
              <span>Equipos</span>
              <span className="font-mono text-[10px]">{formatCurrency(totalEq)}</span>
            </button>

            <button
              onClick={() => setActiveMatrixTab('herramientas')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition ${activeMatrixTab === 'herramientas' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Herramientas</span>
              <span className="font-mono text-[10px]">{formatCurrency(totalHmEs)}</span>
            </button>
          </div>

          {/* Matrix Content Table (Matching 3rd screenshot matrix columns) */}
          <div className="max-h-36 overflow-y-auto">
            <table className="opus24-grid">
              <thead>
                <tr>
                  <th className="w-8 text-center">#</th>
                  <th className="w-8 text-center">C</th>
                  <th className="w-20">Clave</th>
                  <th>Descripción</th>
                  <th className="w-14 text-center">Unidad</th>
                  <th className="w-20 text-right">Cantidad</th>
                  <th className="w-24 text-right">Rendimiento</th>
                  <th className="w-24 text-right">Costo unitario</th>
                  <th className="w-28 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Materiales */}
                {(activeMatrixTab === 'todos' || activeMatrixTab === 'materiales') && apu.matDetalle.map((m, idx) => (
                  <tr key={`mat-${idx}`}>
                    <td className="text-center font-mono text-slate-400">{idx + 1}</td>
                    <td className="text-center font-bold text-emerald-600">M</td>
                    <td className="font-mono text-slate-700 font-bold">{m.codigo}</td>
                    <td className="text-slate-800 font-medium">{m.descripcion}</td>
                    <td className="text-center font-mono text-slate-600 font-semibold">{m.unidad}</td>
                    <td className="text-right font-mono">1.0000</td>
                    <td className="text-right font-mono">
                      <input
                        type="number"
                        step="any"
                        value={m.cm}
                        onChange={(e) => onUpdateApuItem(apu.id, 'materiales', idx, 'consumo', parseFloat(e.target.value) || 0)}
                        className="w-20 bg-slate-50 border border-slate-300 text-blue-800 text-right px-1 py-0.5 rounded font-bold"
                      />
                    </td>
                    <td className="text-right font-mono">{formatCurrency(m.pm)}</td>
                    <td className="text-right font-mono font-bold text-slate-900">{formatCurrency(m.importe)}</td>
                  </tr>
                ))}

                {/* Mano de obra */}
                {(activeMatrixTab === 'todos' || activeMatrixTab === 'manoObra') && apu.moDetalle.map((mo, idx) => (
                  <tr key={`mo-${idx}`}>
                    <td className="text-center font-mono text-slate-400">{idx + 1}</td>
                    <td className="text-center font-bold text-amber-600">MO</td>
                    <td className="font-mono text-slate-700 font-bold">{mo.codigo}</td>
                    <td className="text-slate-800 font-medium">{mo.nombre}</td>
                    <td className="text-center font-mono text-slate-600 font-semibold">{mo.unidad}</td>
                    <td className="text-right font-mono">1.0000</td>
                    <td className="text-right font-mono">
                      <input
                        type="number"
                        step="any"
                        value={mo.rendimiento}
                        onChange={(e) => onUpdateApuItem(apu.id, 'manoObra', idx, 'rendimiento', parseFloat(e.target.value) || 1)}
                        className="w-20 bg-slate-50 border border-slate-300 text-blue-800 text-right px-1 py-0.5 rounded font-bold"
                      />
                    </td>
                    <td className="text-right font-mono">{formatCurrency(mo.sr)}</td>
                    <td className="text-right font-mono font-bold text-slate-900">{formatCurrency(mo.importe)}</td>
                  </tr>
                ))}

                {/* Equipos */}
                {(activeMatrixTab === 'todos' || activeMatrixTab === 'equipo') && apu.eqDetalle.map((eq, idx) => (
                  <tr key={`eq-${idx}`}>
                    <td className="text-center font-mono text-slate-400">{idx + 1}</td>
                    <td className="text-center font-bold text-cyan-600">EQ</td>
                    <td className="font-mono text-slate-700 font-bold">{eq.codigo}</td>
                    <td className="text-slate-800 font-medium">{eq.descripcion}</td>
                    <td className="text-center font-mono text-slate-600 font-semibold">{eq.unidad}</td>
                    <td className="text-right font-mono">1.0000</td>
                    <td className="text-right font-mono">
                      <input
                        type="number"
                        step="any"
                        value={eq.rendimiento}
                        onChange={(e) => onUpdateApuItem(apu.id, 'equipo', idx, 'rendimiento', parseFloat(e.target.value) || 1)}
                        className="w-20 bg-slate-50 border border-slate-300 text-blue-800 text-right px-1 py-0.5 rounded font-bold"
                      />
                    </td>
                    <td className="text-right font-mono">{formatCurrency(eq.phm)}</td>
                    <td className="text-right font-mono font-bold text-slate-900">{formatCurrency(eq.importe)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
