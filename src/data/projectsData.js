import { initialProjectData } from './initialData';

export const initialProjectsList = [
  {
    id: 'lic-cfe-01',
    codigo: 'LO-018TOQ003-E142-2026',
    concurso: 'Concurso CFE-0700-CSCON-0040-2025',
    titulo: 'Mantenimiento a Unidades 1, 2 y 4 C.T. Emilio Portes Gil - Aislamientos Térmicos',
    entidad: 'CFE Generación I',
    licitante: 'INDUSTREAM S.A. DE C.V.',
    fecha: '2026-08-04',
    montoEstimado: 2120519.55,
    estado: 'En Elaboración',
    data: initialProjectData
  },
  {
    id: 'lic-cfe-02',
    codigo: 'LO-018TOQ004-E210-2026',
    concurso: 'Concurso CFE-0800-OBRAS-0012-2026',
    titulo: 'Rehabilitación Integral de Calderas y Tuberías de Alta Presión C.T. Adolfo López Mateos',
    entidad: 'CFE Generación II',
    licitante: 'INDUSTREAM S.A. DE C.V.',
    fecha: '2026-09-15',
    montoEstimado: 4850320.00,
    estado: 'Por Enviar',
    data: {
      ...initialProjectData,
      info: {
        ...initialProjectData.info,
        licitacion: "Concurso CFE-0800-OBRAS-0012-2026",
        obra: "REHABILITACIÓN INTEGRAL DE CALDERAS Y TUBERÍAS DE ALTA PRESIÓN C.T. ADOLFO LÓPEZ MATEOS",
        anexo: "12-B"
      },
      sobrecostos: {
        ...initialProjectData.sobrecostos,
        indirectos: 0.198500,
        utilidad: 0.100000
      }
    }
  },
  {
    id: 'lic-cfe-03',
    codigo: 'LO-018TOQ005-E098-2026',
    concurso: 'Concurso CFE-0900-CSCON-0005-2026',
    titulo: 'Montaje Electromecánico de Transformadores de Potencia Subestación Norte 400kV',
    entidad: 'CFE Transmisión',
    licitante: 'INDUSTREAM S.A. DE C.V.',
    fecha: '2026-10-01',
    montoEstimado: 8940100.00,
    estado: 'Evaluación Técnica',
    data: {
      ...initialProjectData,
      info: {
        ...initialProjectData.info,
        licitacion: "Concurso CFE-0900-CSCON-0005-2026",
        obra: "MONTAJE ELECTROMECÁNICO DE TRANSFORMADORES DE POTENCIA SUBESTACIÓN NORTE 400KV",
        anexo: "ANEXO TEC-1"
      },
      sobrecostos: {
        ...initialProjectData.sobrecostos,
        indirectos: 0.225000,
        utilidad: 0.120000
      }
    }
  }
];
