import React, { useState, useMemo } from 'react';
import OpusRibbon from './components/OpusRibbon';
import OpusSidebar from './components/OpusSidebar';
import OpusModuleSidebar from './components/OpusModuleSidebar';
import OpusBottomPanel from './components/OpusBottomPanel';

import CatalogView from './components/CatalogView';
import ApuView from './components/ApuView';
import FsrView from './components/FsrView';
import OverheadsView from './components/OverheadsView';
import DashboardView from './components/DashboardView';
import InputsView from './components/InputsView';
import CrewView from './components/CrewView';
import ExcelImportView from './components/ExcelImportView';
import CostoHorarioView from './components/CostoHorarioView';
import MasterCatalogView from './components/MasterCatalogView';
import IndirectosAnaliticoView from './components/IndirectosAnaliticoView';
import GanttScheduleView from './components/GanttScheduleView';
import AjusteCostosView from './components/AjusteCostosView';
import OfficialReportsView from './components/OfficialReportsView';
import { initialProjectsList } from './data/projectsData';
import { initialRubrosIndirectos } from './data/indirectosData';
import MultiLicitacionesView from './components/MultiLicitacionesView';

import { initialProjectData } from './data/initialData';
import { calculateFSR } from './core/fsrEngine';
import { calculateAPUEngine } from './core/apuEngine';
import { calculateCatalogEngine } from './core/catalogEngine';
import { exportBudgetToExcel } from './utils/excelExport';

