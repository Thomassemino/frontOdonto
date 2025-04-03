import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TarjetasAtenciones = ({ atenciones, onEdit, onDelete }) => {
  const formatFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    fecha.setHours(fecha.getHours() + 3);
    return format(fecha, "dd/MM/yyyy HH:mm", { locale: es });
  };

  return (
    <div className="md:hidden space-y-4">
      {atenciones.map((atencion, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {formatFecha(atencion.fecha)}
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {atencion.profesional}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(atencion.fecha)}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 p-1"
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
                className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 p-1"
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
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300 text-left break-words">
            {atencion.notaDelDia}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarjetasAtenciones;