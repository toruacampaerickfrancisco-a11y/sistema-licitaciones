/**
 * Motor de Ajuste de Costos e Índices de Inflación (LOPSRM Art. 56 al 59)
 * Calcula el factor de incremento de costo (K) por tipo de insumo según variación INPC / INEGI / CFE.
 */

export function calculateAjusteDeCostos(materiales, indiceBase = 125.40, indiceActual = 132.80) {
  // Factor de incremento general K = (IndiceActual / IndiceBase)
  const factorKGeneral = indiceBase > 0 ? (indiceActual / indiceBase) : 1.0;
  const incrementoPctGeneral = (factorKGeneral - 1) * 100;

  const materialesAjustados = materiales.map(m => {
    const precioAjustado = m.precioBase * factorKGeneral;
    const diferenciaUnitario = precioAjustado - m.precioBase;

    return {
      ...m,
      precioAjustado: Math.round(precioAjustado * 100) / 100,
      diferenciaUnitario: Math.round(diferenciaUnitario * 100) / 100,
      factorK: Math.round(factorKGeneral * 10000) / 10000
    };
  });

  return {
    indiceBase,
    indiceActual,
    factorKGeneral,
    incrementoPctGeneral,
    materialesAjustados
  };
}
