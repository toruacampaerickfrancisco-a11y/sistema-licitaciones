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
  const [empresaLicitante, setEmpresaLicitante] = useState('CONSTRUCCIONES INDUSTRIALES DEL NORTE S.A. DE C.V.');
  const [representanteLegal, setRepresentanteLegal] = useState('ING. FRANCISCO ERICK TORÚA CAMPA');
  const [cargoFirmante, setCargoFirmante] = useState('REPRESENTANTE LEGAL / APODERADO');
  const [numeroLicitacion, setNumeroLicitacion] = useState('LO-018TOQ003-E142-2026 / CFE-0001-CCT');

  const totalCD = catalogResult.totalCostoDirectoPropuesta || 0;
  const totalPropuesta = catalogResult.totalPropuesta || 0;
  const iva = totalPropuesta * 0.16;
  const granTotalConIva = totalPropuesta + iva;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs select-none">
      {/* Control Bar (Hidden when printing) */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest font-mono">
              Generador de Documentos Normativos
            </span>
            <span className="text-xs text-sky-300 font-mono">Licitaciones Públicas LOPSRM & CFE</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Formatos Oficiales de Propuesta Económica</h2>
          <p className="text-xs text-slate-300">
            Exporta e imprime la propuesta con membretes de concurso, desglose de indirectos y firmas legales para auditoría.
          </p>
        </div>

        <button
          onClick={triggerPrintReport}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition font-mono uppercase tracking-wider"
        >
          <Printer className="w-5 h-5" />
          Imprimir / Guardar PDF Oficial
        </button>
      </div>

      {/* Format Selector Tabs (Hidden when printing) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-300 shadow-sm flex flex-wrap gap-2 print:hidden">
        <button
          onClick={() => setSelectedFormat('E1')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 text-xs ${
            selectedFormat === 'E1'
              ? 'bg-[#0b4a72] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Formato E-1 (Catálogo y Presupuesto General)
        </button>
        <button
          onClick={() => setSelectedFormat('E2')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 text-xs ${
            selectedFormat === 'E2'
              ? 'bg-[#0b4a72] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Formato E-2 (Análisis de Precio Unitario APU)
        </button>
        <button
          onClick={() => setSelectedFormat('E3')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 text-xs ${
            selectedFormat === 'E3'
              ? 'bg-[#0b4a72] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Formato E-3 (Explosión de Insumos y Materiales)
        </button>
        <button
          onClick={() => setSelectedFormat('E4')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 text-xs ${
            selectedFormat === 'E4'
              ? 'bg-[#0b4a72] text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Formato E-4 (Análisis de Indirectos y Sobrecostos)
        </button>
      </div>

      {/* Licitante & Signature Configuration (Hidden when printing) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 print:hidden">
        <div>
          <label className="text-[10px] font-bold uppercase text-slate-500 block">Razón Social del Licitante</label>
          <input
            type="text"
            value={empresaLicitante}
            onChange={(e) => setEmpresaLicitante(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 mt-1"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase text-slate-500 block">Representante Legal / Apoderado</label>
          <input
            type="text"
            value={representanteLegal}
            onChange={(e) => setRepresentanteLegal(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 mt-1"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase text-slate-500 block">Número de Concurso / Licitación</label>
          <input
            type="text"
            value={numeroLicitacion}
            onChange={(e) => setNumeroLicitacion(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono font-bold text-slate-900 mt-1"
          />
        </div>
      </div>

      {/* Printable Sheet (Standard A4 / Letter Styled Canvas) */}
      <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-2xl space-y-6 max-w-5xl mx-auto text-slate-900 print:shadow-none print:border-none print:p-0">
        {/* Official Letterhead Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-black text-sky-900 tracking-widest uppercase block">
              COMISIÓN FEDERAL DE ELECTRICIDAD (CFE) • GERENCIA DE GENERACIÓN
            </span>
            <h1 className="text-base font-black uppercase text-slate-950">
              DOCUMENTO {selectedFormat}: {
                selectedFormat === 'E1' ? 'CATÁLOGO DE CONCEPTOS Y RESUMEN ECONÓMICO' :
                selectedFormat === 'E2' ? `ANÁLISIS DE PRECIO UNITARIO (APU: ${selectedApu?.item || 'PU-01'})` :
                selectedFormat === 'E3' ? 'EXPLOSIÓN DE RECURSOS E INSUMOS BÁSICOS' :
                'ANÁLISIS ANALÍTICO DE GASTOS INDIRECTOS Y FACTORES DE SOBRECOSTO'
              }
            </h1>
            <p className="text-[10px] font-semibold text-slate-600">
              CONCURSO: <span className="font-mono font-bold text-slate-900">{numeroLicitacion}</span>
            </p>
          </div>

          <div className="text-right space-y-1">
            <span className="text-[10px] font-mono text-slate-500 block">FECHA: 13/AGO/2026</span>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300 block">
              HOJA 1 DE 1
            </span>
          </div>
        </div>

        {/* FORMAT E-1: Presupuesto General */}
        {selectedFormat === 'E1' && (
          <div className="space-y-4">
            <table className="w-full text-[11px] border-collapse border border-slate-400">
              <thead>
                <tr className="bg-slate-200 text-slate-900 font-black border-b border-slate-400">
                  <th className="border border-slate-400 p-1.5 w-16 text-center">ITEM</th>
                  <th className="border border-slate-400 p-1.5 text-left">DESCRIPCIÓN DEL CONCEPTO</th>
                  <th className="border border-slate-400 p-1.5 w-16 text-center">UNIDAD</th>
                  <th className="border border-slate-400 p-1.5 w-20 text-right">CANTIDAD</th>
                  <th className="border border-slate-400 p-1.5 w-28 text-right">P.U. ($)</th>
                  <th className="border border-slate-400 p-1.5 w-32 text-right">IMPORTE ($)</th>
                </tr>
              </thead>
              <tbody>
                {catalogResult.conceptosCalculados.map(c => {
                  if (c.esEncabezado) {
                    return (
                      <tr key={c.item} className="bg-slate-100 font-black border-b border-slate-400">
                        <td className="border border-slate-400 p-1.5 text-center font-mono">{c.item}</td>
                        <td colSpan={5} className="border border-slate-400 p-1.5 uppercase tracking-wide">
                          {c.descripcion}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={c.item} className="border-b border-slate-300">
                      <td className="border border-slate-400 p-1.5 text-center font-mono font-bold">{c.item}</td>
                      <td className="border border-slate-400 p-1.5 text-slate-800">{c.descripcion}</td>
                      <td className="border border-slate-400 p-1.5 text-center font-mono">{c.unidad}</td>
                      <td className="border border-slate-400 p-1.5 text-right font-mono font-semibold">{c.cantidad}</td>
                      <td className="border border-slate-400 p-1.5 text-right font-mono font-bold">{formatCurrency(c.precioUnitario)}</td>
                      <td className="border border-slate-400 p-1.5 text-right font-mono font-black">{formatCurrency(c.importe)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Financial Summary & Amount in Letters */}
            <div className="flex justify-end pt-2">
              <div className="w-80 space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between border-b border-slate-300 pb-1">
                  <span className="font-bold text-slate-700">SUBTOTAL (COSTO DIRECTO + SOBRECOSTOS):</span>
                  <span className="font-extrabold">{formatCurrency(totalPropuesta)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-300 pb-1">
                  <span className="font-bold text-slate-700">I.V.A. (16.00%):</span>
                  <span className="font-extrabold">{formatCurrency(iva)}</span>
                </div>
                <div className="flex justify-between bg-slate-200 p-1.5 rounded font-black text-xs text-slate-950">
                  <span>TOTAL DE LA PROPUESTA:</span>
                  <span>{formatCurrency(granTotalConIva)}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-300 text-[10px] space-y-1">
              <span className="font-bold text-slate-700 block">IMPORTE TOTAL CON LETRA:</span>
              <p className="font-bold text-slate-950 tracking-wide font-mono">
                {numeroALetras(granTotalConIva)}
              </p>
            </div>
          </div>
        )}

        {/* FORMAT E-2: APU Foliado */}
        {selectedFormat === 'E2' && (() => {
          const tarjetas = apuResult?.tarjetasCalculadas || {};
          const currentApu = tarjetas[selectedApu?.item] || tarjetas[selectedApu?.apuId] || Object.values(tarjetas)[0] || {};
          const matList = currentApu.matDetalle || [];

          return (
            <div className="space-y-4 text-[11px]">
              <div className="bg-slate-100 p-3 rounded border border-slate-400 space-y-1">
                <div className="flex justify-between font-mono font-bold">
                  <span>CLAVE: {currentApu.codigoConcepto || selectedApu?.item || 'PU_1_1'}</span>
                  <span>UNIDAD: {currentApu.unidad || 'M2'}</span>
                  <span>ESPEC: {currentApu.especificacion || 'EP-CFE'}</span>
                </div>
                <p className="font-bold text-slate-900 uppercase">
                  {currentApu.descripcion || 'CONCEPTO DE TRABAJO'}
                </p>
              </div>

              {/* Materiales */}
              <table className="w-full border-collapse border border-slate-400">
                <thead>
                  <tr className="bg-slate-200 font-bold border-b border-slate-400">
                    <th colSpan={5} className="p-1 text-left">1. MATERIALES Y SUMINISTROS</th>
                  </tr>
                  <tr className="bg-slate-50 text-[10px]">
                    <th className="border border-slate-400 p-1 text-left">Descripción</th>
                    <th className="border border-slate-400 p-1 w-16 text-center">Unidad</th>
                    <th className="border border-slate-400 p-1 w-20 text-right">Cantidad</th>
                    <th className="border border-slate-400 p-1 w-24 text-right">Costo ($)</th>
                    <th className="border border-slate-400 p-1 w-28 text-right">Importe ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {matList.map(m => (
                    <tr key={m.id}>
                      <td className="border border-slate-400 p-1">{m.descripcion}</td>
                      <td className="border border-slate-400 p-1 text-center font-mono">{m.unidad}</td>
                      <td className="border border-slate-400 p-1 text-right font-mono">{m.cantidad}</td>
                      <td className="border border-slate-400 p-1 text-right font-mono">{formatCurrency(m.precioUnitario || m.precioFinal)}</td>
                      <td className="border border-slate-400 p-1 text-right font-mono font-bold">{formatCurrency(m.importe)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total APU Box */}
              <div className="bg-slate-900 text-white p-3 rounded-xl flex justify-between items-center font-mono">
                <span className="font-black text-xs">PRECIO UNITARIO FINAL (CON SOBRECOSTOS):</span>
                <span className="font-black text-base text-amber-400">{formatCurrency(currentApu.precioUnitarioRedondeado || currentApu.precioUnitario)} / {currentApu.unidad || 'M2'}</span>
              </div>
            </div>
          );
        })()}

        {/* FORMAT E-4: Indirectos */}
        {selectedFormat === 'E4' && (
          <div className="space-y-4">
            <p className="text-[11px] font-bold text-slate-800">
              Desglose analítico de los indirectos de oficina central y campo conforme a los artículos 213 al 218 del Reglamento de la LOPSRM.
            </p>
            <table className="w-full text-[11px] border-collapse border border-slate-400">
              <thead>
                <tr className="bg-slate-200 font-bold border-b border-slate-400">
                  <th className="border border-slate-400 p-1.5 text-left">Puesto / Rubro de Gasto</th>
                  <th className="border border-slate-400 p-1.5 w-24 text-center">Ubicación</th>
                  <th className="border border-slate-400 p-1.5 w-32 text-right">Costo Mensual</th>
                </tr>
              </thead>
              <tbody>
                {rubrosIndirectos.map(r => (
                  <tr key={r.id}>
                    <td className="border border-slate-400 p-1.5 font-medium">{r.descripcion}</td>
                    <td className="border border-slate-400 p-1.5 text-center font-mono uppercase font-bold text-[10px]">
                      {r.ubicacion}
                    </td>
                    <td className="border border-slate-400 p-1.5 text-right font-mono font-bold">
                      {formatCurrency(r.tipoCalculo === 'personal' ? r.sueldoMensual : r.costoMensual)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Official Legal Signatures */}
        <div className="pt-12 grid grid-cols-2 gap-12 text-center text-[10px] border-t border-slate-300 mt-8">
          <div className="space-y-1">
            <div className="border-b border-slate-900 pb-12 w-64 mx-auto"></div>
            <span className="font-black text-slate-950 block">{empresaLicitante}</span>
            <span className="font-bold text-slate-800 block">{representanteLegal}</span>
            <span className="text-slate-600 block">{cargoFirmante}</span>
          </div>

          <div className="space-y-1">
            <div className="border-b border-slate-900 pb-12 w-64 mx-auto"></div>
            <span className="font-black text-slate-950 block">SUPERVISIÓN Y EVALUACIÓN CFE</span>
            <span className="font-bold text-slate-800 block">RESIDENTE GENERAL DE OBRA</span>
            <span className="text-slate-600 block">SUBGERENCIA DE PROYECTOS TERMOELÉCTRICOS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
