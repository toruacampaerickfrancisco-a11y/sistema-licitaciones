/**
  Engine de cálculo para Tarjetas de Precios Unitarios (APU),
  Cuadrillas, Insumos y Cascada de Sobrecostos conforme a la LOPSRM.
 */

export function calculateAPUEngine(data, fsrCalculated) {
  const { sobrecostos, materiales, equipos, cuadrillas, tarjetasAPU } = data;

  // 1. Mapa de Salarios Reales desde FSR
  const salariosMap = {};
  fsrCalculated.salarios.forEach(s => {
    salariosMap[s.id] = s.salarioReal;
  });

  // 2. Precios finales de materiales (con inflación)
  const materialesMap = {};
  const materialesCalculados = materiales.map(m => {
    const precioFinal = m.precioBase * (1 + (m.inflacion || 0));
    const matObj = { ...m, precioFinal };
    materialesMap[m.id] = matObj;
    return matObj;
  });

  // 3. Precios horarios de equipos (con inflación)
  const equiposMap = {};
  const equiposCalculados = equipos.map(eq => {
    const phm = eq.ch * (1 + (eq.inflacion || 0));
    const eqObj = { ...eq, phm };
    equiposMap[eq.id] = eqObj;
    return eqObj;
  });

  // 4. Costo diario de cuadrillas
  const cuadrillasMap = {};
  const cuadrillasCalculadas = cuadrillas.map(c => {
    let costoDiario = 0;
    const integrantesDetalle = c.integrantes.map(integ => {
      const sr = salariosMap[integ.salarioId] || 0;
      const subtotal = sr * integ.cantidad;
      costoDiario += subtotal;
      return {
        ...integ,
        salarioReal: sr,
        subtotal
      };
    });
    const cuadrillaObj = {
      ...c,
      costoDiario,
      integrantesDetalle
    };
    cuadrillasMap[c.id] = cuadrillaObj;
    return cuadrillaObj;
  });

  // 5. Cálculo detallado de Tarjetas de Precios Unitarios (APU)
  const tarjetasCalculadas = {};

  Object.keys(tarjetasAPU).forEach(apuKey => {
    const apu = tarjetasAPU[apuKey];

    // a) Materiales
    let sumaMateriales = 0;
    const matDetalle = (apu.materiales || []).map(item => {
      const mat = materialesMap[item.materialId] || {};
      const pm = mat.precioFinal || 0;
      const cm = item.consumo || 0;
      const importe = pm * cm;
      sumaMateriales += importe;
      return {
        ...item,
        codigo: mat.codigo,
        descripcion: mat.descripcion,
        unidad: mat.unidad,
        pm,
        cm,
        importe
      };
    });

    // b) Mano de Obra (Cuadrillas)
    let sumaManoObra = 0;
    const moDetalle = (apu.manoObra || []).map(item => {
      const cuad = cuadrillasMap[item.cuadrillaId] || {};
      const sr = cuad.costoDiario || 0;
      const r = item.rendimiento || 1;
      const importe = r > 0 ? sr / r : 0;
      sumaManoObra += importe;
      return {
        ...item,
        codigo: cuad.codigo,
        nombre: cuad.nombre,
        unidad: cuad.unidad || "jor",
        sr,
        rendimiento: r,
        importe
      };
    });

    // c) Maquinaria y Equipo
    let sumaEquipo = 0;
    const eqDetalle = (apu.equipo || []).map(item => {
      const eq = equiposMap[item.equipoId] || {};
      const phm = eq.phm || 0;
      const rhm = item.rendimiento || 1;
      const importe = rhm > 0 ? phm / rhm : 0;
      sumaEquipo += importe;
      return {
        ...item,
        codigo: eq.codigo,
        descripcion: eq.descripcion,
        unidad: eq.unidad || "HORA",
        phm,
        rendimiento: rhm,
        importe
      };
    });

    // d) Herramienta de Mano y Equipo de Seguridad
    const hm = (sobrecostos.herramientaMano || 0) * sumaManoObra;
    const es = (sobrecostos.equipoSeguridad || 0) * sumaManoObra;
    const sumaHerramientaSeguridad = hm + es;

    // e) Costo Directo (CD)
    const costoDirecto = sumaMateriales + sumaManoObra + sumaEquipo + sumaHerramientaSeguridad;

    // f) Cascada de Sobrecostos
    const indirectosImporte = (sobrecostos.indirectos || 0) * costoDirecto;
    const financiamientoImporte = (sobrecostos.financiamiento || 0) * (costoDirecto + indirectosImporte);
    const utilidadImporte = (sobrecostos.utilidad || 0) * (costoDirecto + indirectosImporte + financiamientoImporte);
    const cargosAdicionalesImporte = (sobrecostos.cargosAdicionales || 0) * (costoDirecto + indirectosImporte + financiamientoImporte + utilidadImporte);

    // g) Precio Unitario Final (PU)
    const precioUnitario = costoDirecto + indirectosImporte + financiamientoImporte + utilidadImporte + cargosAdicionalesImporte;
    const precioUnitarioRedondeado = Math.round(precioUnitario * 100) / 100;

    tarjetasCalculadas[apuKey] = {
      ...apu,
      matDetalle,
      sumaMateriales,
      moDetalle,
      sumaManoObra,
      eqDetalle,
      sumaEquipo,
      hm,
      es,
      sumaHerramientaSeguridad,
      costoDirecto,
      indirectosImporte,
      financiamientoImporte,
      utilidadImporte,
      cargosAdicionalesImporte,
      precioUnitario,
      precioUnitarioRedondeado
    };
  });

  return {
    materialesCalculados,
    equiposCalculados,
    cuadrillasCalculadas,
    tarjetasCalculadas
  };
}
