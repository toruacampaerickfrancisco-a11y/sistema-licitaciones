import React from 'react';
import { Sliders, Percent, ShieldAlert, History, HelpCircle } from 'lucide-react';
import { formatPercent } from './DashboardView';

export default function OverheadsView({ sobrecostos, onUpdateSobrecosto }) {
  const sob = sobrecostos;

  const historicalData = [
    { empresa: 'INDUSTREAM S.A. DE C.V.', concurso: 'CFE-0700-CSCON-0040-2025', indirectos: 0.229466, financiamiento: 0.013405, utilidad: 0.100000, adicion: 0.008390, kh: 0.05, ks: 0.05 },
    { empresa: 'SERAMAQ S.A. DE C.V.', concurso: 'CFE-0700-CSCON-0031-2022', indirectos: 0.248900, financiamiento: 0.011200, utilidad: 0.080000, adicion: 0.009600, kh: 0.03, ks: 0.03 },
    { empresa: 'URCOTAM S.A. DE C.V.', concurso: 'CFE-0600-CSCON-0008-2019', indirectos: 0.160000, financiamiento: 0.007100, utilidad: 0.100000, adicion: 0.006026, kh: 0.03, ks: 0.02 }
  ];

  const applyHistoricalAvg = () => {
    const avgI = (0.229466 + 0.248900 + 0.160000) / 3;
    const avgF = (0.013405 + 0.011200 + 0.007100) / 3;
    const avgU = (0.100000 + 0.080000 + 0.100000) / 3;
    const avgA = (0.008390 + 0.009600 + 0.006026) / 3;
    const avgKh = (0.05 + 0.03 + 0.03) / 3;
    const avgKs = (0.05 + 0.03 + 0.02) / 3;

    onUpdateSobrecosto('indirectos', avgI);
    onUpdateSobrecosto('financiamiento', avgF);
    onUpdateSobrecosto('utilidad', avgU);
    onUpdateSobrecosto('cargosAdicionales', avgA);
    onUpdateSobrecosto('herramientaMano', avgKh);
    onUpdateSobrecosto('equipoSeguridad', avgKs);
  };

  const factors = [
    { key: 'indirectos', title: '1. Costos Indirectos (%I)', desc: 'Gastos de administración central y de campo de la contratista.', val: sob.indirectos },
    { key: 'financiamiento', title: '2. Financiamiento (%F)', desc: 'Costo de capital derivado de los egresos no cubiertos por anticipos.', val: sob.financiamiento },
    { key: 'utilidad', title: '3. Cargo por Utilidad (%U)', desc: 'Ganancia neta esperada por el contratista antes de impuestos.', val: sob.utilidad },
    { key: 'cargosAdicionales', title: '4. Cargos Adicionales (%A)', desc: 'Derecho de inspección (5 al millar CFE/SFP) y auditorías.', val: sob.cargosAdicionales },
    { key: 'herramientaMano', title: '5. Herramienta Menor (%Kh)', desc: 'Porcentaje aplicado sobre el costo total de la Mano de Obra.', val: sob.herramientaMano },
    { key: 'equipoSeguridad', title: '6. Equipo Seguridad (%Ks)', desc: 'Equipo de protección personal (EPP) sobre el costo de Mano de Obra.', val: sob.equipoSeguridad }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(129, 140, 248, 0.3)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(129, 140, 248, 0.15)', color: '#818cf8', border: '1px solid rgba(129, 140, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              LOPSRM Artículos 187 al 220
            </span>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>Factores de Sobrecosto</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>Matriz de Factores y Porcentajes de Licitación</h2>
        </div>

        <button
          onClick={applyHistoricalAvg}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', color: '#fbbf24', borderRadius: '8px', padding: '6px 12px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
        >
          <History size={13} />
          Cargar Promedio Histórico
        </button>
      </div>

      {/* Factors Input Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {factors.map(f => (
          <div key={f.key} style={{ background: '#080c14', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 700, color: '#818cf8' }}>
                <span>{f.title}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#34d399' }}>{formatPercent(f.val)}</span>
              </div>
              <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px', lineHeight: '1.3' }}>{f.desc}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number"
                step="0.0001"
                value={(f.val * 100).toFixed(4)}
                onChange={(e) => onUpdateSobrecosto(f.key, (parseFloat(e.target.value) || 0) / 100)}
                style={{ width: '100%', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', fontWeight: 800, fontSize: '13px', textAlign: 'right', borderRadius: '6px', padding: '4px 8px', fontFamily: 'var(--font-mono)' }}
              />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Historical Benchmarking Table */}
      <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: '#1e293b', padding: '8px 12px', fontWeight: 800, fontSize: '11px', color: '#fbbf24' }}>
          TABLA DE REFERENCIA HISTÓRICA EN LICITACIONES CFE
        </div>
        <table className="opus-grid-table">
          <thead>
            <tr>
              <th>Compañía Licitante</th>
              <th>Concurso CFE</th>
              <th style={{ textAlign: 'right' }}>Indirectos (%I)</th>
              <th style={{ textAlign: 'right' }}>Finan. (%F)</th>
              <th style={{ textAlign: 'right' }}>Utilidad (%U)</th>
              <th style={{ textAlign: 'right' }}>Adicional (%A)</th>
              <th style={{ textAlign: 'right' }}>Kh %</th>
              <th style={{ textAlign: 'right' }}>Ks %</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((h, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700, color: '#f8fafc' }}>{h.empresa}</td>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{h.concurso}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{formatPercent(h.indirectos)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{formatPercent(h.financiamiento)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{formatPercent(h.utilidad)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#cbd5e1' }}>{formatPercent(h.adicion)}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{(h.kh * 100).toFixed(2)}%</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>{(h.ks * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
