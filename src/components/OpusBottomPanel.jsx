import React from 'react';
import { Layers, ChevronRight } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function OpusBottomPanel({ 
  selectedApu, 
  apuResult, 
  onNavigateToApu 
}) {
  const tarjetas = apuResult?.tarjetasCalculadas || {};
  const currentApu = tarjetas[selectedApu?.item] || tarjetas[selectedApu?.apuId] || Object.values(tarjetas)[0];

  if (!selectedApu || !currentApu) {
    return (
      <div className="opus-inspector-panel" style={{ alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
        Selecciona un concepto del presupuesto superior para auditar su matriz APU en vivo.
      </div>
    );
  }

  const matList = currentApu.matDetalle || [];
  const auxList = currentApu.auxDetalle || [];
  const moList = currentApu.moDetalle || [];

  return (
    <div className="opus-inspector-panel">
      {/* Panel Header */}
      <div className="opus-inspector-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={14} color="#fbbf24" />
          <span style={{ fontWeight: 700, color: '#f8fafc' }}>
            Inspector APU en Vivo: <span style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{currentApu.codigoConcepto || selectedApu.item}</span>
          </span>
          <span style={{ color: '#94a3b8', maxWidth: '500px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            — {currentApu.descripcion}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', marginRight: '6px' }}>P.U. Final:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fde047', fontSize: '13px' }}>
              {formatCurrency(currentApu.precioUnitarioRedondeado || currentApu.precioUnitario)} / {currentApu.unidad}
            </span>
          </div>

          <button
            onClick={() => onNavigateToApu(currentApu.id || selectedApu.item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '10px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Editar Matriz
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Breakdown Grid Columns */}
      <div className="opus-inspector-grid">
        {/* 1. Materiales */}
        <div className="opus-inspector-card">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#38bdf8' }}>
              <span>Materiales ({matList.length})</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(currentApu.sumaMateriales)}</span>
            </div>
            <div style={{ marginTop: '4px', maxHeight: '85px', overflowY: 'auto' }}>
              {matList.map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '10px' }}>
                  <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#cbd5e1' }}>{m.descripcion}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f8fafc' }}>{formatCurrency(m.importe)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Auxiliares / Submatrices */}
        <div className="opus-inspector-card">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#818cf8' }}>
              <span>Auxiliares ({auxList.length})</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(currentApu.sumaAuxiliares)}</span>
            </div>
            <div style={{ marginTop: '4px', maxHeight: '85px', overflowY: 'auto' }}>
              {auxList.length === 0 ? (
                <span style={{ color: '#64748b', fontStyle: 'italic', fontSize: '10px' }}>Sin submatrices compuestas</span>
              ) : (
                auxList.map(a => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '10px' }}>
                    <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#cbd5e1' }}>{a.descripcion}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#a5b4fc' }}>{formatCurrency(a.importe)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 3. Mano de Obra */}
        <div className="opus-inspector-card">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700, color: '#60a5fa' }}>
              <span>Mano de Obra / FSR</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(currentApu.sumaManoObra)}</span>
            </div>
            <div style={{ marginTop: '4px', maxHeight: '85px', overflowY: 'auto' }}>
              {moList.map(mo => (
                <div key={mo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '10px' }}>
                  <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#cbd5e1' }}>{mo.descripcion}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#93c5fd' }}>{formatCurrency(mo.importe)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Resumen Cascada Sobrecostos */}
        <div className="opus-inspector-card" style={{ background: 'linear-gradient(135deg, #131d33 0%, #0f172a 100%)', borderColor: 'rgba(251, 191, 36, 0.2)' }}>
          <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
            <span style={{ textTransform: 'uppercase', fontWeight: 800, color: '#fbbf24', display: 'block', marginBottom: '4px' }}>Cascada Sobrecostos</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '2px' }}>
              <span>Costo Directo (CD):</span>
              <span style={{ fontWeight: 700, color: '#f8fafc' }}>{formatCurrency(currentApu.costoDirecto)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '2px' }}>
              <span>+ Indirectos Obra:</span>
              <span style={{ color: '#fde047' }}>{formatCurrency(currentApu.indirectosImporte)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', marginBottom: '2px' }}>
              <span>+ Utilidad:</span>
              <span style={{ color: '#86efac' }}>{formatCurrency(currentApu.utilidadImporte)}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '11px', color: '#fde047' }}>
            <span>P.U. FINAL:</span>
            <span>{formatCurrency(currentApu.precioUnitarioRedondeado || currentApu.precioUnitario)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
