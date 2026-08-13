/**
 * Motor de Cálculo Horario de Maquinaria y Equipo (LOPSRM Art. 194-212)
 * Calcula Costo Fijo (Depreciación, Inversión, Mantenimiento, Seguros)
 * + Costo de Consumo (Combustibles, Lubricantes, Llantas)
 * + Costo de Operación (Operador especial)
 */

export function calculateEquipoCostoHorario(equipo) {
  const {
    valorAdquisicion = 500000,
    rescatePct = 0.10, // 10% valor de rescate
    vidaUtilHoras = 10000, // Ve en horas
    horasAño = 2000, // He
    tasaInteres = 0.115, // Tasa de interés anual (Ti)
    primaSeguro = 0.03, // Prima anual de seguros (s)
    coeficienteMantenimiento = 0.75, // Ko
    potenciaHp = 150, // Potencia del motor en HP
    tipoCombustible = 'diesel', // 'diesel' | 'gasolina' | 'electrico'
    precioCombustible = 24.50,
    precioLubricante = 95.00,
    capacidadCarterLitros = 15,
    tiempoEntreCambiosHoras = 150,
    salarioOperadorReal = 650.00
  } = equipo;

  // 1. Valor de Rescate (Vn)
  const valorRescate = valorAdquisicion * rescatePct;
  const valorDepreciar = valorAdquisicion - valorRescate;

  // 2. Costos Fijos
  // a) Depreciación (D = (Vm - Vr) / Ve)
  const depreciacion = vidaUtilHoras > 0 ? valorDepreciar / vidaUtilHoras : 0;

  // b) Inversión (I = ((Vm + Vr) * Ti) / (2 * He))
  const inversion = horasAño > 0 ? ((valorAdquisicion + valorRescate) * tasaInteres) / (2 * horasAño) : 0;

  // c) Seguros (S = ((Vm + Vr) * s) / (2 * He))
  const seguros = horasAño > 0 ? ((valorAdquisicion + valorRescate) * primaSeguro) / (2 * horasAño) : 0;

  // d) Mantenimiento (M = Ko * D)
  const mantenimiento = coeficienteMantenimiento * depreciacion;

  const totalCostoFijo = depreciacion + inversion + seguros + mantenimiento;

  // 3. Costos de Consumo
  // Factor de consumo: Diesel approx 0.15 lts/HP-hr, Gasolina 0.20 lts/HP-hr
  const factorConsumoCombustible = tipoCombustible === 'diesel' ? 0.15 : 0.20;
  const consumoCombustibleLts = potenciaHp * factorConsumoCombustible;
  const costoCombustible = consumoCombustibleLts * precioCombustible;

  // Factor de lubricante: (potenciaHp * 0.003) + (capacidadCarter / tiempoEntreCambios)
  const consumoLubricanteLts = (potenciaHp * 0.003) + (capacidadCarterLitros / tiempoEntreCambiosHoras);
  const costoLubricante = consumoLubricanteLts * precioLubricante;

  const totalConsumos = costoCombustible + costoLubricante;

  // 4. Costos de Operación (Po = Sr / HorasJornada)
  const costoOperacion = salarioOperadorReal / 8; // 8 horas por jornada

  // 5. Precio Horario Total (Phm = Fijo + Consumos + Operación)
  const costoHorarioTotal = totalCostoFijo + totalConsumos + costoOperacion;

  return {
    depreciacion,
    inversion,
    seguros,
    mantenimiento,
    totalCostoFijo,
    consumoCombustibleLts,
    costoCombustible,
    consumoLubricanteLts,
    costoLubricante,
    totalConsumos,
    costoOperacion,
    costoHorarioTotal: Math.round(costoHorarioTotal * 100) / 100
  };
}
