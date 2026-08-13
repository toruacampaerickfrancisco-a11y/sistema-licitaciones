import React from 'react';
import { Building2, Plus, CheckCircle2, FolderGit2 } from 'lucide-react';

export default function OpusBiddingSidebar({ 
  projects, 
  currentProjectId, 
  onSelectProject, 
  onAddProject 
}) {
  return (
    <aside className="opus-bidding-sidebar">
      <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: '10px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Licitaciones CFE
        </span>
        <button
          onClick={onAddProject}
          title="Crear Nueva Licitación"
          style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', borderRadius: '4px', padding: '2px 4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Plus size={12} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '4px 0', overflowY: 'auto' }}>
        {projects.map((p) => {
          const isActive = p.id === currentProjectId;

          return (
            <button
              key={p.id}
              onClick={() => onSelectProject(p.id)}
              className={`opus-bidding-item ${isActive ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <div style={{ marginTop: '2px' }}>
                  <Building2 size={13} color={isActive ? '#38bdf8' : '#94a3b8'} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: isActive ? '#38bdf8' : '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.codigo}
                  </div>
                  <div style={{ fontSize: '9px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.titulo}
                  </div>
                  <div style={{ fontSize: '8px', color: isActive ? '#34d399' : '#64748b', fontWeight: 700, marginTop: '2px' }}>
                    ● {p.estado}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
