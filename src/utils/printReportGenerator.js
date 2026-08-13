/**
 * Utilidades para generación de reportes impresos oficiales de Licitaciones LOPSRM / CFE
 */

export function numeroALetras(cantidad) {
  const numero = Math.floor(cantidad);
  const centavos = Math.round((cantidad - numero) * 100);
  const centavosStr = centavos < 10 ? `0${centavos}` : `${centavos}`;

  // Formato estándar para documentos de licitación en México
  return `(${numero.toLocaleString('es-MX')} PESOS ${centavosStr}/100 M.N.)`.toUpperCase();
}

export function triggerPrintReport() {
  window.print();
}
