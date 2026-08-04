/**
  Engine de cálculo para el Catálogo de Conceptos e Importes Totales.
 */

export function calculateCatalogEngine(catalogoConceptos, tarjetasCalculadas) {
  let totalPropuesta = 0;
  let totalCostoDirectoPropuesta = 0;

  const conceptosCalculados = catalogoConceptos.map(item => {
    if (item.esEncabezado || !item.apuId) {
      return {
        ...item,
        precioUnitario: 0,
        precioUnitarioRedondeado: 0,
        costoDirectoUnitario: 0,
        importe: 0,
        importeDirecto: 0
      };
    }

    const apu = tarjetasCalculadas[item.apuId] || {};
    const puExacto = apu.precioUnitario || 0;
    const puRedondeado = apu.precioUnitarioRedondeado || Math.round(puExacto * 100) / 100;
    const cdUnitario = apu.costoDirecto || 0;

    const cantidad = item.cantidad || 0;
    const importe = cantidad * puRedondeado;
    const importeDirecto = cantidad * cdUnitario;

    totalPropuesta += importe;
    totalCostoDirectoPropuesta += importeDirecto;

    return {
      ...item,
      precioUnitario: puExacto,
      precioUnitarioRedondeado: puRedondeado,
      costoDirectoUnitario: cdUnitario,
      importe,
      importeDirecto
    };
  });

  return {
    conceptosCalculados,
    totalPropuesta,
    totalCostoDirectoPropuesta,
    diferenciaSobrecostos: totalPropuesta - totalCostoDirectoPropuesta
  };
}
