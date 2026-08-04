/**
  Engine de cálculo para Factor de Salario Base de Cotización (FSBC),
  Factor de Salario Real (FSR) e Impuestos Patronales IMSS / Infonavit
  según la LOPSRM y normatividad CFE.
 */

export function calculateFSR(config, salariosTabulado) {
  const {
    salarioMinimo,
    uma,
    diasCalendario,
    diasAguinaldo,
    diasPrimaVacacional,
    diasDomingo,
    diasVacaciones,
    diasFestivos,
    diasSindicales,
    diasImprevistos,
    riesgoTrabajo
  } = config;

  // 1. Días realmente pagados (Tp) y Laborados (Tl)
  const tp = diasCalendario + diasAguinaldo + diasPrimaVacacional; // p.ej. 365 + 45 + 4 = 414
  const dinla = diasDomingo + diasVacaciones + diasFestivos + diasSindicales + diasImprevistos; // p.ej. 52 + 15 + 7 + 7 + 2 = 83
  const tl = diasCalendario - dinla; // p.ej. 365 - 83 = 282
  const tpOverTl = tp / tl; // 414 / 282 = 1.4680851
  const fsbc = tp / diasCalendario; // 414 / 365 = 1.1342465

  const uma3 = uma * 3; // 117.31 * 3 = 351.93

  // 2. Procesar cada categoría salarial
  const resultadosSalarios = salariosTabulado.map(item => {
    // Si el salario tabulado SUTERM es menor al salario mínimo aplicable, se toma el mínimo
    const salarioBase = Math.max(item.suterm, salarioMinimo);
    
    // Salario en UMAs
    const salarioUMA = salarioBase / uma;
    
    // Salario Base de Cotización (SBC) para IMSS en UMAS
    const sbcUMA = salarioUMA * fsbc;
    const sbcPesos = salarioBase * fsbc;

    // Diferencia 3 UMAs (para cuota adicional de enfermedad y maternidad)
    const dif3UMA = sbcUMA > 3 ? (sbcUMA - 3) : 0;

    // Cuotas patronales (porcentaje sobre SBC en UMAS o por factor)
    const cRiesgoTrabajo = riesgoTrabajo * sbcUMA;
    const cCuotaFija = 0.204 * 1.0; // 20.4% de 1 UMA
    const cCuotaAdicional = 0.015 * dif3UMA; // 1.5% (1.1% patrón + 0.4% obrero)
    const cGastosMedicos = 0.01425 * sbcUMA; // 1.425% (1.05% patrón + 0.375% obrero)
    const cEnDinero = 0.0095 * sbcUMA; // 0.95% (0.7% patrón + 0.25% obrero)
    const cInvalidezVida = 0.02375 * sbcUMA; // 2.375% (1.75% patrón + 0.625% obrero)
    const cRetiro = 0.02 * sbcUMA; // 2.0%

    // Cesantía en Edad Avanzada y Vejez (por rangos según sbcUMA)
    let pctCesantia = 0.06361; // Rango base para 2.5 a 3.5 UMA
    if (sbcUMA <= 1.0) pctCesantia = 0.0315;
    else if (sbcUMA <= 1.5) pctCesantia = 0.03413;
    else if (sbcUMA <= 2.0) pctCesantia = 0.04253;
    else if (sbcUMA <= 2.5) pctCesantia = 0.05307;
    else if (sbcUMA <= 3.0) pctCesantia = 0.06361;
    else pctCesantia = 0.07513;

    const cCesantiaVejez = pctCesantia * sbcUMA;
    const cGuarderia = 0.01 * sbcUMA; // 1.0%

    const imssTotalUMA = cRiesgoTrabajo + cCuotaFija + cCuotaAdicional + cGastosMedicos +
                         cEnDinero + cInvalidezVida + cRetiro + cCesantiaVejez + cGuarderia;

    const infonavitUMA = 0.05 * sbcUMA; // 5.0%

    const prestacionesTotalUMA = imssTotalUMA + infonavitUMA;

    // Obligación Obrero-Patronal (Ps)
    const ps = prestacionesTotalUMA / sbcUMA;

    // Factor de Salario Real (FSR)
    const fsr = (ps * tpOverTl) + tpOverTl;

    // Salario Real (Sr) en pesos por jornal
    const salarioReal = salarioBase * fsr;

    return {
      ...item,
      salarioBase,
      sbcPesos,
      fsr,
      salarioReal
    };
  });

  return {
    tp,
    dinla,
    tl,
    tpOverTl,
    fsbc,
    salarios: resultadosSalarios
  };
}
