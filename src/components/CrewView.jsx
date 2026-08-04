import React from 'react';
import { Users, UserPlus, Trash2, ShieldCheck } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function CrewView({ cuadrillasCalculadas, salariosTabulado, onUpdateCrewMember, onAddCrewMember, onRemoveCrewMember }) {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          Formulación e Integración de Cuadrillas de Trabajo
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Composición de cuadrillas por categoría laboral, salarios reales integrados ($S_r$) y costo total por jornal.
        </p>
      </div>

      {/* Grid of Crews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cuadrillasCalculadas.map((cuad) => (
          <div key={cuad.id} className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {cuad.codigo}
                  </span>
                  <h3 className="text-xs font-bold text-white mt-1.5 line-clamp-2">
                    {cuad.nombre}
                  </h3>
                </div>
                <div className="text-right min-w-[120px]">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Costo Jornal</span>
                  <div className="text-lg font-black text-emerald-400 font-mono">
                    {formatCurrency(cuad.costoDiario)}
                  </div>
                </div>
              </div>

              {/* Members Table */}
              <div className="p-4">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2">Categoría</th>
                      <th className="py-2 text-right">Cant (b)</th>
                      <th className="py-2 text-right">Salario (a)</th>
                      <th className="py-2 text-right">Subtotal</th>
                      <th className="py-2 text-center w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 font-medium">
                    {cuad.integrantesDetalle.map((integ, idx) => {
                      const categoriaObj = salariosTabulado.find(s => s.id === integ.salarioId) || {};
                      return (
                        <tr key={idx} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 text-slate-200 text-[11px]">{categoriaObj.categoria || integ.salarioId}</td>
                          <td className="py-2.5 text-right font-mono">
                            <input
                              type="number"
                              step="any"
                              value={integ.cantidad}
                              onChange={(e) => {
                                const val = parseFloat(e.target.value) || 0;
                                onUpdateCrewMember(cuad.id, idx, val);
                              }}
                              className="w-16 bg-slate-950 border border-slate-700 focus:border-emerald-500 text-emerald-400 px-1.5 py-0.5 rounded text-right text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-2.5 text-right font-mono text-slate-300">{formatCurrency(integ.salarioReal)}</td>
                          <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">{formatCurrency(integ.subtotal)}</td>
                          <td className="py-2.5 text-center">
                            <button
                              onClick={() => onRemoveCrewMember(cuad.id, idx)}
                              className="text-slate-500 hover:text-red-400 transition p-1"
                              title="Eliminar categoría de la cuadrilla"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Category Footer */}
            <div className="bg-slate-950/70 p-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Total Obreros: {cuad.integrantesDetalle.reduce((acc, i) => acc + i.cantidad, 0).toFixed(1)}</span>
              <button
                onClick={() => onAddCrewMember(cuad.id)}
                className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 transition font-semibold"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                Agregar Integrante
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
