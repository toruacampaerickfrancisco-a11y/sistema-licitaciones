import React, { useState } from 'react';
import { Search, Layers, Edit3, Calculator, Check, X } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function CatalogView({ catalogResult, onQuantityChange, onSelectApu }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [tempQty, setTempQty] = useState('');

  const totalPropuesta = catalogResult.totalPropuesta || 1;

  const filteredConceptos = catalogResult.conceptosCalculados.filter(c => 
    c.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.especificacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (c) => {
    setEditingItem(c.item);
    setTempQty(c.cantidad.toString());
  };

  const saveEdit = (itemCode) => {
    const val = parseFloat(tempQty);
    if (!isNaN(val) && val >= 0) {
      onQuantityChange(itemCode, val);
    }
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-300 shadow-xs overflow-hidden font-sans text-xs">
      {/* Workspace Workspace Internal Tab Bar (VOZ Y DATOS 2025 OPUS24 x | Presupuesto programable x) */}
      <div className="bg-[#e2e8f0] px-2 pt-1 border-b border-slate-300 flex items-center gap-1 shrink-0 text-[11px]">
        <div className="bg-white px-3 py-1 border-t-2 border-t-blue-600 border-x border-slate-300 rounded-t font-bold text-slate-800 flex items-center gap-1.5 shadow-xs">
          <span>Presupuesto programable (Catálogo CFE)</span>
          <X className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
        </div>
      </div>

      {/* Filter / Search Tool Area */}
      <div className="p-1.5 bg-[#f8fafc] border-b border-slate-200 flex items-center justify-between shrink-0 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Licitación:</span>
          <span className="font-mono text-blue-700 font-semibold">Anexo 11 CFE</span>
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1.5" />
          <input
            type="text"
            placeholder="Buscar por clave o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-[11px] text-slate-800 pl-7 pr-3 py-1 rounded border border-slate-300 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* DataGrid Table (Fills remaining height, internal overflow-y scroll) */}
      <div className="flex-1 overflow-auto">
        <table className="opus24-grid">
          <thead>
            <tr>
              <th className="w-10 text-center">#</th>
              <th className="w-20">Tipo</th>
              <th className="w-16">Clave</th>
              <th>Descripción</th>
              <th className="w-14 text-center">Unidad</th>
              <th className="w-20 text-right">Cantidad</th>
              <th className="w-28 text-right">Precio unitario</th>
              <th className="w-32 text-right">Total</th>
              <th className="w-16 text-right">%</th>
              <th className="w-20 text-center">APU</th>
            </tr>
          </thead>
          <tbody>
            {filteredConceptos.map((c, rowIdx) => {
              const pctWeight = totalPropuesta > 0 ? (c.importe / totalPropuesta) * 100 : 0;

              if (c.esEncabezado) {
                const isCapitulo = !c.item.includes('.');
                return (
                  <tr key={c.item} className={isCapitulo ? 'opus24-chapter-row' : 'opus24-subchapter-row'}>
                    <td className="text-center font-mono">{rowIdx + 1}</td>
                    <td className="font-bold">{isCapitulo ? 'Capítulo' : 'Subcapítulo'}</td>
                    <td className="font-mono font-bold">{c.item}</td>
                    <td colSpan={5} className="font-bold uppercase">
                      {c.descripcion}
                    </td>
                    <td className="text-right font-mono font-bold">{pctWeight.toFixed(2)}%</td>
                    <td></td>
                  </tr>
                );
              }

              const isEditing = editingItem === c.item;

              return (
                <tr 
                  key={c.item} 
                  onClick={() => c.apuId && onSelectApu(c.apuId)}
                  className="cursor-pointer hover:bg-blue-50 transition"
                >
                  <td className="text-center font-mono text-slate-400">{rowIdx + 1}</td>
                  <td className="text-slate-500 font-medium">Concepto</td>
                  <td className="font-mono font-bold text-blue-700">{c.item}</td>
                  <td className="text-slate-800 font-medium whitespace-normal">{c.descripcion}</td>
                  <td className="text-center font-mono text-slate-600 font-bold">{c.unidad}</td>
                  
                  {/* Quantity Edit */}
                  <td className="text-right font-mono">
                    {isEditing ? (
                      <div className="flex items-center justify-end gap-1">
                        <input
                          type="number"
                          step="any"
                          value={tempQty}
                          onChange={(e) => setTempQty(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(c.item)}
                          className="w-20 bg-white border border-blue-600 text-blue-800 text-xs px-1 py-0.5 rounded text-right font-bold focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(c.item)}
                          className="p-0.5 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(c);
                        }}
                        className="group inline-flex items-center justify-end gap-1 text-slate-800 hover:text-blue-700 font-bold px-1 py-0.5 rounded hover:bg-blue-100"
                        title="Clic para modificar cantidad"
                      >
                        <span className="font-mono">{c.cantidad}</span>
                        <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100" />
                      </button>
                    )}
                  </td>

                  <td className="text-right font-mono text-blue-700 font-bold">
                    {formatCurrency(c.precioUnitarioRedondeado)}
                  </td>

                  <td className="text-right font-mono text-slate-900 font-extrabold">
                    {formatCurrency(c.importe)}
                  </td>

                  <td className="text-right font-mono text-slate-600 font-semibold">
                    {pctWeight.toFixed(2)}%
                  </td>

                  <td className="text-center">
                    {c.apuId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectApu(c.apuId);
                        }}
                        className="inline-flex items-center gap-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-200"
                      >
                        <Calculator className="w-3 h-3" />
                        Ver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
