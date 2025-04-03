import React, { useState, useEffect } from 'react';
import AtencionModal from './AtencionModal';
import EditarAtencionModal from './EditarAtencionModal';
import TablaAtenciones from './TablaAtenciones';
import TarjetasAtenciones from './TarjetasAtenciones';
import { showNotification } from '../../../utils/notifications';

const BASE_URL = "http://179.43.118.101:3001/api";

const Atenciones = ({ dni }) => {
  const [atenciones, setAtenciones] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacienteId, setPacienteId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [atencionSeleccionada, setAtencionSeleccionada] = useState(null);

  useEffect(() => {
    cargarDatosIniciales();
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [dni]);

  const handleOffline = () => showNotification('Se perdió la conexión a internet', 'error');
  const handleOnline = () => {
    showNotification('Se restableció la conexión', 'success');
    cargarDatosIniciales();
  };

  const cargarDatosIniciales = async () => {
    try {
      // Cargar datos del paciente
      const pacienteResponse = await fetch(`${BASE_URL}/paciente/findByDni/${dni}`);
      if (!pacienteResponse.ok) throw new Error('Error al cargar datos del paciente');
      
      const { paciente } = await pacienteResponse.json();
      if (!paciente || !paciente.dni) throw new Error('No se encontraron datos válidos del paciente');

      const id = paciente._id || paciente.id;
      setPacienteId(id);

      // Cargar lista de médicos
      const medicosResponse = await fetch(`${BASE_URL}/medico`);
      if (!medicosResponse.ok) throw new Error('Error al cargar lista de médicos');
      
      const { medicos: medicosList } = await medicosResponse.json();
      setMedicos(medicosList);

      // Cargar atenciones
      await cargarAtenciones(id);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
  };

  const cargarAtenciones = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/atenciones/todas/${id}`);
      if (!response.ok) throw new Error('Error al cargar atenciones');
      
      const data = await response.json();
      setAtenciones(data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
  };

  const handleCrearAtencion = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/atenciones/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, paciente: pacienteId })
      });

      if (!response.ok) throw new Error('Error al crear la atención');

      showNotification('Atención creada exitosamente');
      setShowModal(false);
      await cargarAtenciones(pacienteId);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
  };

  const handleEditarAtencion = async (formData, fechaOriginal) => {
    try {
      const response = await fetch(
        `${BASE_URL}/atenciones/edit-atencion/${pacienteId}/fecha/${fechaOriginal}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) throw new Error('Error al actualizar la atención');

      showNotification('Atención actualizada exitosamente');
      setShowEditModal(false);
      await cargarAtenciones(pacienteId);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
  };

  const handleEliminarAtencion = async (fecha) => {
    if (!confirm('¿Está seguro de eliminar esta atención?')) return;
    
    try {
      const response = await fetch(
        `${BASE_URL}/atenciones/delete-atencion/${pacienteId}/fecha/${fecha}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Error al eliminar la atención');
      
      showNotification('Atención eliminada exitosamente');
      await cargarAtenciones(pacienteId);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
  };

  const handleEditClick = async (fecha) => {
    try {
      const response = await fetch(`${BASE_URL}/atenciones/unica/${pacienteId}/fecha/${fecha}`);
      if (!response.ok) throw new Error('Error al cargar la atención');
      
      const atencion = await response.json();
      setAtencionSeleccionada(atencion);
      setShowEditModal(true);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con título y botón */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 sm:text-xl">
          Atenciones
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Nueva Atención
        </button>
      </div>

      {/* Vista Desktop */}
      <TablaAtenciones
        atenciones={atenciones}
        onEdit={handleEditClick}
        onDelete={handleEliminarAtencion}
      />

      {/* Vista Mobile */}
      <TarjetasAtenciones
        atenciones={atenciones}
        onEdit={handleEditClick}
        onDelete={handleEliminarAtencion}
      />

      {/* Modales */}
      <AtencionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCrearAtencion}
        medicos={medicos}
      />

      <EditarAtencionModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditarAtencion}
        atencion={atencionSeleccionada}
        medicos={medicos}
      />
    </div>
  );
};

export default Atenciones;