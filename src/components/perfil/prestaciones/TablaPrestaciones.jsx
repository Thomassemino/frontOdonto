import React from 'react';
import { formatearMoneda, formatearFechaHora } from '../../../utils/formato';

const TablaPrestaciones = ({ prestaciones, onEdit, onDelete, onEditPago, onDeletePago }) => {
  return (
    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Tratamiento</th>
            <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Precio Total</th>
            <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Total Pagado</th>
            <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Saldo</th>
            <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Últimos Pagos</th>
            <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-200">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {prestaciones.map((prestacion) => {
            const totalPagado = (prestacion.pagos || [])
              .filter(pago => !pago.eliminado)
              .reduce((sum, pago) => sum + pago.monto, 0);
            const saldoPendiente = prestacion.precio - totalPagado;
            const ultimoPago = (prestacion.pagos || [])
              .filter(pago => !pago.eliminado)
              .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

            return (
              <tr key={prestacion._id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2 text-gray-900 dark:text-gray-200">
                  {prestacion.tratamientoId?.nombre || 'Sin tratamiento'}
                </td>
                <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">
                  {formatearMoneda(prestacion.precio)}
                </td>
                <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-200">
                  {formatearMoneda(totalPagado)}
                </td>
                <td className={`px-4 py-2 text-right ${
                  saldoPendiente > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {formatearMoneda(saldoPendiente)}
                </td>
                <td className="w-1/3">
                  {ultimoPago ? (
                    <div className="mb-1 rounded bg-green-50 p-2 text-sm dark:bg-green-900/20">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">
                          {formatearFechaHora(ultimoPago.fecha)} - {formatearMoneda(ultimoPago.monto)}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onEditPago(prestacion._id, ultimoPago._id)}
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
                            onClick={() => onDeletePago(prestacion._id, ultimoPago._id)}
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
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 py-2 text-gray-500 dark:text-gray-400">Sin pagos registrados</div>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(prestacion._id)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      title="Editar prestación"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" 
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(prestacion._id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                      title="Eliminar prestación"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" 
                           stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-gray-200 font-semibold dark:border-gray-700">
            <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-200" colSpan="5">
              Saldo Total:
            </td>
            <td className="px-4 py-2 text-right">
              {(() => {
                const saldoTotal = prestaciones.reduce((total, p) => {
                  const totalPagos = (p.pagos || [])
                    .filter(pago => !pago.eliminado)
                    .reduce((sum, pago) => sum + pago.monto, 0);
                  return total + (p.precio - totalPagos);
                }, 0);
                
                return (
                  <span className={`${
                    saldoTotal < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatearMoneda(Math.abs(saldoTotal))}
                  </span>
                );
              })()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TablaPrestaciones;