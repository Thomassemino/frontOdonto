/**
 * Formatea un valor numérico a moneda en pesos argentinos
 * @param {number} valor - El valor a formatear
 * @returns {string} El valor formateado como moneda
 */
export const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(valor);
  };
  
  /**
   * Formatea una fecha y hora en formato local argentino
   * @param {string|Date} fecha - La fecha a formatear
   * @returns {string} La fecha formateada
   */
  export const formatearFechaHora = (fecha) => {
    return new Date(fecha).toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };