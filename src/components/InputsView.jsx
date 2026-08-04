import React from 'react';
import { Plus, Package, Wrench } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function InputsView({
  materialesCalculados,
  equiposCalculados,
  onUpdateMaterial,
  onUpdateEquipo,
  onAddMaterial,
  onAddEquipo
}) {
  return (
    <div className="flex-1 overflow-auto bg-white p-3 font-sans text-xs">
      {/* 1. SECCIÓN DE MATERIALES (COMO EN LA IMAGEN DEL MOCKUP) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-700" />
            <h3 className="font-bold text-slate-800 text-sm">Explosión de Materiales de Obra (Anexo 11 CFE)</h3>
          </div>
          <button
            onClick={onAddMaterial}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Agregar Material
          </button>
        </div>

        <table className="mockup-table">
          <thead>
            <tr>
              <th className="w-16 text-left">Código</th>
              <th className="text-left">Descripción del Material</th>
              <th className="w-24 text-left">Unidad</th>
              <th className="w-36 text-left">Precio Cotización</th>
              <th className="w-28 text-left">% Inflación</th>
              <th className="w-36 text-left">Precio Final (Pm)</th>
            </tr>
          </thead>
          <tbody>
            {materialesCalculados.map((m, idx) => (
              <tr key={m.id || idx}>
                <td className="font-bold text-slate-700">{m.codigo || idx + 1}</td>
                <td>
                  <input
                    type="text"
                    value={m.descripcion}
                    onChange={(e) => onUpdateMaterial(idx, 'descripcion', e.target.value)}
                    className="w-full font-medium"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={m.unidad}
                    onChange={(e) => onUpdateMaterial(idx, 'unidad', e.target.value)}
                    className="w-full text-center font-mono font-bold text-slate-600"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="any"
                    value={m.precioBase}
                    onChange={(e) => onUpdateMaterial(idx, 'precioBase', parseFloat(e.target.value) || 0)}
                    className="w-full font-mono text-right font-bold text-slate-800"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="any"
                    value={m.inflacion}
                    onChange={(e) => onUpdateMaterial(idx, 'inflacion', parseFloat(e.target.value) || 0)}
                    className="w-full font-mono text-right text-slate-600"
                  />
                </td>
                <td className="font-mono font-bold text-blue-700 text-right text-sm">
                  {formatCurrency(m.precioFinal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. SECCIÓN DE MAQUINARIA Y EQUIPO */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-700" />
            <h3 className="font-bold text-slate-800 text-sm">Maquinaria y Equipo de Construcción</h3>
          </div>
          <button
            onClick={onAddEquipo}
            className="flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Agregar Equipo
          </button>
        </div>

        <table className="mockup-table">
          <thead>
            <tr>
              <th className="w-16 text-left">Código</th>
              <th className="text-left">Descripción de Maquinaria / Equipo</th>
              <th className="w-24 text-left">Unidad</th>
              <th className="w-36 text-left">Costo Horario (Phm)</th>
              <th className="w-28 text-left">% Ajuste</th>
              <th className="w-36 text-left">Costo Final (Phm)</th>
            </tr>
          </thead>
          <tbody>
            {equiposCalculados.map((eq, idx) => (
              <tr key={eq.id || idx}>
                <td className="font-bold text-slate-700">{eq.codigo || idx + 1}</td>
                <td>
                  <input
                    type="text"
                    value={eq.descripcion}
                    onChange={(e) => onUpdateEquipo(idx, 'descripcion', e.target.value)}
                    className="w-full font-medium"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={eq.unidad}
                    onChange={(e) => onUpdateEquipo(idx, 'unidad', e.target.value)}
                    className="w-full text-center font-mono font-bold text-slate-600"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="any"
                    value={eq.ch}
                    onChange={(e) => onUpdateEquipo(idx, 'ch', parseFloat(e.target.value) || 0)}
                    className="w-full font-mono text-right font-bold text-slate-800"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="any"
                    value={eq.inflacion}
                    onChange={(e) => onUpdateEquipo(idx, 'inflacion', parseFloat(e.target.value) || 0)}
                    className="w-full font-mono text-right text-slate-600"
                  />
                </td>
                <td className="font-mono font-bold text-cyan-700 text-right text-sm">
                  {formatCurrency(eq.costoFinal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
