import React, { useState } from 'react';
import { Printer, FileText, Download, Building2, CheckCircle2, Sliders, ShieldCheck, ChevronRight } from 'lucide-react';
import { formatCurrency, formatPercent } from './DashboardView';
import { numeroALetras, triggerPrintReport } from '../utils/printReportGenerator';

export default function OfficialReportsView({ 
  catalogResult, 
  projectData, 
  apuResult, 
  selectedApu, 
  rubrosIndirectos 
}) {
  const [selectedFormat, setSelectedFormat] = useState('E1'); // E1, E2, E3, E4, E5
  const [empresaLicitante, setEmpresaLicitante] = useState(projectData?.info?.licitante || 'INDUSTREAM S.A. DE C.V.');
  const [representanteLegal, setRepresentanteLegal] = useState('ING. FRANCISCO ERICK TORÚA CAMPA');
  const [cargoFirmante, setCargoFirmante] = useState('REPRESENTANTE LEGAL / APODERADO');
  const [numeroLicitacion, setNumeroLicitacion] = useState(projectData?.info?.licitacion || 'LO-018TOQ003-E142-2026 / CFE-0001-CCT');

  const totalCD = catalogResult.totalCostoDirectoPropuesta || 0;
  const totalPropuesta = catalogResult.totalPropuesta || 0;
  const iva = totalPropuesta * 0.16;
  const granTotalConIva = totalPropuesta + iva;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Control Banner (Hidden when printing) */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Generador Normativo LOPSRM & CFE
            </span>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>Formatos Oficiales de Licitación</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>Documentos y Formatos Oficiales de Propuesta Económica</h2>
        </div>

        <button
          onClick={triggerPrintReport}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#34d399', color: '#090d16', borderRadius: '8px', padding: '8px 16px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', border: 'none', boxShadow: '0 4px 12px rgba(52, 211, 153, 0.3)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
        >
          <Printer size={15} />
          Imprimir / Guardar PDF Oficial
        </button>
      </div>

      {/* Format Selector Tabs */}
      <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '6px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {[
          { id: 'E1', label: 'Formato E-1 (Catálogo y Presupuesto General)' },
          { id: 'E2', label: 'Formato E-2 (Análisis de Precio Unitario APU)' },
          { id: 'E3', label: 'Formato E-3 (Explosión de Insumos y Materiales)' },
          { id: 'E4', label: 'Formato E-4 (Análisis de Indirectos y Sobrecostos)' }
        ].map(f => {
          const isActive = selectedFormat === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFormat(f.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: isActive ? '1px solid #38bdf8' : '1px solid transparent',
                background: isActive ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                color: isActive ? '#38bdf8' : '#94a3b8',
                whiteSpace: 'nowrap'
              }}
            >
              <FileText size={13} />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Official Sheet Card in DataGrid Theme */}
      <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Document Legal Header */}
        <div style={{ background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
            <span style={{ fontWeight: 800, fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              COMISIÓN FEDERAL DE ELECTRICIDAD (CFE) • GERENCIA DE GENERACIÓN
            </span>
            <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>FECHA: {projectData?.info?.fecha || '2026-08-13'}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '11px' }}>
            <div>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', display: 'block' }}>Razón Social Licitante:</span>
              <input
                type="text"
                value={empresaLicitante}
                onChange={(e) => setEmpresaLicitante(e.target.value)}
                style={{ width: '100%', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', fontWeight: 700, padding: '3px 6px', borderRadius: '4px', marginTop: '2px' }}
              />
            </div>
            <div>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', display: 'block' }}>Representante Legal:</span>
              <input
                type="text"
                value={representanteLegal}
                onChange={(e) => setRepresentanteLegal(e.target.value)}
                style={{ width: '100%', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', fontWeight: 700, padding: '3px 6px', borderRadius: '4px', marginTop: '2px' }}
              />
            </div>
            <div>
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', display: 'block' }}>Número de Concurso CFE:</span>
              <input
                type="text"
                value={numeroLicitacion}
                onChange={(e) => setNumeroLicitacion(e.target.value)}
                style={{ width: '100%', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#38bdf8', fontWeight: 700, padding: '3px 6px', borderRadius: '4px', marginTop: '2px', fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </div>
        </div>

        {/* FORMAT E-1: Catálogo y Resumen */}
        {selectedFormat === 'E1' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#1e293b', padding: '8px 12px', fontWeight: 800, fontSize: '11px', color: '#38bdf8', display: 'flex', justifyContent: 'space-between' }}>
              <span>DOCUMENTO E1: CATÁLOGO DE CONCEPTOS Y RESUMEN ECONÓMICO</span>
              <span style={{ color: '#fde047', fontFamily: 'var(--font-mono)' }}>TOTAL: {formatCurrency(totalPropuesta)}</span>
            </div>

            <table className="opus-grid-table">
              <thead>
                <tr>
                  <th style={{ width: '50px', textAlign: 'center' }}>Item</th>
                  <th>Descripción del Concepto</th>
                  <th style={{ width: '50px', textAlign: 'center' }}>Unidad</th>
                  <th style={{ width: '70px', textAlign: 'right' }}>Cantidad</th>
                  <th style={{ width: '110px', textAlign: 'right' }}>P.U. ($)</th>
                  <th style={{ width: '130px', textAlign: 'right' }}>Importe ($)</th>
                </tr>
              </thead>
              <tbody>
                {(catalogResult.conceptosCalculados || []).map((c) => {
                  if (c.esEncabezado) {
                    return (
                      <tr key={c.item} className="group-header">
                        <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{c.item}</td>
                        <td colSpan={5} style={{ textTransform: 'uppercase', color: '#7dd3fc', padding: '8px 10px' }}>
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
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: '#fde047' }}>{formatCurrency(c.precioUnitario)}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#bae6fd' }}>{formatCurrency(c.importe)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Total Letters Box */}
            <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block' }}>Importe Total con Letra:</span>
                <p style={{ fontSize: '11px', fontWeight: 800, color: '#fde047', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  {numeroALetras(granTotalConIva)}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', display: 'block' }}>Gran Total (Con IVA):</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#a7f3d0', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(granTotalConIva)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* FORMAT E-2: APU Foliado */}
        {selectedFormat === 'E2' && (() => {
          const tarjetas = apuResult?.tarjetasCalculadas || {};
          const currentApu = tarjetas[selectedApu?.item] || tarjetas[selectedApu?.apuId] || Object.values(tarjetas)[0] || {};
          const matList = currentApu.matDetalle || [];

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#1e293b', padding: '8px 12px', fontWeight: 800, fontSize: '11px', color: '#fbbf24', display: 'flex', justifyContent: 'space-between' }}>
                <span>DOCUMENTO E2: ANÁLISIS DE PRECIO UNITARIO (APU)</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>CLAVE: {currentApu.codigoConcepto || selectedApu?.item || 'PU_1_1'}</span>
              </div>

              <table className="opus-grid-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>Clave</th>
                    <th>Descripción del Insumo / Material</th>
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

              <div style={{ background: '#0f172a', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc' }}>PRECIO UNITARIO FINAL (CON SOBRECOSTOS):</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#fde047', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(currentApu.precioUnitarioRedondeado || currentApu.precioUnitario)} / {currentApu.unidad || 'M2'}
                </span>
              </div>
            </div>
          );
        })()}

        {/* FORMAT E-3 / E-4 */}
        {(selectedFormat === 'E3' || selectedFormat === 'E4') && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', background: '#0f172a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontWeight: 700, color: '#38bdf8' }}>Formato {selectedFormat} generado y listo para impresión oficial CFE.</span>
            <p style={{ fontSize: '10px', marginTop: '4px' }}>Haz clic en "Imprimir / Guardar PDF Oficial" en la barra superior para emitir el pliego foliado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
