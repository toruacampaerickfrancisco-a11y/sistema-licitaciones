import React from 'react';
import { formatCurrency } from './DashboardView';

export default function CatalogView({ 
  catalogResult, 
  onSelectApu, 
  selectedApuId 
}) {
  const { conceptosCalculados, totalCostoDirectoPropuesta, totalPropuesta } = catalogResult;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16' }}>
      {/* Top KPI Cards Bar */}
      <div className="opus-kpi-bar">
        <div className="opus-kpi-group">
          <div className="opus-kpi-card" style={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <span className="opus-kpi-label" style={{ color: '#38bdf8' }}>Total Propuesta:</span>
            <span className="opus-kpi-value" style={{ color: '#bae6fd' }}>{formatCurrency(totalPropuesta)}</span>
          </div>

          <div className="opus-kpi-card" style={{ borderColor: 'rgba(52, 211, 153, 0.3)' }}>
            <span className="opus-kpi-label" style={{ color: '#34d399' }}>Costo Directo (CD):</span>
            <span className="opus-kpi-value" style={{ color: '#a7f3d0' }}>{formatCurrency(totalCostoDirectoPropuesta)}</span>
          </div>

          <div className="opus-kpi-card" style={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}>
            <span className="opus-kpi-label" style={{ color: '#fbbf24' }}>Factor Sobrecosto:</span>
            <span className="opus-kpi-value" style={{ color: '#fef08a' }}>
              {(totalPropuesta / (totalCostoDirectoPropuesta || 1)).toFixed(4)}
            </span>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#94a3b8' }}>
          {conceptosCalculados.filter(c => !c.esEncabezado).length} Conceptos CFE
        </div>
      </div>

      {/* Main Grid Container */}
      <div style={{ flex: 1, overflow: 'auto', background: '#080c14' }}>
        <table className="opus-grid-table">
          <thead>
            <tr>
              <th style={{ width: '60px', textAlign: 'center' }}>Clave</th>
              <th>Descripción del Concepto de Trabajo</th>
              <th style={{ width: '60px', textAlign: 'center' }}>Unidad</th>
              <th style={{ width: '90px', textAlign: 'right' }}>Cantidad</th>
              <th style={{ width: '110px', textAlign: 'right' }}>P.U. Directo</th>
              <th style={{ width: '110px', textAlign: 'right' }}>P.U. Final ($)</th>
              <th style={{ width: '130px', textAlign: 'right' }}>Importe Total ($)</th>
            </tr>
          </thead>
          <tbody>
            {conceptosCalculados.map((c) => {
              if (c.esEncabezado) {
                return (
                  <tr key={c.item} className="group-header">
                    <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{c.item}</td>
                    <td colSpan={6} style={{ textTransform: 'uppercase', color: '#7dd3fc', padding: '8px 10px' }}>
                      {c.descripcion}
                    </td>
                  </tr>
                );
              }

              const isSelected = selectedApuId === c.item;

              return (
                <tr
                  key={c.item}
                  onClick={() => onSelectApu(c.item)}
                  className={isSelected ? 'selected' : ''}
                >
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{c.item}</td>
                  <td style={{ color: '#f1f5f9' }}>{c.descripcion}</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{c.unidad}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>
                    {c.cantidad.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                    {formatCurrency(c.costoDirectoUnitario)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fde047', background: 'rgba(251, 191, 36, 0.05)' }}>
                    {formatCurrency(c.precioUnitario)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#bae6fd', background: 'rgba(56, 189, 248, 0.05)' }}>
                    {formatCurrency(c.importe)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
