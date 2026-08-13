import React from 'react';
import { 
  DollarSign, Percent, FileText, Layers, TrendingUp, ShieldCheck, 
  ArrowUpRight, Sparkles, PieChart, CheckCircle2, ChevronRight, Sliders
} from 'lucide-react';

export function formatCurrency(num) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(num || 0);
}

export function formatPercent(num) {
  return ((num || 0) * 100).toFixed(4) + '%';
}

export default function DashboardView({ 
  projectData, 
  catalogResult, 
  apuResult, 
  fsrResult, 
  setActiveTab, 
  setSelectedApuId 
}) {
  const totalPropuesta = catalogResult.totalPropuesta || 0;
  const totalCD = catalogResult.totalCostoDirectoPropuesta || 0;
  const sobrecostosImporte = catalogResult.diferenciaSobrecostos || 0;

  const pctCD = totalPropuesta > 0 ? (totalCD / totalPropuesta) * 100 : 0;
  const pctSobrecostos = totalPropuesta > 0 ? (sobrecostosImporte / totalPropuesta) * 100 : 0;

  // Aggregate breakdown across APU cards
  let totalMat = 0;
  let totalMo = 0;
  let totalEq = 0;
  let totalHmEs = 0;

  (catalogResult.conceptosCalculados || []).forEach(c => {
    if (!c.esEncabezado && c.apuId) {
      const apu = apuResult?.tarjetasCalculadas?.[c.apuId];
      if (apu) {
        totalMat += (apu.sumaMateriales || 0) * c.cantidad;
        totalMo += (apu.sumaManoObra || 0) * c.cantidad;
        totalEq += (apu.sumaEquipo || 0) * c.cantidad;
        totalHmEs += (apu.sumaHerramientaSeguridad || 0) * c.cantidad;
      }
    }
  });

  const pctMat = totalPropuesta > 0 ? (totalMat / totalPropuesta) * 100 : 0;
  const pctMo = totalPropuesta > 0 ? (totalMo / totalPropuesta) * 100 : 0;
  const pctEq = totalPropuesta > 0 ? (totalEq / totalPropuesta) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        <div style={{ maxWidth: '70%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Licitación Oficial CFE
            </span>
            <span style={{ fontSize: '11px', color: '#34d399', fontFamily: 'var(--font-mono)' }}>Concurso: {projectData.info.licitacion}</span>
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', lineHeight: '1.4' }}>
            {projectData.info.obra}
          </h2>
          <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '4px' }}>
            Licitante: <strong style={{ color: '#f8fafc' }}>{projectData.info.licitante}</strong> • Apertura: <strong style={{ color: '#cbd5e1' }}>{projectData.info.fecha}</strong>
          </span>
        </div>

        <div style={{ background: '#080c14', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '12px 18px', textAlign: 'right', minWidth: '240px' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Importe Total de la Propuesta:</span>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#bae6fd', fontFamily: 'var(--font-mono)', display: 'block', marginTop: '2px' }}>
            {formatCurrency(totalPropuesta)}
          </span>
          <span style={{ fontSize: '9px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>M.N. Sin I.V.A. (Normatividad LOPSRM)</span>
        </div>
      </div>

      {/* 4 Financial KPIs in Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {/* Costo Directo */}
        <div style={{ background: '#080c14', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
            <span>Costo Directo (CD)</span>
            <DollarSign size={13} />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#bae6fd', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(totalCD)}
          </span>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Proporción: {pctCD.toFixed(2)}% del Total
          </span>
        </div>

        {/* Sobrecostos */}
        <div style={{ background: '#080c14', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>
            <span>Sobrecostos Totales</span>
            <Percent size={13} />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#fef08a', fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(sobrecostosImporte)}
          </span>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Factor: {(totalPropuesta / (totalCD || 1)).toFixed(4)} (+{pctSobrecostos.toFixed(2)}%)
          </span>
        </div>

        {/* Factor Salario Real */}
        <div style={{ background: '#080c14', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
            <span>Factor FSR / IMSS</span>
            <ShieldCheck size={13} />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
            {fsrResult?.tpOverTl?.toFixed(4) || '1.4681'}
          </span>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Días Tp / Tl: 414 / 282 días
          </span>
        </div>

        {/* Conceptos y Matrices */}
        <div style={{ background: '#080c14', border: '1px solid rgba(129, 140, 248, 0.2)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase' }}>
            <span>Conceptos de Obra</span>
            <Layers size={13} />
          </div>
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#c7d2fe', fontFamily: 'var(--font-mono)' }}>
            {(catalogResult.conceptosCalculados || []).filter(c => !c.esEncabezado).length} Partidas CFE
          </span>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            {Object.keys(apuResult?.tarjetasCalculadas || {}).length} Matrices APU Analizadas
          </span>
        </div>
      </div>

      {/* Breakdown Row: Cost Distribution Bar & Overheads Summary Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* Cost Distribution Details */}
        <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ fontWeight: 800, fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
            Composición del Gasto Directo
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: '#94a3b8' }}>Materiales y Suministros:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>{formatCurrency(totalMat)} ({pctMat.toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${pctMat}%`, height: '100%', background: '#38bdf8' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: '#94a3b8' }}>Mano de Obra (con FSR):</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#60a5fa' }}>{formatCurrency(totalMo)} ({pctMo.toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${pctMo}%`, height: '100%', background: '#60a5fa' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ color: '#94a3b8' }}>Maquinaria y Equipo:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fbbf24' }}>{formatCurrency(totalEq)} ({pctEq.toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${pctEq}%`, height: '100%', background: '#fbbf24' }}></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('insumos')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: '#131d33', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', borderRadius: '6px', padding: '6px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', marginTop: '6px' }}
          >
            Ver Explosión de Insumos Detallada
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Overheads Summary Table */}
        <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#1e293b', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '11px', color: '#fbbf24' }}>
            <span>MATRIZ DE SOBRECOSTOS APLICADA</span>
            <button
              onClick={() => setActiveTab('sobrecostos')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(251, 191, 36, 0.2)', border: '1px solid rgba(251, 191, 36, 0.4)', color: '#fbbf24', borderRadius: '4px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
            >
              <Sliders size={11} /> Ajustar
            </button>
          </div>
          <table className="opus-grid-table">
            <thead>
              <tr>
                <th>Factor Normativo LOPSRM</th>
                <th style={{ width: '90px', textAlign: 'right' }}>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ color: '#cbd5e1' }}>1. Costos Indirectos (Oficina Central + Campo)</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fde047' }}>{formatPercent(projectData.sobrecostos.indirectos)}</td>
              </tr>
              <tr>
                <td style={{ color: '#cbd5e1' }}>2. Costo por Financiamiento</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fde047' }}>{formatPercent(projectData.sobrecostos.financiamiento)}</td>
              </tr>
              <tr>
                <td style={{ color: '#cbd5e1' }}>3. Cargo por Utilidad Neta</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fde047' }}>{formatPercent(projectData.sobrecostos.utilidad)}</td>
              </tr>
              <tr>
                <td style={{ color: '#cbd5e1' }}>4. Cargos Adicionales (5 al millar SFP/CFE)</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#fde047' }}>{formatPercent(projectData.sobrecostos.cargosAdicionales)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
