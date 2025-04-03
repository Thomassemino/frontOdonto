import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EditModal = ({ cita, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    diaConsulta: '',
    horaConsulta: '',
    nombrePaciente: '',
    nombreMedico: '',
    problema: '',
    tratamientos: []
  });
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [tratamientosOptions, setTratamientosOptions] = useState([]);

  const BASE_URL = "http://179.43.118.101:3001/api";

  useEffect(() => {
    cargarDatos();
    if (cita) {
      const fecha = new Date(cita.fecha);
      setFormData({
        id: cita._id,
        diaConsulta: format(fecha, 'yyyy-MM-dd'),
        horaConsulta: format(fecha, 'HH:mm'),
        nombrePaciente: cita.pacienteId?.id || '',
        nombreMedico: cita.medicoId?._id || '',
        problema: cita.motivo || '',
        tratamientos: cita.tratamientos?.map(t => typeof t === 'string' ? t : t._id) || []
      });
    }
  }, [cita]);

  const cargarDatos = async () => {
    try {
      const [pacientesRes, medicosRes, tratamientosRes] = await Promise.all([
        fetch(`${BASE_URL}/paciente`),
        fetch(`${BASE_URL}/medico`),
        fetch(`${BASE_URL}/tratamientos`)
      ]);

      const pacientesData = await pacientesRes.json();
      const medicosData = await medicosRes.json();
      const tratamientosData = await tratamientosRes.json();

      setPacientes(pacientesData.pacientes);
      setMedicos(medicosData.medicos);
      setTratamientosOptions(tratamientosData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citaData = {
        _id: formData.id,
        fecha: new Date(`${formData.diaConsulta}T${formData.horaConsulta}`).toISOString(),
        pacienteId: formData.nombrePaciente,
        medicoId: formData.nombreMedico,
        motivo: formData.problema,
        tratamientos: formData.tratamientos.map(id => ({ _id: id })),
        estado: cita.estado
      };

      await onSubmit(citaData);
    } catch (error) {
      console.error('Error al actualizar cita:', error);
    }
  };

  const handleTratamientoChange = (index, value) => {
    const newTratamientos = [...formData.tratamientos];
    newTratamientos[index] = value;
    setFormData(prev => ({
      ...prev,
      tratamientos: newTratamientos
    }));
  };

  const addTratamiento = () => {
    setFormData(prev => ({
      ...prev,
      tratamientos: [...prev.tratamientos, '']
    }));
  };

  const removeTratamiento = (index) => {
    setFormData(prev => ({
      ...prev,
      tratamientos: prev.tratamientos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto mt-20">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Editar Cita
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Día
                </label>
                <input
                  type="date"
                  value={formData.diaConsulta}
                  onChange={(e) => setFormData(prev => ({ ...prev, diaConsulta: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hora
                </label>
                <input
                  type="time"
                  value={formData.horaConsulta}
                  onChange={(e) => setFormData(prev => ({ ...prev, horaConsulta: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Paciente
                </label>
                <select
                  value={formData.nombrePaciente}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombrePaciente: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Seleccione un paciente</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.id}>
                      {`${paciente.nombre} - DNI: ${paciente.dni}`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Médico
                </label>
                <select
                  value={formData.nombreMedico}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombreMedico: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Seleccione un médico</option>
                  {medicos.map(medico => (
                    <option key={medico._id} value={medico._id}>
                      {`${medico.nombre} - ${medico.especialidad}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Motivo
              </label>
              <input
                type="text"
                value={formData.problema}
                onChange={(e) => setFormData(prev => ({ ...prev, problema: e.target.value }))}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tratamientos
              </label>
              <div className="mt-1 space-y-2">
                {formData.tratamientos.map((tratamientoId, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <select
                      value={tratamientoId}
                      onChange={(e) => handleTratamientoChange(index, e.target.value)}
                      required
                      className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:text-gray-100 dark:border-gray-600 dark:bg-gray-700"
                    >
                      <option value="">Seleccione un tratamiento</option>
                      {tratamientosOptions.map(tratamiento => (
                        <option key={tratamiento._id} value={tratamiento._id}>
                          {tratamiento.nombre}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeTratamiento(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTratamiento}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Agregar Tratamiento
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;