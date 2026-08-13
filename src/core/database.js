/**
 * Motor de Base de Datos Local IndexedDB (ConstruBase Nube / Catálogo Maestro)
 * Permite almacenar, indexar y buscar miles de insumos y matrices APU instantáneamente.
 */

const DB_NAME = 'OpusNeodataProDB';
const DB_VERSION = 1;
const STORE_INSUMOS = 'catalogoInsumos';
const STORE_APUS = 'matricesApu';

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Store 1: Catálogo Maestro de Insumos
      if (!db.objectStoreNames.contains(STORE_INSUMOS)) {
        const storeInsumos = db.createObjectStore(STORE_INSUMOS, { keyPath: 'codigo' });
        storeInsumos.createIndex('tipo', 'tipo', { unique: false });
        storeInsumos.createIndex('descripcion', 'descripcion', { unique: false });
        storeInsumos.createIndex('familia', 'familia', { unique: false });
      }

      // Store 2: Matrices APU
      if (!db.objectStoreNames.contains(STORE_APUS)) {
        const storeApus = db.createObjectStore(STORE_APUS, { keyPath: 'id' });
        storeApus.createIndex('codigoConcepto', 'codigoConcepto', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Error al abrir IndexedDB: ' + event.target.error);
    };
  });
}

/**
 * Guarda masivamente miles de insumos en la base de datos local
 */
export async function bulkInsertInsumos(insumosArray) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_INSUMOS, 'readwrite');
    const store = tx.objectStore(STORE_INSUMOS);

    insumosArray.forEach(item => {
      store.put(item);
    });

    tx.oncomplete = () => resolve(insumosArray.length);
    tx.onerror = (e) => reject('Error en inserción masiva: ' + e.target.error);
  });
}

/**
 * Búsqueda ultra veloz por texto o filtro en la base de datos IndexedDB
 */
export async function searchInsumosMaster(query = '', tipoFiltro = 'todos') {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_INSUMOS, 'readonly');
    const store = tx.objectStore(STORE_INSUMOS);
    const results = [];
    const lowerQuery = query.toLowerCase();

    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const item = cursor.value;
        const matchTipo = tipoFiltro === 'todos' || item.tipo === tipoFiltro;
        const matchText = !query || 
          item.codigo.toLowerCase().includes(lowerQuery) || 
          item.descripcion.toLowerCase().includes(lowerQuery) ||
          (item.familia && item.familia.toLowerCase().includes(lowerQuery));

        if (matchTipo && matchText) {
          results.push(item);
        }

        if (results.length < 200) { // Limit results for maximum performance
          cursor.continue();
        } else {
          resolve(results);
        }
      } else {
        resolve(results);
      }
    };

    request.onerror = (e) => reject('Error en consulta de insumos: ' + e.target.error);
  });
}

/**
 * Retorna el conteo total de insumos guardados en el Catálogo Maestro
 */
export async function countMasterInsumos() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_INSUMOS, 'readonly');
    const store = tx.objectStore(STORE_INSUMOS);
    const req = store.count();
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}
