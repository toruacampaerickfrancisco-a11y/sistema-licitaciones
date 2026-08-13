export const initialProjectData = {
  info: {
    licitacion: "Concurso CFE-0700-CSCON-0040-2025",
    anexo: "11",
    obra: "OBRA, MANTENIMIENTO A UNIDADES 1, 2 Y 4 DE LA C.T. EMILIO PORTES GIL INSTALACIÓN DE AISLAMIENTOS TÉRMICOS PARA EL PARO PROGRAMADO DEL AÑO 2026",
    licitante: "INDUSTREAM S.A. DE C.V.",
    subdireccion: "SUBDIRECCIÓN DE GENERACIÓN",
    fecha: "2026-08-04"
  },

  sobrecostos: {
    indirectos: 0.212788666666667,
    financiamiento: 0.0105683333333333,
    utilidad: 0.0933333333333333,
    cargosAdicionales: 0.00800533333333333,
    herramientaMano: 0.0366666666666667,
    equipoSeguridad: 0.0333333333333333
  },

  fsrConfig: {
    año: 2026,
    salarioMinimo: 315.04,
    salarioMinimoFrontera: 440.87,
    uma: 117.31,
    diasCalendario: 365,
    diasAguinaldo: 45,
    diasPrimaVacacional: 4,
    diasDomingo: 52,
    diasVacaciones: 15,
    diasFestivos: 7,
    diasSindicales: 7,
    diasImprevistos: 2,
    riesgoTrabajo: 0.0758875
  },

  salariosTabulado: [
    { id: "AY_OF", categoria: "AYUDANTE OFICIAL", suterm: 315.64, grupo: 3 },
    { id: "OF_PIN", categoria: "OFICIAL PINTOR", suterm: 351.89, grupo: 4 },
    { id: "OF_LAM", categoria: "OFICIAL LAMINERO", suterm: 351.89, grupo: 4 },
    { id: "OF_AIS", categoria: "OFICIAL AISLADOR", suterm: 351.89, grupo: 4 },
    { id: "OF_ALB", categoria: "OFICIAL ALBAÑIL", suterm: 351.89, grupo: 4 },
    { id: "CABO", categoria: "CABO DE OFICIO", suterm: 543.83, grupo: 5 },
    { id: "CHOFER", categoria: "CHOFER", suterm: 315.04, grupo: 1 },
    { id: "AY_GEN", categoria: "AYUDANTE GENERAL", suterm: 315.04, grupo: 1 }
  ],

  cuadrillas: [
    {
      id: "CUAD_1",
      codigo: "CUADR 1",
      nombre: "CUADRILLA no.1 PINTURA (0.2 DE CABO DE OF. + 1 OF. PINTORES + 1 AYUD. OFICIAL)",
      unidad: "jor",
      integrantes: [
        { salarioId: "CABO", cantidad: 0.2 },
        { salarioId: "OF_PIN", cantidad: 1.0 },
        { salarioId: "AY_OF", cantidad: 1.0 }
      ]
    },
    {
      id: "CUAD_2",
      codigo: "CUADR 2",
      nombre: "CUADRILLA no.2 ALBAÑILERIA (0.2 DE CABO DE OF. + 1 OF. ALBAÑIL + 1 AY. OFICIALES)",
      unidad: "jor",
      integrantes: [
        { salarioId: "CABO", cantidad: 0.2 },
        { salarioId: "OF_ALB", cantidad: 1.0 },
        { salarioId: "AY_OF", cantidad: 1.0 }
      ]
    },
    {
      id: "CUAD_3",
      codigo: "CUADR 3",
      nombre: "CUADRILLA no.3 AISLAMIENTOS (0.3 DE CABO DE OF + 1 OF. AISLADOR + 2 AYUD OFICIAL.)",
      unidad: "jor",
      integrantes: [
        { salarioId: "CABO", cantidad: 0.3 },
        { salarioId: "OF_AIS", cantidad: 1.0 },
        { salarioId: "AY_OF", cantidad: 2.0 }
      ]
    },
    {
      id: "CUAD_4",
      codigo: "CUADR 4",
      nombre: "CUADRILLA no.4 LAMINEROS (0.6 DE CABO DE OF + 2 OF. LAMINEROS + 2 AYUD OFICIAL+ 2 AYUDANTES GENERALES.)",
      unidad: "jor",
      integrantes: [
        { salarioId: "CABO", cantidad: 0.6 },
        { salarioId: "OF_LAM", cantidad: 2.0 },
        { salarioId: "AY_OF", cantidad: 2.0 },
        { salarioId: "AY_GEN", cantidad: 2.0 }
      ]
    }
  ],

  materiales: [
    { id: "MAT_01", codigo: "1", descripcion: "ALMBRE GALVANIZADO CAL. 18", unidad: "KG", precioBase: 95.58, inflacion: 0.0169 },
    { id: "MAT_02", codigo: "2", descripcion: "PRIMARIO ANTICORROSIVO CFE-P34", unidad: "L", precioBase: 385.89, inflacion: 0.0169 },
    { id: "MAT_03", codigo: "3", descripcion: "SOLVENTE CATALIZADOR CFE-P34", unidad: "L", precioBase: 120.00, inflacion: 0.0169 },
    { id: "MAT_04", codigo: "4", descripcion: "PIJAS DE ACERO INOX. DE 3/16 X 3/4 DE LARGO", unidad: "PZA", precioBase: 3.25, inflacion: 0.0169 },
    { id: "MAT_05", codigo: "5", descripcion: "LAMINA LISA CAL. 24", unidad: "M2", precioBase: 175.25, inflacion: 0.0169 },
    { id: "MAT_06", codigo: "6", descripcion: "MEDIAS CAÑAS DE FIBRA DE VIDRIO DE 2\" ESPESOR CON BARRA DE VAPOR PARA TUBERÍAS DE 3/4\" A 3 \" DE DIAMETRO", unidad: "ML", precioBase: 342.15, inflacion: 0.0169 },
    { id: "MAT_07", codigo: "7", descripcion: "BROCHA DE 2\"", unidad: "PZA", precioBase: 62.50, inflacion: 0.0169 },
    { id: "MAT_08", codigo: "8", descripcion: "MEDIAS CAÑAS DE FIBRA DE VIDRIO DE 2\" ESPESOR CON BARRA DE VAPOR PARA TUBERÍAS DE 4\" A 6 \" DE DIAMETRO", unidad: "ML", precioBase: 621.36, inflacion: 0.0169 },
    { id: "MAT_09", codigo: "9", descripcion: "COLCHA ARMADA DE LANA MINERAL DE 2´X8´X4\" DE ESPESOR CON UNA DENSIDAD DE 12 LBR/PIES", unidad: "M2", precioBase: 941.25, inflacion: 0.0169 },
    { id: "MAT_10", codigo: "10", descripcion: "CEMENTO MONOLITICO", unidad: "KG", precioBase: 14.25, inflacion: 0.0169 },
    { id: "MAT_11", codigo: "11", descripcion: "IMPERMEABILIZANTE HI MASTIC", unidad: "L", precioBase: 95.36, inflacion: 0.0169 },
    { id: "MAT_12", codigo: "12", descripcion: "P31 RECUBRIMIENTO PARA ALTAS TEMPERATURAS COLOR ALUMINIO", unidad: "L", precioBase: 638.00, inflacion: 0.00 },
    { id: "MAT_13", codigo: "13", descripcion: "ADELGAZADOR PARA CFE-P31", unidad: "L", precioBase: 100.20, inflacion: 0.00 }
  ],

  equipos: [
    { id: "EQ_01", codigo: "1", descripcion: "ANDAMIOS CON CANASTILLA Y GUINDOLA", unidad: "HORA", ch: 53.65, inflacion: 0.0169 },
    { id: "EQ_02", codigo: "2", descripcion: "CAMION DOBLE RODADA CHEVROLET SILVERADO CON PLATAFORMA DE REDILAS CARGA HASTA 2 1/2 TON.", unidad: "HORA", ch: 557.99, inflacion: 0.0169 },
    { id: "EQ_03", codigo: "3", descripcion: "BUFFER/PULIDOR DE DISCO DE 4 1/2", unidad: "HORA", ch: 14.94, inflacion: 0.0169 },
    { id: "EQ_04", codigo: "4", descripcion: "BISELADOR A DE LAMINA", unidad: "HORA", ch: 6.26, inflacion: 0.0169 }
  ],

  // Precios Unitarios Base (Tarjetas APU)
  tarjetasAPU: {
    "AUX_CONCRETO": {
      id: "AUX_CONCRETO",
      codigoConcepto: "AUX-01",
      especificacion: "AUX-MEZCLA",
      descripcion: "ELABORACIÓN DE MEZCLA DE CONCRETO F'C=200 KG/CM2 EN OBRA CON REVOLVEDORA",
      unidad: "M3",
      hoja: 1,
      totalHojas: 1,
      materiales: [
        { materialId: "MAT_01", consumo: 0.05 },
        { materialId: "MAT_10", consumo: 350.0 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_2", rendimiento: 15.0 }
      ],
      equipo: [
        { equipoId: "EQ_03", rendimiento: 8.0 }
      ]
    },

    "PU_1_1": {
      id: "PU_1_1",
      codigoConcepto: "1.1",
      especificacion: "III-01",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 3/4\" HASTA 3\"DE DIÁMETRO",
      unidad: "ML",
      hoja: 1,
      totalHojas: 7,
      auxiliares: [
        { auxiliarId: "AUX_CONCRETO", consumo: 0.05 }
      ],
      materiales: [
        { materialId: "MAT_01", consumo: 0.012 },
        { materialId: "MAT_02", consumo: 0.06 },
        { materialId: "MAT_03", consumo: 0.04 },
        { materialId: "MAT_04", consumo: 10.0 },
        { materialId: "MAT_05", consumo: 0.55 },
        { materialId: "MAT_06", consumo: 1.0 },
        { materialId: "MAT_07", consumo: 0.1 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_1", rendimiento: 44.0 },
        { cuadrillaId: "CUAD_4", rendimiento: 26.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 34.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 2.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 },
        { equipoId: "EQ_03", rendimiento: 5.0 },
        { equipoId: "EQ_04", rendimiento: 14.0 }
      ]
    },

    "PU_1_2": {
      id: "PU_1_2",
      codigoConcepto: "1.2",
      especificacion: "III-01",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 4\" HASTA 6\"DE DIÁMETRO",
      unidad: "ML",
      hoja: 2,
      totalHojas: 7,
      materiales: [
        { materialId: "MAT_01", consumo: 0.022 },
        { materialId: "MAT_02", consumo: 0.08 },
        { materialId: "MAT_03", consumo: 0.06 },
        { materialId: "MAT_04", consumo: 10.0 },
        { materialId: "MAT_05", consumo: 0.55 },
        { materialId: "MAT_08", consumo: 1.0 },
        { materialId: "MAT_07", consumo: 0.1 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_1", rendimiento: 40.0 },
        { cuadrillaId: "CUAD_4", rendimiento: 22.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 30.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 2.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 },
        { equipoId: "EQ_03", rendimiento: 5.0 },
        { equipoId: "EQ_04", rendimiento: 12.0 }
      ]
    },

    "PU_1_3": {
      id: "PU_1_3",
      codigoConcepto: "1.3",
      especificacion: "III-02",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 8\" HASTA 14\"DE DIÁMETRO",
      unidad: "ML",
      hoja: 3,
      totalHojas: 7,
      materiales: [
        { materialId: "MAT_01", consumo: 0.044 },
        { materialId: "MAT_02", consumo: 0.20 },
        { materialId: "MAT_03", consumo: 0.09 },
        { materialId: "MAT_04", consumo: 10.0 },
        { materialId: "MAT_05", consumo: 0.80 },
        { materialId: "MAT_09", consumo: 0.85 },
        { materialId: "MAT_07", consumo: 0.10 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_1", rendimiento: 36.0 },
        { cuadrillaId: "CUAD_4", rendimiento: 18.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 26.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 2.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 },
        { equipoId: "EQ_03", rendimiento: 5.0 },
        { equipoId: "EQ_04", rendimiento: 12.0 }
      ]
    },

    "PU_1_4": {
      id: "PU_1_4",
      codigoConcepto: "1.4",
      especificacion: "III-03",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS DE 4\"",
      unidad: "PZA",
      hoja: 4,
      totalHojas: 7,
      materiales: [
        { materialId: "MAT_01", consumo: 0.016 },
        { materialId: "MAT_02", consumo: 0.08 },
        { materialId: "MAT_03", consumo: 0.03 },
        { materialId: "MAT_07", consumo: 0.10 },
        { materialId: "MAT_09", consumo: 0.70 },
        { materialId: "MAT_10", consumo: 5.00 },
        { materialId: "MAT_11", consumo: 0.20 },
        { materialId: "MAT_12", consumo: 0.35 },
        { materialId: "MAT_13", consumo: 0.003 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_2", rendimiento: 20.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 20.0 },
        { cuadrillaId: "CUAD_1", rendimiento: 20.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 10.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 }
      ]
    },

    "PU_1_5": {
      id: "PU_1_5",
      codigoConcepto: "1.5",
      especificacion: "III-03",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS DE 6\"",
      unidad: "PZA",
      hoja: 5,
      totalHojas: 7,
      materiales: [
        { materialId: "MAT_01", consumo: 0.022 },
        { materialId: "MAT_02", consumo: 0.08 },
        { materialId: "MAT_03", consumo: 0.06 },
        { materialId: "MAT_07", consumo: 0.10 },
        { materialId: "MAT_09", consumo: 0.80 },
        { materialId: "MAT_10", consumo: 6.00 },
        { materialId: "MAT_11", consumo: 0.25 },
        { materialId: "MAT_12", consumo: 0.20 },
        { materialId: "MAT_13", consumo: 0.08 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_2", rendimiento: 18.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 18.0 },
        { cuadrillaId: "CUAD_1", rendimiento: 18.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 2.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 }
      ]
    },

    "PU_1_6": {
      id: "PU_1_6",
      codigoConcepto: "1.6",
      especificacion: "III-03",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS DE 8\"",
      unidad: "PZA",
      hoja: 6,
      totalHojas: 7,
      materiales: [
        { materialId: "MAT_01", consumo: 0.044 },
        { materialId: "MAT_02", consumo: 0.12 },
        { materialId: "MAT_03", consumo: 0.08 },
        { materialId: "MAT_07", consumo: 0.10 },
        { materialId: "MAT_09", consumo: 1.00 },
        { materialId: "MAT_10", consumo: 7.50 },
        { materialId: "MAT_11", consumo: 0.30 },
        { materialId: "MAT_12", consumo: 0.25 },
        { materialId: "MAT_13", consumo: 0.08 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_2", rendimiento: 16.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 16.0 },
        { cuadrillaId: "CUAD_1", rendimiento: 16.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 2.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 }
      ]
    },

    "PU_1_7": {
      id: "PU_1_7",
      codigoConcepto: "1.7",
      especificacion: "III-03",
      descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS DE 10 A 14\"",
      unidad: "PZA",
      hoja: 7,
      totalHojas: 7,
      materiales: [
        { materialId: "MAT_01", consumo: 0.05 },
        { materialId: "MAT_02", consumo: 0.22 },
        { materialId: "MAT_03", consumo: 0.09 },
        { materialId: "MAT_07", consumo: 0.10 },
        { materialId: "MAT_09", consumo: 1.20 },
        { materialId: "MAT_10", consumo: 6.00 },
        { materialId: "MAT_11", consumo: 0.30 },
        { materialId: "MAT_12", consumo: 0.34 },
        { materialId: "MAT_13", consumo: 0.09 }
      ],
      manoObra: [
        { cuadrillaId: "CUAD_2", rendimiento: 14.0 },
        { cuadrillaId: "CUAD_3", rendimiento: 14.0 },
        { cuadrillaId: "CUAD_1", rendimiento: 14.0 }
      ],
      equipo: [
        { equipoId: "EQ_01", rendimiento: 2.0 },
        { equipoId: "EQ_02", rendimiento: 36.0 }
      ]
    }
  },

  // Catálogo de Conceptos
  catalogoConceptos: [
    { item: "1", subpartida: "UNIDAD 1", especificacion: "III-01 Y III-02", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DE LA UNIDAD 1", unidad: "", cantidad: 0, apuId: null, esEncabezado: true },
    { item: "1.1", subpartida: "UNIDAD 1", especificacion: "III-01", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 3/4\" HASTA 3\"DE DIÁMETRO", unidad: "ML", cantidad: 100, apuId: "PU_1_1", esEncabezado: false },
    { item: "1.2", subpartida: "UNIDAD 1", especificacion: "III-01", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 4\" HASTA 6\"DE DIÁMETRO", unidad: "ML", cantidad: 100, apuId: "PU_1_2", esEncabezado: false },
    { item: "1.3", subpartida: "UNIDAD 1", especificacion: "III-02", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 8\" HASTA 14\"DE DIÁMETRO", unidad: "ML", cantidad: 100, apuId: "PU_1_3", esEncabezado: false },
    
    { item: "2", subpartida: "UNIDAD 1", especificacion: "III-03", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS UNIDAD 1", unidad: "", cantidad: 0, apuId: null, esEncabezado: true },
    { item: "2.1", subpartida: "UNIDAD 1", especificacion: "III-03", descripcion: "VÁLVULAS DE 4\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_4", esEncabezado: false },
    { item: "2.2", subpartida: "UNIDAD 1", especificacion: "III-03", descripcion: "VÁLVULAS DE 6\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_5", esEncabezado: false },
    { item: "2.3", subpartida: "UNIDAD 1", especificacion: "III-03", descripcion: "VÁLVULAS DE 8\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_6", esEncabezado: false },
    { item: "2.4", subpartida: "UNIDAD 1", especificacion: "III-03", descripcion: "VÁLVULAS DE 10 A 14\"", unidad: "PZA", cantidad: 5, apuId: "PU_1_7", esEncabezado: false },

    { item: "3", subpartida: "UNIDAD 2", especificacion: "III-01 Y III-02", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DE LA UNIDAD 2", unidad: "", cantidad: 0, apuId: null, esEncabezado: true },
    { item: "3.1", subpartida: "UNIDAD 2", especificacion: "III-01", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 3/4\" HASTA 3\"DE DIÁMETRO", unidad: "ML", cantidad: 100, apuId: "PU_1_1", esEncabezado: false },
    { item: "3.2", subpartida: "UNIDAD 2", especificacion: "III-01", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 4\" HASTA 6\"DE DIÁMETRO", unidad: "ML", cantidad: 100, apuId: "PU_1_2", esEncabezado: false },
    { item: "3.3", subpartida: "UNIDAD 2", especificacion: "III-02", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 8\" HASTA 14\"DE DIÁMETRO", unidad: "ML", cantidad: 100, apuId: "PU_1_3", esEncabezado: false },

    { item: "4", subpartida: "UNIDAD 2", especificacion: "III-03", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS UNIDAD 2", unidad: "", cantidad: 0, apuId: null, esEncabezado: true },
    { item: "4.1", subpartida: "UNIDAD 2", especificacion: "III-03", descripcion: "VÁLVULAS DE 4\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_4", esEncabezado: false },
    { item: "4.2", subpartida: "UNIDAD 2", especificacion: "III-03", descripcion: "VÁLVULAS DE 6\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_5", esEncabezado: false },
    { item: "4.3", subpartida: "UNIDAD 2", especificacion: "III-03", descripcion: "VÁLVULAS DE 8\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_6", esEncabezado: false },
    { item: "4.4", subpartida: "UNIDAD 2", especificacion: "III-03", descripcion: "VÁLVULAS DE 10 A 14\"", unidad: "PZA", cantidad: 5, apuId: "PU_1_7", esEncabezado: false },

    { item: "5", subpartida: "UNIDAD 4", especificacion: "III-01 Y III-02", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DE LA UNIDAD 4", unidad: "", cantidad: 0, apuId: null, esEncabezado: true },
    { item: "5.1", subpartida: "UNIDAD 4", especificacion: "III-01", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 3/4\" HASTA 3\"DE DIÁMETRO", unidad: "ML", cantidad: 200, apuId: "PU_1_1", esEncabezado: false },
    { item: "5.2", subpartida: "UNIDAD 4", especificacion: "III-01", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 4\" HASTA 6\"DE DIÁMETRO", unidad: "ML", cantidad: 150, apuId: "PU_1_2", esEncabezado: false },
    { item: "5.3", subpartida: "UNIDAD 4", especificacion: "III-02", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO Y LAMINA DE ALUMINIO LISA CAL. 24 EN TUBERÍAS DESDE 8\" HASTA 14\"DE DIÁMETRO", unidad: "ML", cantidad: 150, apuId: "PU_1_3", esEncabezado: false },

    { item: "6", subpartida: "UNIDAD 4", especificacion: "III-03", descripcion: "SUMINISTRO, RETIRO Y COLOCACIÓN DE AISLAMIENTO TÉRMICO A VÁLVULAS UNIDAD 4", unidad: "", cantidad: 0, apuId: null, esEncabezado: true },
    { item: "6.1", subpartida: "UNIDAD 4", especificacion: "III-03", descripcion: "VÁLVULAS DE 4\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_4", esEncabezado: false },
    { item: "6.2", subpartida: "UNIDAD 4", especificacion: "III-03", descripcion: "VÁLVULAS DE 6\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_5", esEncabezado: false },
    { item: "6.3", subpartida: "UNIDAD 4", especificacion: "III-03", descripcion: "VÁLVULAS DE 8\"", unidad: "PZA", cantidad: 10, apuId: "PU_1_6", esEncabezado: false },
    { item: "6.4", subpartida: "UNIDAD 4", especificacion: "III-03", descripcion: "VÁLVULAS DE 10 A 14\"", unidad: "PZA", cantidad: 5, apuId: "PU_1_7", esEncabezado: false }
  ]
};
