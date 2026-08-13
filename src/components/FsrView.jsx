import React from 'react';
import { ShieldCheck, Calendar, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from './DashboardView';

export default function FsrView({ fsrConfig, fsrResult, onUpdateFsrConfig, onUpdateSalarioTabulado }) {
  const cfg = fsrConfig;
  const res = fsrResult;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              LOPSRM • Factor de Salario Real
            </span>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>Cargas Patronales IMSS & INFONAVIT</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>Análisis del Factor de Salario Real (FSR)</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#080c14', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(52, 211, 153, 0.3)' }}>
          <div>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Factor Tp / Tl:</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
              {res.tpOverTl?.toFixed(6)}
            </span>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '12px' }}>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block' }}>FSBC:</span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              {res.fsbc?.toFixed(6)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Parameters Split: Official Days vs Wages Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '14px' }}>
        {/* Parameters Box */}
        <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontWeight: 800, fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
            Días Anuales & Parámetros Oficiales
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Año de Ejecución:</span>
              <input
                type="number"
                value={cfg.año}
                onChange={(e) => onUpdateFsrConfig('año', parseInt(e.target.value) || 2026)}
                style={{ width: '60px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'center', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>UMA Diario ($):</span>
              <input
                type="number"
                step="any"
                value={cfg.uma}
                onChange={(e) => onUpdateFsrConfig('uma', parseFloat(e.target.value) || 117.31)}
                style={{ width: '70px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'right', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Salario Mínimo ($):</span>
              <input
                type="number"
                step="any"
                value={cfg.salarioMinimo}
                onChange={(e) => onUpdateFsrConfig('salarioMinimo', parseFloat(e.target.value) || 315.04)}
                style={{ width: '70px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'right', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>% Riesgo Trabajo:</span>
              <input
                type="number"
                step="any"
                value={cfg.riesgoTrabajo * 100}
                onChange={(e) => onUpdateFsrConfig('riesgoTrabajo', (parseFloat(e.target.value) || 0) / 100)}
                style={{ width: '70px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'right', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Días Aguinaldo:</span>
              <input
                type="number"
                value={cfg.diasAguinaldo}
                onChange={(e) => onUpdateFsrConfig('diasAguinaldo', parseInt(e.target.value) || 45)}
                style={{ width: '50px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'center', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8' }}>Días Prima Vacacional:</span>
              <input
                type="number"
                value={cfg.diasPrimaVacacional}
                onChange={(e) => onUpdateFsrConfig('diasPrimaVacacional', parseInt(e.target.value) || 4)}
                style={{ width: '50px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'center', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px' }}
              />
            </div>
          </div>
        </div>

        {/* Tabulador de Salarios Table */}
        <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#1e293b', padding: '8px 12px', fontWeight: 800, fontSize: '11px', color: '#34d399' }}>
            TABULADOR DE SALARIOS REALES (SUTERM CFE / IMSS)
          </div>
          <table className="opus-grid-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Clave</th>
                <th>Categoría de Mano de Obra</th>
                <th style={{ width: '100px', textAlign: 'right' }}>Tabulado SUTERM</th>
                <th style={{ width: '100px', textAlign: 'right' }}>SBC IMSS</th>
                <th style={{ width: '80px', textAlign: 'center' }}>F.S.R.</th>
                <th style={{ width: '120px', textAlign: 'right' }}>Salario Real ($)</th>
              </tr>
            </thead>
            <tbody>
              {res.salarios.map(s => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{s.id}</td>
                  <td style={{ color: '#f1f5f9' }}>{s.categoria}</td>
                  <td style={{ textAlign: 'right' }}>
                    <input
                      type="number"
                      step="any"
                      value={s.suterm}
                      onChange={(e) => onUpdateSalarioTabulado(s.id, parseFloat(e.target.value) || 0)}
                      style={{ width: '80px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'right', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px 4px' }}
                    />
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>
                    {formatCurrency(s.sbc)}
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399', background: 'rgba(52, 211, 153, 0.05)' }}>
                    {s.fsr?.toFixed(6)}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#a7f3d0' }}>
                    {formatCurrency(s.salarioReal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
