import React, { useState } from 'react';
import { Calculator, Hammer, HardHat, Wrench, Shield, ArrowRight, Percent, Sparkles, PieChart, Plus, Trash2 } from 'lucide-react';
import { formatCurrency, formatPercent } from './DashboardView';

export default function ApuView({ selectedApuId, setSelectedApuId, apuResult, onUpdateApuItem }) {
  const tarjetas = apuResult?.tarjetasCalculadas || {};
  const apuKeys = Object.keys(tarjetas);
  const currentApu = tarjetas[selectedApuId] || tarjetas[apuKeys[0]];

  if (!currentApu) {
    return (
      <div style={{ padding: '20px', color: '#64748b', textAlign: 'center' }}>
        No hay matriz APU seleccionada.
      </div>
    );
  }

  const matList = currentApu.matDetalle || [];
  const auxList = currentApu.auxDetalle || [];
  const moList = currentApu.moDetalle || [];
  const eqList = currentApu.eqDetalle || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Selector of APUs Header */}
      <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
        <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', whiteSpace: 'nowrap' }}>
          Seleccionar Matriz:
        </span>
        {apuKeys.map((key) => {
          const card = tarjetas[key];
          const isActive = card.id === currentApu.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelectedApuId(card.id)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                background: isActive ? 'rgba(56, 189, 248, 0.2)' : '#131d33',
                color: isActive ? '#38bdf8' : '#cbd5e1'
              }}
            >
              {card.codigoConcepto}
            </button>
          );
        })}
      </div>

      {/* APU Sheet Header Card */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ maxWidth: '75%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
              CLAVE: {currentApu.codigoConcepto} • UNIDAD: {currentApu.unidad}
            </span>
          </div>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc', lineHeight: '1.4' }}>
            {currentApu.descripcion}
          </h2>
        </div>

        <div style={{ background: '#080c14', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.3)', textAlign: 'right', minWidth: '180px' }}>
          <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block' }}>P.U. Final Calculado:</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#fde047', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(currentApu.precioUnitarioRedondeado || currentApu.precioUnitario)}
          </span>
          <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>Por {currentApu.unidad}</span>
        </div>
      </div>

      {/* 1. Materiales Grid */}
      <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: '#1e293b', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '11px', color: '#38bdf8' }}>
          <span>1. MATERIALES Y SUMINISTROS ({matList.length})</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>Subtotal: {formatCurrency(currentApu.sumaMateriales)}</span>
        </div>
        <table className="opus-grid-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Clave</th>
              <th>Descripción del Material</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Unidad</th>
              <th style={{ width: '80px', textAlign: 'right' }}>Cantidad</th>
              <th style={{ width: '110px', textAlign: 'right' }}>Costo Unitario ($)</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Importe ($)</th>
            </tr>
          </thead>
          <tbody>
            {matList.map(m => (
              <tr key={m.id}>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{m.id}</td>
                <td style={{ color: '#f1f5f9' }}>{m.descripcion}</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{m.unidad}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{m.cantidad}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{formatCurrency(m.precioUnitario || m.precioFinal)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#f8fafc' }}>{formatCurrency(m.importe)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Submatrices Auxiliares Grid */}
      <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: '#1e293b', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '11px', color: '#818cf8' }}>
          <span>2. MATRICES AUXILIARES COMPUESTAS ({auxList.length})</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>Subtotal: {formatCurrency(currentApu.sumaAuxiliares)}</span>
        </div>
        <table className="opus-grid-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Clave Aux</th>
              <th>Descripción de la Sub-matriz</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Unidad</th>
              <th style={{ width: '80px', textAlign: 'right' }}>Cantidad</th>
              <th style={{ width: '110px', textAlign: 'right' }}>Costo Unitario ($)</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Importe ($)</th>
            </tr>
          </thead>
          <tbody>
            {auxList.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic', padding: '12px' }}>
                  Sin submatrices compuestas asignadas a este concepto.
                </td>
              </tr>
            ) : (
              auxList.map(a => (
                <tr key={a.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#818cf8' }}>{a.id}</td>
                  <td style={{ color: '#f1f5f9' }}>{a.descripcion}</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{a.unidad}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{a.cantidad}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{formatCurrency(a.precioUnitario)}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#a5b4fc' }}>{formatCurrency(a.importe)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Mano de Obra Grid */}
      <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: '#1e293b', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '11px', color: '#60a5fa' }}>
          <span>3. MANO DE OBRA (CUADRILLAS CON FACTOR FSR)</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>Subtotal: {formatCurrency(currentApu.sumaManoObra)}</span>
        </div>
        <table className="opus-grid-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>Cuadrilla</th>
              <th>Descripción de Cuadrilla</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Unidad</th>
              <th style={{ width: '80px', textAlign: 'right' }}>Rendimiento</th>
              <th style={{ width: '110px', textAlign: 'right' }}>Costo Diario ($)</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Importe ($)</th>
            </tr>
          </thead>
          <tbody>
            {moList.map(mo => (
              <tr key={mo.id}>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#60a5fa' }}>{mo.id}</td>
                <td style={{ color: '#f1f5f9' }}>{mo.descripcion}</td>
                <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{mo.unidad}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{mo.cantidad}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{formatCurrency(mo.costoDiario)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#93c5fd' }}>{formatCurrency(mo.importe)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
