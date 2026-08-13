import React from 'react';
import { 
  FolderKanban, Plus, ExternalLink, CheckCircle2, Clock, 
  Building2, Calendar, DollarSign, Layers, ArrowRight, Trash2, Copy
} from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function MultiLicitacionesView({ 
  projects, 
  currentProjectId, 
  onSelectProject, 
  onAddProject,
  onDuplicateProject,
  onDeleteProject 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Gestión Multi-Licitación Enterprise
            </span>
            <span style={{ fontSize: '11px', color: '#34d399', fontFamily: 'var(--font-mono)' }}>Concursos CFE & LOPSRM Simultáneos</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>Centro de Proyectos y Licitaciones en Concurrencia</h2>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
            Audita, compara presupuestos y alterna entre diferentes concursos de obra pública en tiempo real sin perder cambios.
          </p>
        </div>

        <button
          onClick={onAddProject}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#38bdf8', color: '#090d16', borderRadius: '8px', padding: '8px 14px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', border: 'none', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }}
        >
          <Plus size={14} />
          Nueva Licitación CFE
        </button>
      </div>

      {/* Grid of Projects Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        {projects.map((p) => {
          const isSelected = p.id === currentProjectId;

          return (
            <div
              key={p.id}
              style={{
                background: isSelected ? 'linear-gradient(180deg, #131d33 0%, #0f172a 100%)' : '#080c14',
                border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: isSelected ? '0 0 20px rgba(56, 189, 248, 0.15)' : 'none',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: isSelected ? '#38bdf8' : '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                    {p.codigo}
                  </span>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: p.estado === 'En Elaboración' ? '#38bdf8' : '#34d399', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    ● {p.estado}
                  </span>
                </div>

                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', lineHeight: '1.3', marginBottom: '6px' }}>
                  {p.titulo}
                </h3>
                <span style={{ fontSize: '10px', color: '#64748b', display: 'block', marginBottom: '10px' }}>
                  {p.concurso} • {p.entidad}
                </span>

                <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', display: 'block' }}>Importe Presupuesto:</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#fde047', fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(p.montoEstimado)}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', display: 'block' }}>Apertura:</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                      {p.fecha}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => onDuplicateProject(p.id)}
                    title="Duplicar concurso como plantilla"
                    style={{ background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer' }}
                  >
                    <Copy size={12} />
                  </button>
                  {projects.length > 1 && (
                    <button
                      onClick={() => onDeleteProject(p.id)}
                      title="Eliminar concurso"
                      style={{ background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f43f5e', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onSelectProject(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: isSelected ? '#38bdf8' : 'rgba(56, 189, 248, 0.15)',
                    color: isSelected ? '#090d16' : '#38bdf8',
                    border: isSelected ? 'none' : '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '10px',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {isSelected ? 'Licitación Activa' : 'Cargar Licitación'}
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
