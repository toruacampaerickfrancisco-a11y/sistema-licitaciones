import React from 'react';
import { Building2, FileSpreadsheet, Download, RefreshCw, Layers, Sliders, Users, Calculator, PieChart, ShieldCheck, Sparkles, Activity } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onExportExcel, onResetData, projectInfo }) {
  const tabs = [
    { id: 'dashboard', label: 'Resumen Ejecutivo', icon: PieChart, badge: 'Live' },
    { id: 'catalogo', label: 'Catálogo de Conceptos', icon: Layers, badge: 'Anexo 11' },
    { id: 'apu', label: 'Tarjetas de APU', icon: Calculator, badge: 'APUs' },
    { id: 'cuadrillas', label: 'Cuadrillas', icon: Users },
    { id: 'insumos', label: 'Insumos & Equipos', icon: Building2 },
    { id: 'fsr', label: 'FSR & Salarios', icon: ShieldCheck, badge: 'IMSS' },
    { id: 'sobrecostos', label: 'Sobrecostos', icon: Sliders }
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 transition-all">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-xl">
              <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-extrabold text-white tracking-tight font-sans">OPUS CFE Studio</h1>
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <Activity className="w-3 h-3 animate-pulse text-emerald-400" />
                LOPSRM 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-2">
              <span className="text-slate-300 font-semibold">{projectInfo.licitacion}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{projectInfo.licitante}</span>
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onResetData}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white px-3.5 py-2.5 rounded-xl border border-slate-800 transition-all shadow-sm"
            title="Restablecer valores predeterminados del concurso CFE"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            Restablecer
          </button>
          <button
            onClick={onExportExcel}
            className="relative group flex items-center gap-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200"
          >
            <Download className="w-4 h-4 text-slate-950" />
            Exportar Excel (.xlsx)
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
