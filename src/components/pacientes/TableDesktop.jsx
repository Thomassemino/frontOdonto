import React from 'react';

const TableDesktop = ({ pacientes, onEdit, onDelete }) => {
  return (
    <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">DNI</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Nombre Completo</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Número de Celular</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Perfil</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {pacientes.map((paciente) => (
            <tr key={paciente.dni} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{paciente.dni || ""}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{paciente.nombre || ""}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{paciente.mail || ""}</td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                <span>{paciente.areaCode || ""}</span>
                <span>{paciente.telefono || ""}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                <button
                  onClick={() => window.location.href = `/perfil/${paciente.dni}`}
                  className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(paciente)}
                    className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(paciente.dni, paciente.nombre)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  );
};

export default TableDesktop;