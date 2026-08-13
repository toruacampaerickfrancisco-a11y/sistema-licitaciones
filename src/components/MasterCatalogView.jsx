import React, { useState, useEffect } from 'react';
import { Database, Search, Download, DatabaseZap, CheckCircle2, Layers, Tag, Filter } from 'lucide-react';
import { openDatabase, bulkInsertInsumos, searchInsumosMaster, countMasterInsumos } from '../core/database';
import { generateConstruBaseSeed } from '../data/construBaseData';
import { formatCurrency } from './DashboardView';

export default function MasterCatalogView({ onSelectInsumo }) {
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [results, setResults] = useState([]);

  useEffect(() => {
    refreshDB();
  }, []);

  const refreshDB = async () => {
    try {
      const count = await countMasterInsumos();
      setTotalCount(count);
      const items = await searchInsumosMaster(query, tipoFiltro);
      setResults(items);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSeedDatabase = async () => {
    setLoading(true);
    try {
      const seedData = generateConstruBaseSeed();
      await bulkInsertInsumos(seedData);
      await refreshDB();
      setLoading(false);
    } catch (e) {
      alert('Error al alimentar la base de datos: ' + e);
      setLoading(false);
    }
  };

  const handleSearch = async (val, tipo = tipoFiltro) => {
    setQuery(val);
    const items = await searchInsumosMaster(val, tipo);
    setResults(items);
  };

  const handleFilterChange = async (tipo) => {
    setTipoFiltro(tipo);
    const items = await searchInsumosMaster(query, tipo);
    setResults(items);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs select-none">
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-sky-400 bg-sky-500/20 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest font-mono">
              ConstruBase 2026 / IndexedDB
            </span>
            <span className="text-xs text-sky-300 font-mono">Base de Datos Local ultra veloz</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Catálogo Maestro de Insumos (ConstruBase)</h2>
          <p className="text-xs text-slate-300">
            Explora e inserta insumos verificados directamente en tus tarjetas APU sin volver a capturar precios o especificaciones.
          </p>
        </div>

        <div className="bg-slate-900/90 p-4 rounded-xl border border-sky-600/40 text-right min-w-[220px]">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Insumos Registrados</span>
          <div className="text-2xl font-black text-sky-400 font-mono">
            {totalCount.toLocaleString()} <span className="text-xs text-slate-300 font-sans font-normal">insumos</span>
          </div>
          {totalCount === 0 && (
            <button
              onClick={handleSeedDatabase}
              disabled={loading}
              className="mt-2 text-xs bg-sky-600 hover:bg-sky-500 text-white font-bold px-3 py-1.5 rounded-lg w-full transition flex items-center justify-center gap-1 shadow-md"
            >
              <DatabaseZap className="w-3.5 h-3.5" />
              {loading ? 'Alimentando BD...' : 'Cargar ConstruBase 2026'}
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por clave, descripción o familia (ej. Varilla, Lámina)..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-sky-600 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-sky-700" />
            Tipo:
          </span>
          {['todos', 'material', 'mano_obra', 'equipo'].map(tipo => (
            <button
              key={tipo}
              onClick={() => handleFilterChange(tipo)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[10px] tracking-wider transition ${
                tipoFiltro === tipo
                  ? 'bg-[#0b4a72] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tipo.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Results Datagrid Table */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-lg overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 font-bold text-slate-700 flex justify-between">
          <span>Resultados en Vivo ({results.length})</span>
          <span className="font-mono text-slate-500">IndexedDB SQLite Engine</span>
        </div>

        <div className="max-h-[500px] overflow-auto">
          <table className="mockup-table">
            <thead>
              <tr>
                <th className="w-24">Clave</th>
                <th>Descripción Completa del Insumo</th>
                <th className="w-20 text-center">Unidad</th>
                <th className="w-28 text-right">Precio Base</th>
                <th className="w-40">Familia</th>
                <th className="w-24 text-center">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 font-medium">
                    {totalCount === 0 
                      ? 'Haz clic en "Cargar ConstruBase 2026" para inicializar el catálogo masivo.'
                      : 'No se encontraron insumos que coincidan con la búsqueda.'}
                  </td>
                </tr>
              ) : (
                results.map((item) => (
                  <tr key={item.codigo} className="hover:bg-sky-50 transition cursor-pointer">
                    <td className="font-mono font-bold text-sky-800">{item.codigo}</td>
                    <td className="text-slate-900 font-medium whitespace-normal">{item.descripcion}</td>
                    <td className="text-center font-mono font-bold text-slate-700">{item.unidad}</td>
                    <td className="text-right font-mono font-extrabold text-sky-950">{formatCurrency(item.precioBase)}</td>
                    <td className="text-slate-600 font-semibold">{item.familia || 'General'}</td>
                    <td className="text-center font-bold uppercase text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full ${
                        item.tipo === 'material' ? 'bg-emerald-100 text-emerald-800' :
                        item.tipo === 'mano_obra' ? 'bg-amber-100 text-amber-800' : 'bg-cyan-100 text-cyan-800'
                      }`}>
                        {item.tipo}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