export default function App() {
  const [projects, setProjects] = useState(initialProjectsList);
  const [currentProjectId, setCurrentProjectId] = useState('lic-cfe-01');
  const [activeTab, setActiveTab] = useState('catalogo');
  const [selectedApuId, setSelectedApuId] = useState('PU_1_1');
  const [showBottomMatrix, setShowBottomMatrix] = useState(true);
  const [rubrosIndirectos, setRubrosIndirectos] = useState(initialRubrosIndirectos);

  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];
  const projectData = currentProject.data;

  const setProjectData = (updater) => {
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectId) {
        const newData = typeof updater === 'function' ? updater(p.data) : updater;
        return { ...p, data: newData };
      }
      return p;
    }));
  };

  const handleSelectProject = (id) => {
    setCurrentProjectId(id);
    setSelectedApuId('PU_1_1');
    setActiveTab('catalogo');
  };

  const handleAddProject = () => {
    const newId = `lic-cfe-${Date.now()}`;
    const newObj = {
      id: newId,
      codigo: `LO-018TOQ-${Math.floor(100 + Math.random() * 900)}-2026`,
      concurso: `Concurso CFE-${Math.floor(1000 + Math.random() * 9000)}-CSCON-2026`,
      titulo: 'NUEVA OBRA / LICITACIÓN DE MANTENIMIENTO CFE',
      entidad: 'CFE Corporativo',
      licitante: 'INDUSTREAM S.A. DE C.V.',
      fecha: '2026-11-01',
      montoEstimado: 2120519.55,
      estado: 'En Elaboración',
      data: JSON.parse(JSON.stringify(initialProjectData))
    };
    setProjects([...projects, newObj]);
    setCurrentProjectId(newId);
  };

  const handleDuplicateProject = (id) => {
    const target = projects.find(p => p.id === id);
    if (!target) return;
    const newId = `lic-cfe-${Date.now()}`;
    const dup = {
      ...JSON.parse(JSON.stringify(target)),
      id: newId,
      codigo: `${target.codigo}-COPIA`,
      titulo: `${target.titulo} (Copia Plantilla)`
    };
    setProjects([...projects, dup]);
  };

  const handleDeleteProject = (id) => {
    if (projects.length <= 1) return;
    const filtered = projects.filter(p => p.id !== id);
    setProjects(filtered);
    if (currentProjectId === id) {
      setCurrentProjectId(filtered[0].id);
    }
  };

  // Recálculo en tiempo real
  const fsrResult = useMemo(() => {
    return calculateFSR(projectData.fsrConfig, projectData.salariosTabulado);
  }, [projectData.fsrConfig, projectData.salariosTabulado]);

  const apuResult = useMemo(() => {
    return calculateAPUEngine(projectData, fsrResult);
  }, [projectData, fsrResult]);

  const catalogResult = useMemo(() => {
    return calculateCatalogEngine(projectData.catalogoConceptos, apuResult.tarjetasCalculadas);
  }, [projectData.catalogoConceptos, apuResult.tarjetasCalculadas]);

  const selectedApu = (projectData.catalogoConceptos || []).find(c => c.item === selectedApuId) || { item: selectedApuId, descripcion: 'Concepto de Obra', unidad: 'M2' };

  const handleUpdateSobrecosto = (key, value) => {
    setProjectData(prev => ({
      ...prev,
      sobrecostos: {
        ...prev.sobrecostos,
        [key]: value
      }
    }));
  };

  const handleResetData = () => {
    if (window.confirm('¿Desea restaurar los datos predeterminados de la licitación CFE?')) {
      setProjectData(initialProjectData);
      setRubrosIndirectos(initialRubrosIndirectos);
      setSelectedApuId('PU_1_1');
    }
  };

  const handleExportExcel = () => {
    exportBudgetToExcel(projectData, fsrResult, apuResult, catalogResult);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* 1. App Titlebar */}
      <header className="opus-titlebar">
        <div className="opus-titlebar-left">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }}></span>
          <span className="opus-titlebar-badge">OPUS NEXT-GEN PRO 2026</span>
          <span style={{ color: '#64748b' }}>|</span>
          <span style={{ color: '#94a3b8', fontSize: '10px' }}>Licitación CFE: LO-018TOQ003-E142-2026 • Módulo 1 Presupuesto Programable</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#34d399' }}>● Motor LOPSRM Activo</span>
        </div>
      </header>

      {/* 2. Top Ribbon Toolbar */}
      <OpusRibbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onResetData={handleResetData}
        onExportExcel={handleExportExcel}
      />

      {/* 3. Main Workspace: Modules + Explorer + Center View */}
      <div className="opus-workspace">
        {/* Left Sidebar 1: Módulos M1-M6 */}
        <OpusModuleSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Left Sidebar 2: Tree Explorer */}
        <OpusSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Center Main View Canvas */}
        <main className="opus-main-view">
          <div className="opus-view-content">
            {activeTab === 'multiProyectos' && (
              <MultiLicitacionesView
                projects={projects}
                currentProjectId={currentProjectId}
                onSelectProject={handleSelectProject}
                onAddProject={handleAddProject}
                onDuplicateProject={handleDuplicateProject}
                onDeleteProject={handleDeleteProject}
              />
            )}

            {activeTab === 'catalogo' && (
              <CatalogView
                catalogResult={catalogResult}
                onSelectApu={(item) => setSelectedApuId(item)}
                selectedApuId={selectedApuId}
              />
            )}

            {activeTab === 'apu' && (
              <ApuView
                apuResult={apuResult}
                conceptos={projectData.catalogoConceptos || []}
                selectedApuId={selectedApuId}
                setSelectedApuId={setSelectedApuId}
                projectData={projectData}
                setProjectData={setProjectData}
              />
            )}

            {activeTab === 'gantt' && (
              <GanttScheduleView
                catalogResult={catalogResult}
              />
            )}

            {activeTab === 'fsr' && (
              <FsrView
                fsrConfig={projectData.fsrConfig}
                fsrResult={fsrResult}
                onUpdateFsrConfig={(field, val) => {
                  setProjectData(prev => ({
                    ...prev,
                    fsrConfig: { ...prev.fsrConfig, [field]: val }
                  }));
                }}
                onUpdateSalarioTabulado={(id, val) => {
                  setProjectData(prev => ({
                    ...prev,
                    salariosTabulado: prev.salariosTabulado.map(s => s.id === id ? { ...s, suterm: val } : s)
                  }));
                }}
              />
            )}

            {activeTab === 'indirectosAnalitico' && (
              <IndirectosAnaliticoView
                rubros={rubrosIndirectos}
                setRubros={setRubrosIndirectos}
                costoDirectoTotal={catalogResult.totalCostoDirectoPropuesta}
                onApplyPercent={(newPct) => {
                  handleUpdateSobrecosto('indirectos', newPct);
                  setActiveTab('sobrecostos');
                }}
              />
            )}

            {activeTab === 'sobrecostos' && (
              <OverheadsView
                sobrecostos={projectData.sobrecostos}
                onUpdateSobrecosto={handleUpdateSobrecosto}
                costoDirectoTotal={catalogResult.totalCostoDirectoPropuesta}
                totalPropuesta={catalogResult.totalPropuesta}
              />
            )}

            {activeTab === 'masterCatalog' && (
              <MasterCatalogView />
            )}

            {activeTab === 'insumos' && (
              <InputsView
                materiales={projectData.materiales}
                manoDeObra={projectData.manoDeObra}
                herramientas={projectData.herramientas}
              />
            )}

            {activeTab === 'cuadrillas' && (
              <CrewView
                cuadrillas={projectData.cuadrillas}
                manoDeObra={projectData.manoDeObra}
                fsr={fsrResult.fsr}
              />
            )}

            {activeTab === 'costoHorario' && (
              <CostoHorarioView />
            )}

            {activeTab === 'ajusteCostos' && (
              <AjusteCostosView
                materiales={projectData.materiales}
              />
            )}

            {activeTab === 'reportesOficiales' && (
              <OfficialReportsView
                catalogResult={catalogResult}
                projectData={projectData}
                apuResult={apuResult}
                selectedApu={selectedApu}
                rubrosIndirectos={rubrosIndirectos}
              />
            )}

            {activeTab === 'resumen' && (
              <DashboardView
                projectData={projectData}
                catalogResult={catalogResult}
                apuResult={apuResult}
                fsrResult={fsrResult}
                setActiveTab={setActiveTab}
                setSelectedApuId={setSelectedApuId}
              />
            )}

            {activeTab === 'importador' && (
              <ExcelImportView
                onImportProject={(importedData) => {
                  setProjectData(importedData);
                  setActiveTab('catalogo');
                }}
              />
            )}
          </div>

          {/* Bottom Live APU Inspector Panel */}
          {activeTab === 'catalogo' && showBottomMatrix && (
            <OpusBottomPanel
              selectedApu={selectedApu}
              apuResult={apuResult}
              onNavigateToApu={(apuKey) => {
                setSelectedApuId(apuKey);
                setActiveTab('apu');
              }}
            />
          )}
        </main>
      </div>

      {/* 4. Executive Statusbar */}
      <footer className="opus-statusbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#34d399', fontWeight: 700 }}>● LISTO (MOTOR LOPSRM)</span>
          <span>|</span>
          <span>ConstruBase 2026 (IndexedDB Local)</span>
          <span>|</span>
          <span>FSR UMA: 1.6378</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#fde047', fontWeight: 800 }}>
            TOTAL OBRA: {catalogResult.totalPropuesta?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </span>
        </div>
      </footer>
    </div>
  );
}
