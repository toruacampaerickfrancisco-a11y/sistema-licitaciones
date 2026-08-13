import React, { useState } from 'react';
import { Building, Users, DollarSign, Percent, ShieldCheck, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { calculateIndirectosLOPSRM } from '../core/indirectosEngine';
import { formatCurrency, formatPercent } from './DashboardView';

export default function IndirectosAnaliticoView({ rubros, setRubros, costoDirectoTotal, onApplyPercent }) {
  const [duracionDias, setDuracionDias] = useState(90);

  const indirectosCalc = calculateIndirectosLOPSRM(rubros, costoDirectoTotal, duracionDias);

  const handleUpdateRubro = (index, field, value) => {
    const list = [...rubros];
    list[index] = { ...list[index], [field]: value };
    setRubros(list);
  };

  const handleAddRubro = (ubicacionTarget) => {
    const newId = `IND_${Date.now()}`;
    setRubros([
      ...rubros,
      {
        id: newId,
        categoria: 'Honorarios y Sueldos',
        descripcion: 'NUEVO PUESTO O CONCEPTO DE INDIRECTO',
        ubicacion: ubicacionTarget,
        tipoCalculo: 'personal',
        cantidadPersonas: 1,
        sueldoMensual: 20000.00
      }
    ]);
  };

  const handleRemoveRubro = (index) => {
    setRubros(rubros.filter((_, idx) => idx !== index));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#090d16', color: '#f8fafc', overflowY: 'auto', padding: '14px', gap: '14px' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              LOPSRM Artículos 213 al 218
            </span>
            <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>Desglose Analítico Oficina Central y Campo</span>
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc' }}>Análisis Detallado del Factor de Indirectos (%I)</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#080c14', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
          <div>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, display: 'block' }}>% Indirecto Total:</span>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
              {formatPercent(indirectosCalc.pctIndirectoTotal)}
            </span>
          </div>
          <button
            onClick={() => onApplyPercent(indirectosCalc.pctIndirectoTotal)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fbbf24', color: '#090d16', fontWeight: 800, fontSize: '11px', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}
          >
            <CheckCircle2 size={13} />
            Aplicar al Presupuesto
          </button>
        </div>
      </div>

      {/* Tables: Campo y Central */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Tabla Campo */}
        <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#1e293b', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '11px', color: '#fbbf24' }}>
            <span>A. INDIRECTOS DE OFICINA DE CAMPO (EN SITIO DE OBRA CFE)</span>
            <button
              onClick={() => handleAddRubro('campo')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(251, 191, 36, 0.2)', border: '1px solid rgba(251, 191, 36, 0.4)', color: '#fbbf24', borderRadius: '4px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
            >
              <Plus size={11} /> Agregar
            </button>
          </div>
          <table className="opus-grid-table">
            <thead>
              <tr>
                <th style={{ width: '140px' }}>Categoría</th>
                <th>Descripción del Puesto / Rubro</th>
                <th style={{ width: '70px', textAlign: 'center' }}>Tipo</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Cant/Pers</th>
                <th style={{ width: '110px', textAlign: 'right' }}>Costo Mensual</th>
                <th style={{ width: '130px', textAlign: 'right' }}>Importe Total ({indirectosCalc.duracionMeses.toFixed(1)} Meses)</th>
                <th style={{ width: '40px', textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {indirectosCalc.rubrosCalculados.map((r, idx) => {
                if (r.ubicacion !== 'campo') return null;
                return (
                  <tr key={r.id}>
                    <td style={{ color: '#94a3b8' }}>{r.categoria}</td>
                    <td>
                      <input
                        type="text"
                        value={r.descripcion}
                        onChange={(e) => handleUpdateRubro(idx, 'descripcion', e.target.value)}
                        style={{ width: '100%', background: 'transparent', border: 'none', color: '#f8fafc', fontWeight: 600 }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#94a3b8' }}>{r.tipoCalculo}</td>
                    <td style={{ textAlign: 'center' }}>
                      {r.tipoCalculo === 'personal' ? (
                        <input
                          type="number"
                          step="any"
                          value={r.cantidadPersonas}
                          onChange={(e) => handleUpdateRubro(idx, 'cantidadPersonas', parseFloat(e.target.value) || 0)}
                          style={{ width: '50px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'center', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}
                        />
                      ) : '-'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <input
                        type="number"
                        step="any"
                        value={r.tipoCalculo === 'personal' ? r.sueldoMensual : r.costoMensual}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          handleUpdateRubro(idx, r.tipoCalculo === 'personal' ? 'sueldoMensual' : 'costoMensual', val);
                        }}
                        style={{ width: '90px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'right', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px 4px' }}
                      />
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#fde047' }}>
                      {formatCurrency(r.importeTotalRubro)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => handleRemoveRubro(idx)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tabla Central */}
        <div style={{ background: '#080c14', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#1e293b', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '11px', color: '#38bdf8' }}>
            <span>B. INDIRECTOS DE OFICINA CENTRAL (ADMINISTRACIÓN CORPORATIVA)</span>
            <button
              onClick={() => handleAddRubro('central')}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', borderRadius: '4px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}
            >
              <Plus size={11} /> Agregar
            </button>
          </div>
          <table className="opus-grid-table">
            <thead>
              <tr>
                <th style={{ width: '140px' }}>Categoría</th>
                <th>Descripción del Puesto / Rubro</th>
                <th style={{ width: '70px', textAlign: 'center' }}>Tipo</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Cant/Ponderación</th>
                <th style={{ width: '110px', textAlign: 'right' }}>Costo Mensual</th>
                <th style={{ width: '130px', textAlign: 'right' }}>Importe Total ({indirectosCalc.duracionMeses.toFixed(1)} Meses)</th>
                <th style={{ width: '40px', textAlign: 'center' }}></th>
              </tr>
            </thead>
            <tbody>
              {indirectosCalc.rubrosCalculados.map((r, idx) => {
                if (r.ubicacion !== 'central') return null;
                return (
                  <tr key={r.id}>
                    <td style={{ color: '#94a3b8' }}>{r.categoria}</td>
                    <td>
                      <input
                        type="text"
                        value={r.descripcion}
                        onChange={(e) => handleUpdateRubro(idx, 'descripcion', e.target.value)}
                        style={{ width: '100%', background: 'transparent', border: 'none', color: '#f8fafc', fontWeight: 600 }}
                      />
                    </td>
                    <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#94a3b8' }}>{r.tipoCalculo}</td>
                    <td style={{ textAlign: 'center' }}>
                      {r.tipoCalculo === 'personal' ? (
                        <input
                          type="number"
                          step="any"
                          value={r.cantidadPersonas}
                          onChange={(e) => handleUpdateRubro(idx, 'cantidadPersonas', parseFloat(e.target.value) || 0)}
                          style={{ width: '50px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'center', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}
                        />
                      ) : '-'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <input
                        type="number"
                        step="any"
                        value={r.tipoCalculo === 'personal' ? r.sueldoMensual : r.costoMensual}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          handleUpdateRubro(idx, r.tipoCalculo === 'personal' ? 'sueldoMensual' : 'costoMensual', val);
                        }}
                        style={{ width: '90px', background: '#131d33', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', textAlign: 'right', borderRadius: '4px', fontFamily: 'var(--font-mono)', padding: '2px 4px' }}
                      />
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#38bdf8' }}>
                      {formatCurrency(r.importeTotalRubro)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => handleRemoveRubro(idx)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
