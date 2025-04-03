import React, { useState, useEffect } from 'react';
import { showNotification } from '../../utils/notifications';
import { fetchData } from '../../utils/api';
import SearchInput from '../common/SearchInput';

const UsersTable = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rolFilter, setRolFilter] = useState('');

  useEffect(() => {
    cargarEmpleados();
  }, []);

  useEffect(() => {
    filtrarEmpleados();
  }, [searchTerm, rolFilter, empleados]);

  const cargarEmpleados = async () => {
    try {
      const dataMedicos = await fetchData('/medico');
      const medicos = dataMedicos.medicos.map(medico => ({
        ...medico,
        rol: 'Odontólogo'
      }));

      const dataSecretarias = await fetchData('/secretaria/getAll');
      const secretarias = dataSecretarias.secretarias.map(secretaria => ({
        ...secretaria,
        rol: 'Secretaria',
        especialidad: '-'
      }));

      const empleadosOrdenados = [...medicos, ...secretarias].sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
      );

      setEmpleados(empleadosOrdenados);
      setEmpleadosFiltrados(empleadosOrdenados);
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al cargar los empleados', 'error');
    }
  };

  const filtrarEmpleados = () => {
    const filtered = empleados.filter(empleado => {
      const cumpleBusqueda = !searchTerm || 
        empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        empleado.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const cumpleRol = !rolFilter || empleado.rol === rolFilter;

      return cumpleBusqueda && cumpleRol;
    });

    setEmpleadosFiltrados(filtered);
  };

  const getRolClass = (rol) => {
    return rol === 'Odontólogo' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  return (
    <div>
      {/* Filtros y Búsqueda */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 max-w-lg">
        <SearchInput
          label="Buscar"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="space-y-2">
          <label htmlFor="rolFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Filtrar por Rol
          </label>
          <select
            id="rolFilter"
            value={rolFilter}
            onChange={(e) => setRolFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Todos</option>
            <option value="Odontólogo">Odontólogos</option>
            <option value="Secretaria">Secretarias</option>
          </select>
        </div>
      </div>

      {/* Tabla Desktop */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Nombre
              </th>
              <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Email
              </th>
              <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Celular
              </th>
              <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Rol
              </th>
              <th scope="col" className="w-1/5 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                Especialidad
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {empleadosFiltrados.map((empleado, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {empleado.nombre || ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {empleado.email || ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {empleado.celular || ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRolClass(empleado.rol)}`}>
                    {empleado.rol}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  {empleado.especialidad || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Mobile */}
      <div className="md:hidden space-y-4">
        {empleadosFiltrados.map((empleado, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  {empleado.nombre || ''}
                </div>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRolClass(empleado.rol)}`}>
                  {empleado.rol}
                </span>
              </div>
              {empleado.especialidad && empleado.especialidad !== '-' && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {empleado.especialidad}
                </div>
              )}
            </div>
            
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Email:</span>
              <p className="mt-1 text-gray-900 dark:text-white">{empleado.email || ''}</p>
            </div>
            
            <div className="text-sm">
              <span className="text-gray-500 dark:text-gray-400">Celular:</span>
              <p className="mt-1 text-gray-900 dark:text-white">{empleado.celular || ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;