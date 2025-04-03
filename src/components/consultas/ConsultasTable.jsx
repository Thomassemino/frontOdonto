import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';
import { format } from 'date-fns';
import { showNotification } from '../../utils/notifications.ts';

const ConsultasTable = () => {
  const [consultas, setConsultas] = useState([]);
  const [consultasFiltradas, setConsultasFiltradas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);

  const BASE_URL = "http://179.43.118.101:3001/api";

  useEffect(() => {
    cargarConsultas();
  }, []);

  useEffect(() => {
    filtrarConsultas();
  }, [searchTerm, estadoFilter, consultas]);

  const cargarConsultas = async () => {
    try {
      const response = await fetch(`${BASE_URL}/citas/todas`);
      if (!response.ok) throw new Error('Error al obtener citas');

      const data = await response.json();
      setConsultas(data);
      setConsultasFiltradas(data);
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al cargar las consultas', 'error');
    }
  };

  const filtrarConsultas = () => {
    const filtered = consultas.filter(consulta => {
      const cumpleBusqueda = !searchTerm || 
        consulta.pacienteId?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consulta.medicoId?.nombre.toLowerCase().includes(searchTerm.toLowerCase());

      const cumpleEstado = !estadoFilter || consulta.estado === estadoFilter;

      return cumpleBusqueda && cumpleEstado;
    });

    setConsultasFiltradas(filtered);
  };

  const eliminarCita = async (id) => {
    if (!confirm('¿Está seguro que desea eliminar esta cita?')) return;

    try {
      const response = await fetch(`${BASE_URL}/citas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) throw new Error('Error al eliminar la cita');

      setConsultas(prev => prev.filter(consulta => consulta._id !== id));
      showNotification('Cita eliminada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al eliminar la cita', 'error');
    }
  };

  const handleEditSubmit = async (citaData) => {
    try {
      const response = await fetch(`${BASE_URL}/citas/${citaData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(citaData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la cita');
      }

      await cargarConsultas();
      setModalOpen(false);
      showNotification('Cita actualizada exitosamente');
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Error al actualizar la cita', 'error');
    }
  };

  const getEstadoClase = (estado) => {
    const clases = {
      pendiente: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      en_proceso: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      completada: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return clases[estado] || '';
  };

  const renderTablaDesktop = () => (
    <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Hora</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Paciente</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Médico</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Motivo</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {consultasFiltradas.map(consulta => (
            <tr key={consulta._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="whitespace-nowrap px-6 py-4">
                {format(new Date(consulta.fecha), 'dd/MM/yyyy')}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {format(new Date(consulta.fecha), 'HH:mm')}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{consulta.pacienteId?.nombre}</td>
              <td className="whitespace-nowrap px-6 py-4">{consulta.medicoId?.nombre}</td>
              <td className="whitespace-nowrap px-6 py-4">{consulta.motivo}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getEstadoClase(consulta.estado)}`}>
                  {consulta.estado}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCita(consulta);
                      setModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => eliminarCita(consulta._id)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

  const renderTarjetasMobile = () => (
    <div className="md:hidden space-y-4">
      {consultasFiltradas.map(consulta => (
        <div key={consulta._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(consulta.fecha), 'dd/MM/yyyy HH:mm')}
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {consulta.pacienteId?.nombre}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {consulta.medicoId?.nombre}
              </div>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getEstadoClase(consulta.estado)}`}>
              {consulta.estado}
            </span>
          </div>
          
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-400">Motivo:</span>
            <p className="mt-1 text-gray-900 dark:text-white">{consulta.motivo}</p>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setSelectedCita(consulta);
                setModalOpen(true);
              }}
              className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Editar
            </button>
            <button
              onClick={() => eliminarCita(consulta._id)}
              className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <button
              onClick={() => window.location.href = '/'}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Volver al inicio
            </button>
            <h1 className="text-2xl font-bold">Consultas Odontológicas</h1>
          </div>
          <button
            onClick={() => window.location.href = '/consultas/nueva'}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Nueva Cita
          </button>
        </div>

        {/* Filtros */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Buscar</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o ID..."
              className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Estado</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)} className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
  
          {/* Tabla y vista móvil */}
          {renderTablaDesktop()}
          {renderTarjetasMobile()}
  
          {/* Modal de edición */}
          {modalOpen && (
            <EditModal
              cita={selectedCita}
              onClose={() => {
                setModalOpen(false);
                setSelectedCita(null);
              }}
              onSubmit={handleEditSubmit}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default ConsultasTable;