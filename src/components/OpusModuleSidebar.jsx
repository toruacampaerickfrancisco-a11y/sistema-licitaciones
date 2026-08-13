import React from 'react';
import { 
  FileSpreadsheet, Calculator, Building2, ShieldCheck, Sliders, PieChart
} from 'lucide-react';

export default function OpusModuleSidebar({ activeTab, setActiveTab }) {
  const modules = [
    {
      id: 'm1',
      tab: 'catalogo',
      num: 'M1',
      title: 'Presupuesto',
      subtitle: 'Catálogo CFE',
      icon: FileSpreadsheet,
      color: '#38bdf8'
    },
    {
      id: 'm2',
      tab: 'apu',
      num: 'M2',
      title: 'Matrices APU',
      subtitle: 'Precios Unitarios',
      icon: Calculator,
      color: '#fbbf24'
    },
    {
      id: 'm3',
      tab: 'insumos',
      num: 'M3',
      title: 'Insumos',
      subtitle: 'Explosión Insumos',
      icon: Building2,
      color: '#22d3ee'
    },
    {
      id: 'm4',
      tab: 'fsr',
      num: 'M4',
      title: 'Factor FSR',
      subtitle: 'Salarios e IMSS',
      icon: ShieldCheck,
      color: '#34d399'
    },
    {
      id: 'm5',
      tab: 'sobrecostos',
      num: 'M5',
      title: 'Sobrecostos',
      subtitle: 'Indirectos y Utilidad',
      icon: Sliders,
      color: '#818cf8'
    },
    {
      id: 'm6',
      tab: 'resumen',
      num: 'M6',
      title: 'Resumen KPIs',
      subtitle: 'Dashboard',
      icon: PieChart,
      color: '#38bdf8'
    }
  ];

  return (
    <aside className="opus-modules-sidebar">
      <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 800, fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>
        Módulos OPUS
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '4px 0' }}>
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = 
            (m.tab === 'catalogo' && activeTab === 'catalogo') ||
            (m.tab === 'apu' && activeTab === 'apu') ||
            (m.tab === 'insumos' && (activeTab === 'insumos' || activeTab === 'cuadrillas')) ||
            (m.tab === 'fsr' && activeTab === 'fsr') ||
            (m.tab === 'sobrecostos' && activeTab === 'sobrecostos') ||
            (m.tab === 'resumen' && activeTab === 'resumen');

          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.tab)}
              className={`opus-module-item ${isActive ? 'active' : ''}`}
            >
              <span className="opus-module-badge" style={{ color: m.color }}>
                {m.num}
              </span>
              <div>
                <div style={{ fontSize: '11px', lineHeight: '1.2' }}>{m.title}</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>{m.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
