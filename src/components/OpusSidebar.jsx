import React, { useState } from 'react';
import { 
  Folder, Calendar, PieChart, Layers, Sliders, Users, 
  Building2, Wrench, ShieldCheck, Hammer, Truck, Pin, 
  ChevronDown, ChevronRight, Calculator, X
} from 'lucide-react';

export default function OpusSidebar({ activeTab, setActiveTab, projectInfo }) {
  const [openFolders, setOpenFolders] = useState({
    obra: true,
    propuesta: true,
    insumos: true,
    ejecucion: false
  });

  const toggleFolder = (key) => {
    setOpenFolders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="mockup-sidebar shrink-0 text-xs select-none text-slate-800 font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sidebar Header with Pin Icon */}
        <div className="bg-slate-200 px-2.5 py-1.5 border-b border-slate-300 font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-800 whitespace-nowrap">Explorador de vistas</span>
          <button className="text-slate-500 hover:text-slate-800" title="Fijar explorador">
            <Pin className="w-3.5 h-3.5 rotate-45" />
          </button>
        </div>

        {/* Navigation Tree */}
        <div className="p-1 space-y-0.5 overflow-y-auto flex-1 scrollbar-none text-[11px]">
          {/* Root Node: Obra / Proyecto */}
          <div>
            <div
              onClick={() => toggleFolder('obra')}
              className="flex items-center gap-1 py-1 px-1 font-bold text-slate-900 cursor-pointer hover:bg-slate-300 rounded whitespace-nowrap"
            >
              {openFolders.obra ? <ChevronDown className="w-3 h-3 text-slate-600 shrink-0" /> : <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
              <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30 shrink-0" />
              <span className="truncate">{projectInfo.licitacion || 'Concurso CFE-0700-CSCON-0040-2025'}</span>
            </div>

            {openFolders.obra && (
              <div className="pl-2 space-y-0.5">
                {/* 1. Folder: Propuesta */}
                <div>
                  <div
                    onClick={() => toggleFolder('propuesta')}
                    className="flex items-center gap-1 py-1 px-1 font-bold text-slate-700 cursor-pointer hover:bg-slate-300 rounded whitespace-nowrap"
                  >
                    {openFolders.propuesta ? <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" /> : <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />}
                    <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30 shrink-0" />
                    <span>Propuesta</span>
                  </div>

                  {openFolders.propuesta && (
                    <div className="pl-3 space-y-0.5 font-medium">
                      {/* Presupuesto programable */}
                      <div
                        onClick={() => setActiveTab('catalogo')}
                        className={`flex items-center gap-1.5 px-1.5 py-1 rounded cursor-pointer transition whitespace-nowrap ${
                          activeTab === 'catalogo'
                            ? 'bg-slate-300 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Presupuesto programable</span>
                      </div>

                      {/* Análisis de presupuesto */}
                      <div
                        onClick={() => setActiveTab('dashboard')}
                        className={`flex items-center gap-1.5 px-1.5 py-1 rounded cursor-pointer transition whitespace-nowrap ${
                          activeTab === 'dashboard'
                            ? 'bg-slate-300 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <PieChart className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>Análisis de presupuesto</span>
                      </div>

                      {/* Conceptos */}
                      <div
                        onClick={() => setActiveTab('catalogo')}
                        className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap"
                      >
                        <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Conceptos</span>
                      </div>

                      {/* Cálculo de FSR / IMSS */}
                      <div
                        onClick={() => setActiveTab('fsr')}
                        className={`flex items-center gap-1.5 px-1.5 py-1 rounded cursor-pointer transition whitespace-nowrap ${
                          activeTab === 'fsr'
                            ? 'bg-slate-300 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Cálculo de FSR / IMSS</span>
                      </div>

                      {/* Personal en indirectos */}
                      <div
                        onClick={() => setActiveTab('cuadrillas')}
                        className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap"
                      >
                        <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Personal en indirectos</span>
                      </div>

                      {/* Cálculo de sobrecostos */}
                      <div
                        onClick={() => setActiveTab('sobrecostos')}
                        className={`flex items-center gap-1.5 px-1.5 py-1 rounded cursor-pointer transition whitespace-nowrap ${
                          activeTab === 'sobrecostos'
                            ? 'bg-slate-300 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Cálculo de sobrecostos</span>
                      </div>

                      {/* Explosión de insumos */}
                      <div
                        onClick={() => setActiveTab('insumos')}
                        className={`flex items-center gap-1.5 px-1.5 py-1 rounded cursor-pointer transition whitespace-nowrap ${
                          activeTab === 'insumos'
                            ? 'bg-slate-300 text-slate-900 font-bold'
                            : 'text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>Explosión de insumos</span>
                      </div>

                      {/* Programa de suministros */}
                      <div
                        onClick={() => setActiveTab('catalogo')}
                        className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap"
                      >
                        <Calendar className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>Programa de suministros</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Folder: Insumos */}
                <div>
                  <div
                    onClick={() => toggleFolder('insumos')}
                    className="flex items-center gap-1 py-1 px-1 font-bold text-slate-700 cursor-pointer hover:bg-slate-300 rounded whitespace-nowrap"
                  >
                    {openFolders.insumos ? <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" /> : <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />}
                    <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30 shrink-0" />
                    <span>Insumos</span>
                  </div>

                  {openFolders.insumos && (
                    <div className="pl-3 space-y-0.5 font-medium">
                      <div onClick={() => setActiveTab('insumos')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Users className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        <span>Todos</span>
                      </div>

                      <div onClick={() => setActiveTab('insumos')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Building2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>Materiales</span>
                      </div>

                      <div onClick={() => setActiveTab('cuadrillas')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>Mano de obra</span>
                      </div>

                      <div onClick={() => setActiveTab('insumos')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Hammer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Herramienta</span>
                      </div>

                      <div onClick={() => setActiveTab('insumos')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Wrench className="w-3.5 h-3.5 text-[#0090ff] shrink-0" />
                        <span>Equipo</span>
                      </div>

                      <div onClick={() => setActiveTab('apu')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Calculator className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Matrices</span>
                      </div>

                      <div onClick={() => setActiveTab('insumos')} className="flex items-center gap-1.5 px-1.5 py-1 text-slate-700 hover:bg-slate-300 rounded cursor-pointer whitespace-nowrap">
                        <Truck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>Fletes</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Folder: Ejecución */}
                <div>
                  <div
                    onClick={() => toggleFolder('ejecucion')}
                    className="flex items-center gap-1 py-1 px-1 font-bold text-slate-700 cursor-pointer hover:bg-slate-300 rounded whitespace-nowrap"
                  >
                    {openFolders.ejecucion ? <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" /> : <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />}
                    <Folder className="w-3.5 h-3.5 text-amber-500 fill-amber-400/30 shrink-0" />
                    <span>Ejecución</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Info Box */}
      <div className="p-2 border-t border-slate-300 bg-slate-200 text-[10px] text-slate-700 font-mono space-y-0.5 shrink-0">
        <div className="flex items-center justify-between font-bold">
          <span className="truncate">Presupuesto programable (Catálogo CFE)</span>
          <X className="w-3 h-3 cursor-pointer text-slate-500 hover:text-slate-800 shrink-0" />
        </div>
        <div className="truncate">Licitación: Anexo 11 CFE</div>
      </div>
    </aside>
  );
}
