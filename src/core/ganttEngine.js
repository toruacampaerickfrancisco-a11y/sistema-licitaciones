/**
 * Motor de Programación de Obra (Diagrama de Gantt & Insumos Programados)
 * Distribuye cantidades y montos por periodos (semanas/meses) para generar el cronograma de ejecución.
 */

export function calculateGanttSchedule(conceptos, duracionPeriodos = 4) {
  // Periodos (Mes 1, Mes 2, Mes 3, Mes 4)
  const periodos = Array.from({ length: duracionPeriodos }, (_, i) => `Mes ${i + 1}`);

  const reprogramados = conceptos.map(c => {
    if (c.esEncabezado) {
      return { ...c, distribucion: {} };
    }

    // Distribución uniforme por defecto
    const pctPorPeriodo = 100 / duracionPeriodos;
    const cantidadPorPeriodo = c.cantidad / duracionPeriodos;
    const montoPorPeriodo = c.importe / duracionPeriodos;

    const distribucion = {};
    periodos.forEach(p => {
      distribucion[p] = {
        pct: pctPorPeriodo,
        cantidad: cantidadPorPeriodo,
        monto: montoPorPeriodo
      };
    });

    return {
      ...c,
      distribucion
    };
  });

  // Totales por periodo
  const totalesPeriodo = {};
  periodos.forEach(p => {
    totalesPeriodo[p] = 0;
    reprogramados.forEach(c => {
      if (!c.esEncabezado && c.distribucion[p]) {
        totalesPeriodo[p] += c.distribucion[p].monto;
      }
    });
  });

  return {
    periodos,
    reprogramados,
    totalesPeriodo
  };
}
