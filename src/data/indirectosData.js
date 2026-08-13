/**
 * Rubros predeterminados para desglose analítico de indirectos conforme a Ley LOPSRM Art. 213-218
 */

export const initialRubrosIndirectos = [
  // 1. Personal Directivo y Técnico (Oficina Campo)
  { id: 'IND_01', categoria: 'Honorarios y Sueldos', descripcion: 'SUPERINTENDENTE DE OBRA', ubicacion: 'campo', tipoCalculo: 'personal', cantidadPersonas: 1, sueldoMensual: 45000.00 },
  { id: 'IND_02', categoria: 'Honorarios y Sueldos', descripcion: 'RESIDENTE DE EDIFICACIÓN / AISLAMIENTO', ubicacion: 'campo', tipoCalculo: 'personal', cantidadPersonas: 1, sueldoMensual: 32000.00 },
  { id: 'IND_03', categoria: 'Honorarios y Sueldos', descripcion: 'INGENIERO DE SEGURIDAD Y HIGIENE (SSPA CFE)', ubicacion: 'campo', tipoCalculo: 'personal', cantidadPersonas: 1, sueldoMensual: 28000.00 },
  { id: 'IND_04', categoria: 'Honorarios y Sueldos', descripcion: 'TOPÓGRAFO / CONTROLISTA DE CALIDAD', ubicacion: 'campo', tipoCalculo: 'personal', cantidadPersonas: 1, sueldoMensual: 24000.00 },

  // 2. Personal Oficina Central
  { id: 'IND_05', categoria: 'Honorarios y Sueldos', descripcion: 'DIRECTOR GENERAL DE EMPRESA', ubicacion: 'central', tipoCalculo: 'personal', cantidadPersonas: 0.25, sueldoMensual: 90000.00 },
  { id: 'IND_06', categoria: 'Honorarios y Sueldos', descripcion: 'GERENTE DE LICITACIONES Y PRECIOS UNITARIOS', ubicacion: 'central', tipoCalculo: 'personal', cantidadPersonas: 0.50, sueldoMensual: 55000.00 },
  { id: 'IND_07', categoria: 'Honorarios y Sueldos', descripcion: 'CONTADOR GENERAL / ADMINISTRACIÓN', ubicacion: 'central', tipoCalculo: 'personal', cantidadPersonas: 0.50, sueldoMensual: 35000.00 },

  // 3. Depreciación, Mantenimiento y Rentas
  { id: 'IND_08', categoria: 'Depreciación y Rentas', descripcion: 'RENTA DE OFICINA CENTRAL Y BODEGA', ubicacion: 'central', tipoCalculo: 'fijo', costoMensual: 18000.00 },
  { id: 'IND_09', categoria: 'Depreciación y Rentas', descripcion: 'RENTA DE OFICINA DE CAMPO Y COMEDOR EN PLANTA CFE', ubicacion: 'campo', tipoCalculo: 'fijo', costoMensual: 12000.00 },

  // 4. Servicios y Papelería
  { id: 'IND_10', categoria: 'Servicios Principales', descripcion: 'CONSUMO DE LUZ, AGUA, INTERNET Y TELÉFONOS EN CAMPO', ubicacion: 'campo', tipoCalculo: 'fijo', costoMensual: 6500.00 },
  { id: 'IND_11', categoria: 'Fletes y Pasajes', descripcion: 'VIÁTICOS, COMBUSTIBLE Y PASAJES DE PERSONAL TÉCNICO', ubicacion: 'campo', tipoCalculo: 'fijo', costoMensual: 15000.00 }
];
