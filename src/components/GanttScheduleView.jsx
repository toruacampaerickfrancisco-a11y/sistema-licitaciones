import React, { useState } from 'react';
import { Calendar, BarChart2, TrendingUp, Layers, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { calculateGanttSchedule } from '../core/ganttEngine';
import { formatCurrency } from './DashboardView';

export default function GanttScheduleView({ catalogResult }) {
  const [duracionPeriodos, setDuracionPeriodos] = useState(4);

  const { periodos, reprogramados, totalesPeriodo } = calculateGanttSchedule(
    catalogResult.conceptosCalculados,
    duracionPeriodos
  );

  const totalPropuesta = catalogResult.totalPropuesta || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Top Banner Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', border: '1px solid rgba(251, 146, 60, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              LOPSRM • Programa de Obra & Suministros
            </span>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>Diagrama de Gantt & Flujo Financiero</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>Cronograma de Ejecución y Erogaciones por Periodo</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#080c14', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(251, 146, 60, 0.3)' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700 }}>Duración:</span>
          <input
            type="number"
            min="1"
            max="12"
            value={duracionPeriodos}
            onChange={(e) => setDuracionPeriodos(parseInt(e.target.value) || 4)}
            style={{ width: '45px', background: '#131d33', border: '1px solid #fb923c', color: '#fb923c', fontWeight: 800, fontSize: '13px', textAlign: 'center', borderRadius: '4px', padding: '2px 4px', fontFamily: 'var(--font-mono)' }}
          />
          <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '11px' }}>Meses</span>
        </div>
      </div>

      {/* Monthly Financial Progress Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${periodos.length}, 1fr)`, gap: '10px' }}>
        {periodos.map((periodo) => {
          const montoPeriodo = totalesPeriodo[periodo] || 0;
          const pctPeriodo = (montoPeriodo / totalPropuesta) * 100;
          return (
            <div key={periodo} style={{ background: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                <span>{periodo} PROGRAMADO</span>
                <BarChart2 size={13} color="#38bdf8" />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#bae6fd', fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(montoPeriodo)}
              </div>
              <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${pctPeriodo}%`, height: '100%', background: '#fb923c' }}></div>
              </div>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                {pctPeriodo.toFixed(2)}% del Presupuesto
              </span>
            </div>
          );
        })}
      </div>

      {/* Gantt Excel Sheet Grid */}
      <div style={{ flex: 1, background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'auto' }}>
        <table className="opus-grid-table">
          <thead>
            <tr>
              <th style={{ width: '50px', textAlign: 'center' }}>Clave</th>
              <th>Descripción del Concepto de Trabajo</th>
              <th style={{ width: '50px', textAlign: 'center' }}>Unidad</th>
              <th style={{ width: '70px', textAlign: 'right' }}>Cantidad</th>
              <th style={{ width: '110px', textAlign: 'right' }}>Importe Total</th>
              {periodos.map(p => (
                <th key={p} style={{ width: '120px', textAlign: 'center', background: '#1e293b', color: '#38bdf8' }}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reprogramados.map((c) => {
              if (c.esEncabezado) {
                return (
                  <tr key={c.item} className="group-header">
                    <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{c.item}</td>
                    <td colSpan={4 + periodos.length} style={{ textTransform: 'uppercase', color: '#7dd3fc', padding: '8px 10px' }}>
                      {c.descripcion}
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={c.item}>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{c.item}</td>
                  <td style={{ color: '#f1f5f9' }}>{c.descripcion}</td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{c.unidad}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{c.cantidad}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#bae6fd' }}>{formatCurrency(c.importe)}</td>
                  
                  {periodos.map(p => {
                    const dist = c.distribucion[p];
                    return (
                      <td key={p} style={{ textAlign: 'center', padding: '4px', background: 'rgba(15, 23, 42, 0.4)' }}>
                        <div style={{ background: '#131d33', border: '1px solid rgba(251, 146, 60, 0.3)', borderRadius: '4px', padding: '3px 6px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#fed7aa', fontFamily: 'var(--font-mono)', display: 'block' }}>
                            {formatCurrency(dist.monto)}
                          </span>
                          <div style={{ width: '100%', height: '3px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                            <div style={{ width: `${dist.pct}%`, height: '100%', background: '#fb923c' }}></div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
