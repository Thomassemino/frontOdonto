import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TablaAtenciones = ({ atenciones, onEdit, onDelete }) => {
  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    fecha.setHours(fecha.getHours() + 3);
    return format(fecha, "dd/MM/yyyy HH:mm", { locale: es });
  };

  return (
    <div className="hidden md:block w-full">
      <div className="inline-block min-w-full py-2 align-middle">
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6">
                  Fecha
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                  Profesional
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 w-full">
                  Notas
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {atenciones.map((atencion, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-gray-300 sm:pl-6">
                    {formatFecha(atencion.fecha)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-300">
                    {atencion.profesional}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-300">
                    <div className="break-words">
                      {atencion.notaDelDia}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(atencion.fecha)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                        aria-label="Editar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(atencion.fecha)}
                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                        aria-label="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" 
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
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

export default TablaAtenciones;