import React from 'react';
import { 
  Table, Layers, Calendar, ShieldCheck, Sliders, TrendingUp, Sparkles, Building2, Users, Wrench, FileText, PieChart
} from 'lucide-react';

export default function OpusSidebar({ 
  activeTab, 
  setActiveTab 
}) {
  return (
    <aside className="opus-explorer-sidebar">
      <div className="opus-explorer-header">
        Explorador de Proyecto
      </div>

      <div style={{ padding: '4px 0', overflowY: 'auto' }}>
        {/* Propuesta & Presupuesto */}
        <div className="opus-explorer-group">Concursos CFE</div>
        <button
          onClick={() => setActiveTab('multiProyectos')}
          className={`opus-explorer-item ${activeTab === 'multiProyectos' ? 'active' : ''}`}
        >
          <Building2 size={13} color="#38bdf8" />
          <span>Multi-Licitaciones</span>
        </button>

        <div className="opus-explorer-group" style={{ marginTop: '6px' }}>Propuesta Activa</div>
        <button
          onClick={() => setActiveTab('catalogo')}
          className={`opus-explorer-item ${activeTab === 'catalogo' ? 'active' : ''}`}
        >
          <Table size={13} color="#38bdf8" />
          <span>Presupuesto Obra</span>
        </button>
        <button
          onClick={() => setActiveTab('apu')}
          className={`opus-explorer-item ${activeTab === 'apu' ? 'active' : ''}`}
        >
          <Layers size={13} color="#fbbf24" />
          <span>Matrices APU</span>
        </button>
        <button
          onClick={() => setActiveTab('gantt')}
          className={`opus-explorer-item ${activeTab === 'gantt' ? 'active' : ''}`}
        >
          <Calendar size={13} color="#fb923c" />
          <span>Programa Gantt</span>
        </button>

        {/* Factores LOPSRM */}
        <div className="opus-explorer-group" style={{ marginTop: '8px' }}>Factores LOPSRM</div>
        <button
          onClick={() => setActiveTab('fsr')}
          className={`opus-explorer-item ${activeTab === 'fsr' ? 'active' : ''}`}
        >
          <ShieldCheck size={13} color="#34d399" />
          <span>Cálculo FSR / IMSS</span>
        </button>
        <button
          onClick={() => setActiveTab('indirectosAnalitico')}
          className={`opus-explorer-item ${activeTab === 'indirectosAnalitico' ? 'active' : ''}`}
        >
          <Sliders size={13} color="#fbbf24" />
          <span>Desglose Indirectos</span>
        </button>
        <button
          onClick={() => setActiveTab('sobrecostos')}
          className={`opus-explorer-item ${activeTab === 'sobrecostos' ? 'active' : ''}`}
        >
          <Sliders size={13} color="#818cf8" />
          <span>Cascada Sobrecostos</span>
        </button>
        <button
          onClick={() => setActiveTab('ajusteCostos')}
          className={`opus-explorer-item ${activeTab === 'ajusteCostos' ? 'active' : ''}`}
        >
          <TrendingUp size={13} color="#34d399" />
          <span>Ajuste Costos (INEGI)</span>
        </button>

        {/* Catálogos & Recursos */}
        <div className="opus-explorer-group" style={{ marginTop: '8px' }}>Catálogos</div>
        <button
          onClick={() => setActiveTab('masterCatalog')}
          className={`opus-explorer-item ${activeTab === 'masterCatalog' ? 'active' : ''}`}
        >
          <Sparkles size={13} color="#818cf8" />
          <span>ConstruBase (+2,500)</span>
        </button>
        <button
          onClick={() => setActiveTab('insumos')}
          className={`opus-explorer-item ${activeTab === 'insumos' ? 'active' : ''}`}
        >
          <Building2 size={13} color="#22d3ee" />
          <span>Explosión Insumos</span>
        </button>
        <button
          onClick={() => setActiveTab('cuadrillas')}
          className={`opus-explorer-item ${activeTab === 'cuadrillas' ? 'active' : ''}`}
        >
          <Users size={13} color="#60a5fa" />
          <span>Cuadrillas Obra</span>
        </button>
        <button
          onClick={() => setActiveTab('costoHorario')}
          className={`opus-explorer-item ${activeTab === 'costoHorario' ? 'active' : ''}`}
        >
          <Wrench size={13} color="#fbbf24" />
          <span>Costos Horarios (Phm)</span>
        </button>

        {/* Reportes */}
        <div className="opus-explorer-group" style={{ marginTop: '8px' }}>Auditoría</div>
        <button
          onClick={() => setActiveTab('reportesOficiales')}
          className={`opus-explorer-item ${activeTab === 'reportesOficiales' ? 'active' : ''}`}
        >
          <FileText size={13} color="#34d399" />
          <span>Formatos CFE</span>
        </button>
        <button
          onClick={() => setActiveTab('resumen')}
          className={`opus-explorer-item ${activeTab === 'resumen' ? 'active' : ''}`}
        >
          <PieChart size={13} color="#38bdf8" />
          <span>Dashboard KPIs</span>
        </button>
      </div>
    </aside>
  );
}
