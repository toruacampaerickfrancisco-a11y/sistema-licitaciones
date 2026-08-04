import React from 'react';
import { 
  FileSpreadsheet, Calculator, Download, RefreshCw, Layers, Sliders, Users, 
  Building2, ShieldCheck, PieChart, Calendar, RotateCcw
} from 'lucide-react';

export default function OpusRibbon({ 
  activeTab, setActiveTab, onExportExcel, onResetData, projectInfo, totalPropuesta 
}) {
  const ribbonTabs = [
    { id: 'proyecto', label: 'PROYECTO' },
    { id: 'inicio', label: 'INICIO' },
    { id: 'informes', label: 'INFORMES' },
    { id: 'vista', label: 'VISTA' },
    { id: 'principal', label: 'PRINCIPAL' },
    { id: 'herramientas', label: 'HERRAMIENTAS' }
  ];

  const [activeRibbonTab, setActiveRibbonTab] = React.useState('principal');

  return (
    <div className="mockup-ribbon-bar text-xs select-none shrink-0 w-full">
      {/* 1. Ribbon Tabs Horizontal Bar */}
      <div className="ribbon-tabs-container">
        {ribbonTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveRibbonTab(tab.id)}
            className={`mockup-ribbon-tab ${activeRibbonTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 2. Ribbon Command Bar (Icons & Buttons strictly horizontal) */}
      <div className="ribbon-buttons-container">
        <button
          onClick={() => setActiveTab('catalogo')}
          className={`mockup-command-btn ${activeTab === 'catalogo' ? 'active' : ''}`}
        >
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Programación</span>
        </button>

        <button
          onClick={() => setActiveTab('catalogo')}
          className="mockup-command-btn"
        >
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          <span>Ajustar renglones</span>
        </button>

        <button
          onClick={onResetData}
          className="mockup-command-btn"
          title="Deshacer cambios"
        >
          <RotateCcw className="w-3.5 h-3.5 text-red-600" />
          <span>Deshacer</span>
        </button>

        <button
          onClick={() => setActiveTab('dashboard')}
          className={`mockup-command-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
        >
          <PieChart className="w-3.5 h-3.5 text-purple-600" />
          <span>Análisis / Resumen</span>
        </button>

        <button
          onClick={() => setActiveTab('apu')}
          className={`mockup-command-btn ${activeTab === 'apu' ? 'active' : ''}`}
        >
          <Calculator className="w-3.5 h-3.5 text-amber-600" />
          <span>Matrices APU</span>
        </button>

        <button
          onClick={() => setActiveTab('insumos')}
          className={`mockup-command-btn ${activeTab === 'insumos' ? 'active' : ''}`}
        >
          <Building2 className="w-3.5 h-3.5 text-cyan-600" />
          <span>En insumos</span>
        </button>

        <button
          onClick={() => setActiveTab('fsr')}
          className={`mockup-command-btn ${activeTab === 'fsr' ? 'active' : ''}`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>FSR / IMSS</span>
        </button>

        <button
          onClick={() => setActiveTab('sobrecostos')}
          className={`mockup-command-btn ${activeTab === 'sobrecostos' ? 'active' : ''}`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-600" />
          <span>Sobrecostos</span>
        </button>

        <button
          onClick={onExportExcel}
          className="mockup-command-btn bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-bold"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
          <span>Exportar Anexo 11 Excel</span>
        </button>
      </div>
    </div>
  );
}
