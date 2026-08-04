import React, { useState, useMemo } from 'react';
import OpusRibbon from './components/OpusRibbon';
import OpusSidebar from './components/OpusSidebar';
import OpusBottomPanel from './components/OpusBottomPanel';

import DashboardView from './components/DashboardView';
import CatalogView from './components/CatalogView';
import ApuView from './components/ApuView';
import CrewView from './components/CrewView';
import InputsView from './components/InputsView';
import FsrView from './components/FsrView';
import OverheadsView from './components/OverheadsView';

import { initialProjectData } from './data/initialData';
import { calculateFSR } from './core/fsrEngine';
import { calculateAPUEngine } from './core/apuEngine';
import { calculateCatalogEngine } from './core/catalogEngine';
import { exportBudgetToExcel } from './utils/excelExport';

export default function App() {
  const [activeTab, setActiveTab] = useState('insumos');
  const [selectedApuId, setSelectedApuId] = useState('PU_1_1');
  const [showBottomMatrix, setShowBottomMatrix] = useState(true);
  const [projectData, setProjectData] = useState(initialProjectData);

  // Recálculo en tiempo real mediante memoización
  const fsrResult = useMemo(() => {
    return calculateFSR(projectData.fsrConfig, projectData.salariosTabulado);
  }, [projectData.fsrConfig, projectData.salariosTabulado]);

  const apuResult = useMemo(() => {
    return calculateAPUEngine(projectData, fsrResult);
  }, [projectData, fsrResult]);

  const catalogResult = useMemo(() => {
    return calculateCatalogEngine(projectData.catalogoConceptos, apuResult.tarjetasCalculadas);
  }, [projectData.catalogoConceptos, apuResult.tarjetasCalculadas]);

  // Handlers de modificación de datos
  const handleQuantityChange = (itemCode, newQty) => {
    setProjectData(prev => ({
      ...prev,
      catalogoConceptos: prev.catalogoConceptos.map(c => 
        c.item === itemCode ? { ...c, cantidad: newQty } : c
      )
    }));
  };

  const handleUpdateApuItem = (apuId, section, index, field, value) => {
    setProjectData(prev => {
      const apu = prev.tarjetasAPU[apuId];
      if (!apu) return prev;
      const list = [...apu[section]];
      list[index] = { ...list[index], [field]: value };
      return {
        ...prev,
        tarjetasAPU: {
          ...prev.tarjetasAPU,
          [apuId]: {
            ...apu,
            [section]: list
          }
        }
      };
    });
  };

  const handleUpdateCrewMember = (cuadrillaId, memberIndex, newQuantity) => {
    setProjectData(prev => ({
      ...prev,
      cuadrillas: prev.cuadrillas.map(c => {
        if (c.id !== cuadrillaId) return c;
        const integrantes = [...c.integrantes];
        integrantes[memberIndex] = { ...integrantes[memberIndex], cantidad: newQuantity };
        return { ...c, integrantes };
      })
    }));
  };

  const handleAddCrewMember = (cuadrillaId) => {
    setProjectData(prev => ({
      ...prev,
      cuadrillas: prev.cuadrillas.map(c => {
        if (c.id !== cuadrillaId) return c;
        return {
          ...c,
          integrantes: [...c.integrantes, { salarioId: 'AY_OF', cantidad: 1.0 }]
        };
      })
    }));
  };

  const handleRemoveCrewMember = (cuadrillaId, memberIndex) => {
    setProjectData(prev => ({
      ...prev,
      cuadrillas: prev.cuadrillas.map(c => {
        if (c.id !== cuadrillaId) return c;
        return {
          ...c,
          integrantes: c.integrantes.filter((_, idx) => idx !== memberIndex)
        };
      })
    }));
  };

  const handleUpdateMaterial = (index, field, value) => {
    setProjectData(prev => {
      const list = [...prev.materiales];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, materiales: list };
    });
  };

  const handleUpdateEquipo = (index, field, value) => {
    setProjectData(prev => {
      const list = [...prev.equipos];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, equipos: list };
    });
  };

  const handleAddMaterial = () => {
    const newId = `MAT_${Date.now()}`;
    const nextCode = (projectData.materiales.length + 1).toString();
    setProjectData(prev => ({
      ...prev,
      materiales: [
        ...prev.materiales,
        { id: newId, codigo: nextCode, descripcion: "NUEVO MATERIAL DE CONSTRUCCIÓN", unidad: "PZA", precioBase: 100.0, inflacion: 0.0 }
      ]
    }));
  };

  const handleAddEquipo = () => {
    const newId = `EQ_${Date.now()}`;
    const nextCode = (projectData.equipos.length + 1).toString();
    setProjectData(prev => ({
      ...prev,
      equipos: [
        ...prev.equipos,
        { id: newId, codigo: nextCode, descripcion: "NUEVO EQUIPO / HERRAMIENTA ESPECIAL", unidad: "HORA", ch: 50.0, inflacion: 0.0 }
      ]
    }));
  };

  const handleUpdateFsrConfig = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      fsrConfig: { ...prev.fsrConfig, [field]: value }
    }));
  };

  const handleUpdateSalarioTabulado = (index, sutermVal) => {
    setProjectData(prev => {
      const list = [...prev.salariosTabulado];
      list[index] = { ...list[index], suterm: sutermVal };
      return { ...prev, salariosTabulado: list };
    });
  };

  const handleUpdateSobrecosto = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      sobrecostos: { ...prev.sobrecostos, [field]: value }
    }));
  };

  const handleResetData = () => {
    if (window.confirm("¿Deseas restablecer los datos predeterminados de la obra CFE?")) {
      setProjectData(initialProjectData);
    }
  };

  const handleExportExcel = () => {
    exportBudgetToExcel(projectData, fsrResult, apuResult, catalogResult);
  };

  const selectedApu = apuResult.tarjetasCalculadas[selectedApuId];

  return (
    <div className="window-frame">
      {/* 1. Mockup Top Ribbon Toolbar */}
      <OpusRibbon
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportExcel={handleExportExcel}
        onResetData={handleResetData}
        projectInfo={projectData.info}
        totalPropuesta={catalogResult.totalPropuesta}
      />

      {/* 2. Workspace Body: Left Tree Sidebar + Center Workspace side-by-side in pure CSS */}
      <div className="workspace-body">
        {/* Left Tree Sidebar: Explorador de vistas */}
        <OpusSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          projectInfo={projectData.info}
        />

        {/* Center Workspace (Matches Mockup Right DataGrid Table) */}
        <main className="workspace-center">
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {activeTab === 'dashboard' && (
              <DashboardView
                projectData={projectData}
                catalogResult={catalogResult}
                apuResult={apuResult}
                fsrResult={fsrResult}
                setActiveTab={setActiveTab}
                setSelectedApuId={setSelectedApuId}
              />
            )}

            {activeTab === 'catalogo' && (
              <CatalogView
                catalogResult={catalogResult}
                onQuantityChange={handleQuantityChange}
                onSelectApu={(id) => {
                  setSelectedApuId(id);
                  setShowBottomMatrix(true);
                }}
              />
            )}

            {activeTab === 'apu' && (
              <ApuView
                selectedApuId={selectedApuId}
                setSelectedApuId={setSelectedApuId}
                apuResult={apuResult}
                onUpdateApuItem={handleUpdateApuItem}
              />
            )}

            {activeTab === 'cuadrillas' && (
              <CrewView
                cuadrillasCalculadas={apuResult.cuadrillasCalculadas}
                salariosTabulado={projectData.salariosTabulado}
                onUpdateCrewMember={handleUpdateCrewMember}
                onAddCrewMember={handleAddCrewMember}
                onRemoveCrewMember={handleRemoveCrewMember}
              />
            )}

            {activeTab === 'insumos' && (
              <InputsView
                materialesCalculados={apuResult.materialesCalculados}
                equiposCalculados={apuResult.equiposCalculados}
                onUpdateMaterial={handleUpdateMaterial}
                onUpdateEquipo={handleUpdateEquipo}
                onAddMaterial={handleAddMaterial}
                onAddEquipo={handleAddEquipo}
              />
            )}

            {activeTab === 'fsr' && (
              <FsrView
                fsrConfig={projectData.fsrConfig}
                fsrResult={fsrResult}
                onUpdateFsrConfig={handleUpdateFsrConfig}
                onUpdateSalarioTabulado={handleUpdateSalarioTabulado}
              />
            )}

            {activeTab === 'sobrecostos' && (
              <OverheadsView
                sobrecostos={projectData.sobrecostos}
                onUpdateSobrecosto={handleUpdateSobrecosto}
              />
            )}
          </div>

          {/* Bottom Split Matrix Inspector Panel when in Catalog view */}
          {activeTab === 'catalogo' && showBottomMatrix && selectedApu && (
            <OpusBottomPanel
              apu={selectedApu}
              onClose={() => setShowBottomMatrix(false)}
              onUpdateApuItem={handleUpdateApuItem}
            />
          )}
        </main>
      </div>
    </div>
  );
}
