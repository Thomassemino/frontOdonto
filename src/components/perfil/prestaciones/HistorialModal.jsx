import React from 'react';
import { formatearMoneda, formatearFechaHora } from '../../../utils/formato';

const HistorialModal = ({ show, onClose, historial, onEditPago, onDeletePago }) => {
  if (!show) return null;

  const getTipoClass = (tipo) => {
    switch (tipo) {
      case 'Pago':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Modificación':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Eliminación de Pago':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-20"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full max-w-5xl mx-auto dark:bg-gray-800">
        {/* Botón cerrar */}
        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
          <button
            onClick={onClose}
            className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="sr-only">Cerrar</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Encabezado */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Historial de Prestaciones
          </h3>
        </div>

        {/* Tabla de historial */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-sm dark:border-gray-700 dark:bg-gray-800">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Fecha</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 min-w-[180px]">Tipo</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Tratamiento</th>
                <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Monto</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Usuario</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Detalles</th>
                <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm dark:divide-gray-700">
              {historial.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                    {formatearFechaHora(item.fecha)}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getTipoClass(item.tipo)}`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                    {item.tratamiento || 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">
                    {formatearMoneda(item.monto)}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                    {item.nombreUsuario}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {item.detalles}
                  </td>
                  <td className="px-4 py-2">
                    {item.tipo === 'Pago' && !item.eliminado && (
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onEditPago(item.prestacionId, item.pagoId)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          title="Editar pago"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" 
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => onDeletePago(item.prestacionId, item.pagoId)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400"
                          title="Eliminar pago"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" 
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialModal;