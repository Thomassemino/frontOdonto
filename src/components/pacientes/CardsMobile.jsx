import React from 'react';

const CardsMobile = ({ pacientes, onEdit, onDelete }) => {
  return (
    <div className="md:hidden space-y-4">
      {pacientes.map((paciente) => (
        <div key={paciente.dni} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="font-medium text-gray-900 dark:text-white">{paciente.nombre || ""}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">DNI: {paciente.dni || ""}</div>
            </div>
            <button
              onClick={() => window.location.href = `/perfil/${paciente.dni}`}
              className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Email:</span>
            <p className="mt-1 text-gray-900 dark:text-white">{paciente.mail || ""}</p>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Teléfono:</span>
            <p className="mt-1 text-gray-900 dark:text-white">
              <span>{paciente.areaCode || ""}</span>
              <span>{paciente.telefono || ""}</span>
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onEdit(paciente)}
              className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Editar
            </button>
            <button
              onClick={() => onDelete(paciente.dni, paciente.nombre)}
              className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsMobile;