import React from 'react';
import { 
  FileSpreadsheet, Calculator, Building2, ShieldCheck, Sliders, PieChart, 
  Layers, Users, CheckCircle2, ChevronRight, Sparkles, FolderKanban
} from 'lucide-react';

export default function OpusModuleSidebar({ activeTab, setActiveTab }) {
  const modules = [
    {
      id: 'm1',
      tab: 'catalogo',
      num: 'M1',
      title: 'Presupuesto Programable',
      subtitle: 'Catálogo Anexo 11 CFE',
      icon: FileSpreadsheet,
      color: 'text-sky-400',
      activeBg: 'bg-sky-600/20 text-sky-300 border-sky-500/40'
    },
    {
      id: 'm2',
      tab: 'apu',
      num: 'M2',
      title: 'Precios Unitarios (APU)',
      subtitle: 'Tarjetas y Matrices',
      icon: Calculator,
      color: 'text-amber-400',
      activeBg: 'bg-amber-600/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'm3',
      tab: 'insumos',
      num: 'M3',
      title: 'Explosión de Insumos',
      subtitle: 'Materiales, Equipos y Cuadrillas',
      icon: Building2,
      color: 'text-cyan-400',
      activeBg: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/40'
    },
    {
      id: 'm4',
      tab: 'fsr',
      num: 'M4',
      title: 'Salarios Reales y FSR',
      subtitle: 'Cargas IMSS e Infonavit',
      icon: ShieldCheck,
      color: 'text-purple-400',
      activeBg: 'bg-purple-600/20 text-purple-300 border-purple-500/40'
    },
    {
      id: 'm5',
      tab: 'sobrecostos',
      num: 'M5',
      title: 'Matriz de Sobrecostos',
      subtitle: 'Indirectos, Utilidad y Adicionales',
      icon: Sliders,
      color: 'text-emerald-400',
      activeBg: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'm6',
      tab: 'dashboard',
      num: 'M6',
      title: 'Resumen Ejecutivo',
      subtitle: 'Dashboard y Reportes CFE',
      icon: PieChart,
      color: 'text-blue-400',
      activeBg: 'bg-blue-600/20 text-blue-300 border-blue-500/40'
    }
  ];

  return (
    <aside className="w-64 bg-[#18181b] border-r border-[#27272a] text-slate-200 flex flex-col shrink-0 select-none shadow-lg">
      {/* Sidebar Top Header */}
      <div className="bg-[#09090b] px-3.5 py-2.5 border-b border-[#27272a] flex items-center gap-2">
        <div className="w-6 h-6 bg-sky-600 rounded flex items-center justify-center font-black text-white text-xs shadow">
          M
        </div>
        <div>
          <h3 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
            Módulos OPUS 25
          </h3>
          <p className="text-[10px] text-slate-400 font-mono">Ingeniería de Costos CFE</p>
        </div>
      </div>

      {/* Module List */}
      <div className="p-2 space-y-1.5 overflow-y-auto flex-1 scrollbar-none">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = 
            (m.tab === 'catalogo' && activeTab === 'catalogo') ||
            (m.tab === 'apu' && activeTab === 'apu') ||
            (m.tab === 'insumos' && (activeTab === 'insumos' || activeTab === 'cuadrillas')) ||
            (m.tab === 'fsr' && activeTab === 'fsr') ||
            (m.tab === 'sobrecostos' && activeTab === 'sobrecostos') ||
            (m.tab === 'dashboard' && activeTab === 'dashboard');

          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.tab)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all duration-150 flex items-center justify-between group ${
                isActive
                  ? m.activeBg + ' shadow-md font-bold'
                  : 'bg-[#27272a]/40 border-transparent text-slate-300 hover:bg-[#27272a] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-md bg-black/40 flex items-center justify-center font-mono font-bold text-xs border border-white/10 ${m.color}`}>
                  {m.num}
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight group-hover:text-white">{m.title}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{m.subtitle}</div>
                </div>
              </div>

              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-500 opacity-0 group-hover:opacity-100'}`} />
            </button>
          );
        })}
      </div>

      {/* Sub-Navigation Shortcut Pill */}
      {activeTab === 'insumos' && (
        <div className="p-2 bg-[#09090b] border-t border-[#27272a] space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block px-1">Sub-módulos Insumos:</span>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setActiveTab('insumos')}
              className={`py-1 px-2 rounded text-[10px] font-bold text-center border ${activeTab === 'insumos' ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-[#18181b] text-slate-400 border-slate-700'}`}
            >
              Materiales/Equipos
            </button>
            <button
              onClick={() => setActiveTab('cuadrillas')}
              className={`py-1 px-2 rounded text-[10px] font-bold text-center border ${activeTab === 'cuadrillas' ? 'bg-blue-600 text-white border-blue-500' : 'bg-[#18181b] text-slate-400 border-slate-700'}`}
            >
              Cuadrillas
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="bg-[#09090b] px-3 py-2 border-t border-[#27272a] text-[10px] text-slate-400 flex items-center justify-between font-mono">
        <span>Estado: Activo</span>
        <span className="text-emerald-400 font-bold">LOPSRM 2026</span>
      </div>
    </aside>
  );
}
