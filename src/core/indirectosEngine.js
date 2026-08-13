/**
 * Motor de Cálculo Analítico de Indirectos (LOPSRM Artículos 213 al 218)
 * Desglosa el porcentaje total de indirecto calculando rubro por rubro
 * (Personal Técnico/Administrativo, Rentas, Pasajes, Seguros, Papelería, etc.)
 */

export function calculateIndirectosLOPSRM(rubrosIndirectos, costoDirectoTotal, duracionDias = 90) {
  let totalOficinaCentral = 0;
  let totalOficinaCampo = 0;

  const duracionMeses = duracionDias / 30;

  const rubrosCalculados = rubrosIndirectos.map(rubro => {
    let importeMes = 0;
    let importeTotalRubro = 0;

    if (rubro.tipoCalculo === 'personal') {
      // Sueldo mensual por número de personas por meses de obra
      importeMes = (rubro.sueldoMensual || 0) * (rubro.cantidadPersonas || 1);
      importeTotalRubro = importeMes * duracionMeses;
    } else {
      // Importe fijo mensual o global
      importeMes = rubro.costoMensual || 0;
      importeTotalRubro = importeMes * duracionMeses;
    }

    if (rubro.ubicacion === 'central') {
      totalOficinaCentral += importeTotalRubro;
    } else {
      totalOficinaCampo += importeTotalRubro;
    }

    return {
      ...rubro,
      importeMes,
      importeTotalRubro
    };
  });

  const totalIndirectosPesos = totalOficinaCentral + totalOficinaCampo;
  
  // Porcentajes ponderados sobre el Costo Directo de la Obra (%I = TotalIndirectos / CostoDirecto)
  const pctCentral = costoDirectoTotal > 0 ? (totalOficinaCentral / costoDirectoTotal) : 0;
  const pctCampo = costoDirectoTotal > 0 ? (totalOficinaCampo / costoDirectoTotal) : 0;
  const pctIndirectoTotal = costoDirectoTotal > 0 ? (totalIndirectosPesos / costoDirectoTotal) : 0;

  return {
    rubrosCalculados,
    totalOficinaCentral,
    totalOficinaCampo,
    totalIndirectosPesos,
    pctCentral,
    pctCampo,
    pctIndirectoTotal,
    duracionMeses
  };
}
