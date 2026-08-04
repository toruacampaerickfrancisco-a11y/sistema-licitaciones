import * as XLSX from 'xlsx';

export function exportBudgetToExcel(projectData, fsrResult, apuResult, catalogResult) {
  const wb = XLSX.utils.book_new();

  // 1. Hoja Catálogo
  const catData = [
    ["CATÁLOGO DE CONCEPTOS DE TRABAJO CONTENIENDO EL IMPORTE TOTAL DE LA PROPUESTA"],
    ["LICITACIÓN:", projectData.info.licitacion, "", "ANEXO:", projectData.info.anexo],
    ["OBRA:", projectData.info.obra],
    ["LICITANTE:", projectData.info.licitante],
    [],
    ["No.", "ESPECIFICACIÓN", "DESCRIPCIÓN", "CANTIDAD", "UNIDAD", "PRECIO UNITARIO", "IMPORTE"]
  ];

  catalogResult.conceptosCalculados.forEach(c => {
    catData.push([
      c.item,
      c.especificacion,
      c.descripcion,
      c.esEncabezado ? "" : c.cantidad,
      c.unidad,
      c.esEncabezado ? "" : c.precioUnitarioRedondeado,
      c.esEncabezado ? "" : c.importe
    ]);
  });

  catData.push([]);
  catData.push(["", "", "", "", "", "TOTAL DE LA PROPUESTA:", catalogResult.totalPropuesta]);

  const wsCat = XLSX.utils.aoa_to_sheet(catData);
  XLSX.utils.book_append_sheet(wb, wsCat, "Catálogo");

  // 2. Hoja Tarjetas APU
  Object.values(apuResult.tarjetasCalculadas).forEach(apu => {
    const apuRows = [
      [`ANÁLISIS DE PRECIO UNITARIO - CONCEPTO ${apu.codigoConcepto}`],
      ["DESCRIPCIÓN:", apu.descripcion],
      ["UNIDAD:", apu.unidad],
      [],
      ["MATERIALES"],
      ["CÓDIGO", "DESCRIPCIÓN", "UNIDAD", "PRECIO (Pm)", "CONSUMO (Cm)", "IMPORTE"],
      ...apu.matDetalle.map(m => [m.codigo, m.descripcion, m.unidad, m.pm, m.cm, m.importe]),
      ["", "", "", "", "SUMA MATERIALES:", apu.sumaMateriales],
      [],
      ["MANO DE OBRA"],
      ["CÓDIGO", "DESCRIPCIÓN", "UNIDAD", "SALARIO REAL (Sr)", "RENDIMIENTO (R)", "IMPORTE"],
      ...apu.moDetalle.map(mo => [mo.codigo, mo.nombre, mo.unidad, mo.sr, mo.rendimiento, mo.importe]),
      ["", "", "", "", "SUMA MANO DE OBRA:", apu.sumaManoObra],
      [],
      ["MAQUINARIA Y EQUIPO"],
      ["CÓDIGO", "DESCRIPCIÓN", "UNIDAD", "COSTO HORARIO (Phm)", "RENDIMIENTO (Rhm)", "IMPORTE"],
      ...apu.eqDetalle.map(eq => [eq.codigo, eq.descripcion, eq.unidad, eq.phm, eq.rendimiento, eq.importe]),
      ["", "", "", "", "SUMA EQUIPO:", apu.sumaEquipo],
      [],
      ["HERRAMIENTA Y SEGURIDAD"],
      ["Herramienta de Mano (Kh)", "", "", "", "", apu.hm],
      ["Equipo de Seguridad (Ks)", "", "", "", "", apu.es],
      ["", "", "", "", "SUMA HERRAMIENTA Y SEGURIDAD:", apu.sumaHerramientaSeguridad],
      [],
      ["COSTO DIRECTO (CD):", "", "", "", "", apu.costoDirecto],
      ["COSTO INDIRECTO (CI):", "", "", "", "", apu.indirectosImporte],
      ["COSTO POR FINANCIAMIENTO (CF):", "", "", "", "", apu.financiamientoImporte],
      ["CARGO POR UTILIDAD (CU):", "", "", "", "", apu.utilidadImporte],
      ["CARGOS ADICIONALES (CA):", "", "", "", "", apu.cargosAdicionalesImporte],
      ["PRECIO UNITARIO FINAL (PU):", "", "", "", "", apu.precioUnitarioRedondeado]
    ];

    const wsApu = XLSX.utils.aoa_to_sheet(apuRows);
    const sheetName = `PU ${apu.codigoConcepto}`.substring(0, 31);
    XLSX.utils.book_append_sheet(wb, wsApu, sheetName);
  });

  // 3. Hoja FSR & Salarios
  const fsrRows = [
    ["TABULADOR DE SALARIOS REALES Y FACTOR DE SALARIO REAL (FSR)"],
    ["FECHA DE CÁLCULO:", projectData.info.fecha],
    ["DÍAS CALENDARIO (Dical):", projectData.fsrConfig.diasCalendario],
    ["DÍAS PAGADOS (Tp):", fsrResult.tp],
    ["DÍAS LABORADOS (Tl):", fsrResult.tl],
    ["FACTOR Tp / Tl:", fsrResult.tpOverTl],
    ["FACTOR BASE COTIZACIÓN (FSBC):", fsrResult.fsbc],
    [],
    ["CATEGORÍA", "SALARIO BASE", "SBC (PESOS)", "FSR", "SALARIO REAL (PESOS)"],
    ...fsrResult.salarios.map(s => [s.categoria, s.salarioBase, s.sbcPesos, s.fsr, s.salarioReal])
  ];

  const wsFsr = XLSX.utils.aoa_to_sheet(fsrRows);
  XLSX.utils.book_append_sheet(wb, wsFsr, "FSR y Salarios");

  // Descargar archivo Excel
  const filename = `Presupuesto_CFE_${projectData.info.licitacion.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`;
  XLSX.writeFile(wb, filename);
}
