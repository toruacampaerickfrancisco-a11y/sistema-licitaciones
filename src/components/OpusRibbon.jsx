import React, { useState } from 'react';
import { 
  Table, Calculator, Calendar, ShieldCheck, Sliders, Printer, 
  FileSpreadsheet, Sparkles, Building2, Users, Wrench, FolderOpen,
  TrendingUp, PieChart, RotateCcw, RefreshCw
} from 'lucide-react';

export default function OpusRibbon({ 
  activeTab, 
  setActiveTab, 
  onResetData, 
  onExportExcel 
}) {
  const [activeRibbonTab, setActiveRibbonTab] = useState('propuesta');

  return (
    <div className="opus-ribbon">
      {/* Tabs bar */}
      <div className="opus-ribbon-tabs">
        <button
          onClick={() => setActiveRibbonTab('inicio')}
          className={`opus-ribbon-tab ${activeRibbonTab === 'inicio' ? 'active' : ''}`}
        >
          Inicio
        </button>
        <button
          onClick={() => setActiveRibbonTab('propuesta')}
          className={`opus-ribbon-tab ${activeRibbonTab === 'propuesta' ? 'active' : ''}`}
        >
          Propuesta Económica
        </button>
        <button
          onClick={() => setActiveRibbonTab('insumos')}
          className={`opus-ribbon-tab ${activeRibbonTab === 'insumos' ? 'active' : ''}`}
        >
          Catálogos & Recursos
        </button>
        <button
          onClick={() => setActiveRibbonTab('herramientas')}
          className={`opus-ribbon-tab ${activeRibbonTab === 'herramientas' ? 'active' : ''}`}
        >
          Herramientas LOPSRM
        </button>
        <button
          onClick={() => setActiveRibbonTab('vista')}
          className={`opus-ribbon-tab ${activeRibbonTab === 'vista' ? 'active' : ''}`}
        >
          Vistas & Reportes
        </button>
      </div>

      {/* Buttons shelf */}
      <div className="opus-ribbon-shelf">
        {activeRibbonTab === 'propuesta' && (
          <>
            <div className="opus-ribbon-group">
              <button
                onClick={() => setActiveTab('catalogo')}
                className={`opus-ribbon-btn ${activeTab === 'catalogo' ? 'active' : ''}`}
              >
                <Table size={18} color="#38bdf8" />
                <span>Presupuesto</span>
              </button>
              <button
                onClick={() => setActiveTab('apu')}
                className={`opus-ribbon-btn ${activeTab === 'apu' ? 'active' : ''}`}
              >
                <Calculator size={18} color="#fbbf24" />
                <span>Matrices APU</span>
              </button>
              <button
                onClick={() => setActiveTab('gantt')}
                className={`opus-ribbon-btn ${activeTab === 'gantt' ? 'active' : ''}`}
              >
                <Calendar size={18} color="#fb923c" />
                <span>Gantt / Obra</span>
              </button>
            </div>

            <div className="opus-ribbon-group">
              <button
                onClick={() => setActiveTab('fsr')}
                className={`opus-ribbon-btn ${activeTab === 'fsr' ? 'active' : ''}`}
              >
                <ShieldCheck size={18} color="#34d399" />
                <span>Factor FSR</span>
              </button>
              <button
                onClick={() => setActiveTab('indirectosAnalitico')}
                className={`opus-ribbon-btn ${activeTab === 'indirectosAnalitico' ? 'active' : ''}`}
              >
                <Sliders size={18} color="#fbbf24" />
                <span>Indirectos</span>
              </button>
              <button
                onClick={() => setActiveTab('sobrecostos')}
                className={`opus-ribbon-btn ${activeTab === 'sobrecostos' ? 'active' : ''}`}
              >
                <Sliders size={18} color="#818cf8" />
                <span>Sobrecostos</span>
              </button>
            </div>

            <div className="opus-ribbon-group">
              <button
                onClick={() => setActiveTab('reportesOficiales')}
                className={`opus-ribbon-btn ${activeTab === 'reportesOficiales' ? 'active' : ''}`}
              >
                <Printer size={18} color="#34d399" />
                <span>Reportes CFE</span>
              </button>
              <button
                onClick={onExportExcel}
                className="opus-ribbon-btn"
              >
                <FileSpreadsheet size={18} color="#34d399" />
                <span>Excel Oficial</span>
              </button>
            </div>
          </>
        )}

        {activeRibbonTab === 'insumos' && (
          <>
            <div className="opus-ribbon-group">
              <button
                onClick={() => setActiveTab('masterCatalog')}
                className={`opus-ribbon-btn ${activeTab === 'masterCatalog' ? 'active' : ''}`}
              >
                <Sparkles size={18} color="#818cf8" />
                <span>ConstruBase 2026</span>
              </button>
              <button
                onClick={() => setActiveTab('insumos')}
                className={`opus-ribbon-btn ${activeTab === 'insumos' ? 'active' : ''}`}
              >
                <Building2 size={18} color="#22d3ee" />
                <span>Insumos</span>
              </button>
              <button
                onClick={() => setActiveTab('cuadrillas')}
                className={`opus-ribbon-btn ${activeTab === 'cuadrillas' ? 'active' : ''}`}
              >
                <Users size={18} color="#60a5fa" />
                <span>Cuadrillas</span>
              </button>
              <button
                onClick={() => setActiveTab('costoHorario')}
                className={`opus-ribbon-btn ${activeTab === 'costoHorario' ? 'active' : ''}`}
              >
                <Wrench size={18} color="#fbbf24" />
                <span>Costos Horarios</span>
              </button>
            </div>
          </>
        )}

        {(activeRibbonTab === 'inicio' || activeRibbonTab === 'herramientas' || activeRibbonTab === 'vista') && (
          <>
            <div className="opus-ribbon-group">
              <button
                onClick={() => setActiveTab('importador')}
                className={`opus-ribbon-btn ${activeTab === 'importador' ? 'active' : ''}`}
              >
                <FolderOpen size={18} color="#fbbf24" />
                <span>Importar XLSX</span>
              </button>
              <button
                onClick={() => setActiveTab('ajusteCostos')}
                className={`opus-ribbon-btn ${activeTab === 'ajusteCostos' ? 'active' : ''}`}
              >
                <TrendingUp size={18} color="#34d399" />
                <span>Ajuste Inflación</span>
              </button>
              <button
                onClick={() => setActiveTab('resumen')}
                className={`opus-ribbon-btn ${activeTab === 'resumen' ? 'active' : ''}`}
              >
                <PieChart size={18} color="#38bdf8" />
                <span>Dashboard KPIs</span>
              </button>
              <button onClick={onResetData} className="opus-ribbon-btn">
                <RotateCcw size={18} color="#f43f5e" />
                <span>Recalcular</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
