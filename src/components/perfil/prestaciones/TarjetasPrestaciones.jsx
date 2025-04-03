import React from 'react';
import { formatearMoneda, formatearFechaHora } from '../../../utils/formato';

const TarjetasPrestaciones = ({ prestaciones, onEdit, onDelete, onEditPago, onDeletePago }) => {
  return (
    <div className="md:hidden space-y-4">
      {prestaciones.map((prestacion) => {
        const totalPagado = (prestacion.pagos || [])
          .filter(pago => !pago.eliminado)
          .reduce((sum, pago) => sum + pago.monto, 0);
        const saldoPendiente = prestacion.precio - totalPagado;
        const ultimoPago = (prestacion.pagos || [])
          .filter(pago => !pago.eliminado)
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

        return (
          <div key={prestacion._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {prestacion.tratamientoId?.nombre || 'Sin tratamiento'}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(prestacion._id)}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    title="Editar prestación"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Precio Total</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatearMoneda(prestacion.precio)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Pagado</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatearMoneda(totalPagado)}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 dark:text-gray-400">Saldo Pendiente</p>
                  <p className={`font-medium ${
                    saldoPendiente > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    {formatearMoneda(Math.abs(saldoPendiente))}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Último Pago</h4>
                {ultimoPago ? (
                  <div className="rounded bg-green-50 p-2 text-sm dark:bg-green-900/20">
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
                    {ultimoPago.nombreOdontologo && (
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Registrado por: {ultimoPago.nombreOdontologo}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    No hay pagos registrados
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Saldo Total */}
      <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="flex justify-between items-center px-4">
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            Saldo Total:
          </span>
          <span className={`font-semibold ${
            prestaciones.reduce((total, p) => {
              const totalPagos = (p.pagos || [])
                .filter(pago => !pago.eliminado)
                .reduce((sum, pago) => sum + pago.monto, 0);
              return total + (p.precio - totalPagos);
            }, 0) > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {formatearMoneda(Math.abs(prestaciones.reduce((total, p) => {
              const totalPagos = (p.pagos || [])
                .filter(pago => !pago.eliminado)
                .reduce((sum, pago) => sum + pago.monto, 0);
              return total + (p.precio - totalPagos);
            }, 0)))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TarjetasPrestaciones;