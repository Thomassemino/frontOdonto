import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { showNotification } from '../../utils/notifications.ts';

const NuevaConsulta = () => {
  const [formData, setFormData] = useState({
    nombrePaciente: '',
    nombreMedico: '',
    diaConsulta: '',
    horaConsulta: '',
    problema: '',
    tratamientos: ['']
  });

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [tratamientosOptions, setTratamientosOptions] = useState([]);

  const BASE_URL = "http://179.43.118.101:3001/api";

  useEffect(() => {
    cargarDatos();
  }, []);

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
      showNotification('Error al cargar datos', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pacienteData = JSON.parse(formData.nombrePaciente);
      
      const citaData = {
        pacienteId: pacienteData.id,
        medicoId: formData.nombreMedico,
        fecha: new Date(`${formData.diaConsulta}T${formData.horaConsulta}`).toISOString(),
        motivo: formData.problema,
        estado: 'pendiente',
        notas: formData.problema,
        monto: 0,
        tratamientos: formData.tratamientos.filter(t => t).map(t => JSON.parse(t))
      };

      const response = await fetch(`${BASE_URL}/citas/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(citaData)
      });

      if (!response.ok) throw new Error('Error al crear la cita');

      showNotification('Cita creada exitosamente');
      window.location.href = '/consultas';
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message, 'error');
    }
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

  const handleTratamientoChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      tratamientos: prev.tratamientos.map((t, i) => i === index ? value : t)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <button 
            onClick={() => window.location.href = '/consultas'}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Volver a citas
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold">Nueva Cita</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="nombrePaciente" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre del Paciente
                  </label>
                  <select
                    id="nombrePaciente"
                    value={formData.nombrePaciente}
                    onChange={(e) => setFormData(prev => ({...prev, nombrePaciente: e.target.value}))}
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Seleccione un paciente</option>
                    {pacientes.map(paciente => (
                      <option 
                        key={paciente.id} 
                        value={JSON.stringify({
                          id: paciente.id,
                          nombre: paciente.nombre,
                          areaCode: paciente.areaCode,
                          telefono: paciente.telefono
                        })}
                      >
                        {`${paciente.nombre} - DNI: ${paciente.dni}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="nombreMedico" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profesional
                  </label>
                  <select
                    id="nombreMedico"
                    value={formData.nombreMedico}
                    onChange={(e) => setFormData(prev => ({...prev, nombreMedico: e.target.value}))}
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Seleccione un profesional</option>
                    {medicos.map(medico => (
                      <option key={medico._id} value={medico._id}>
                        {`${medico.nombre} - ${medico.especialidad}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="diaConsulta" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Día de Cita
                  </label>
                  <input
                    type="date"
                    id="diaConsulta"
                    value={formData.diaConsulta}
                    onChange={(e) => setFormData(prev => ({...prev, diaConsulta: e.target.value}))}
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 appearance-none"
                  />
                </div>

                <div>
                  <label htmlFor="horaConsulta" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hora de Consulta
                  </label>
                  <input
                    type="time"
                    id="horaConsulta"
                    value={formData.horaConsulta}
                    onChange={(e) => setFormData(prev => ({...prev, horaConsulta: e.target.value}))}
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 appearance-none"
                    style={{"-webkit-calendar-picker-indicator": "visible"}}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="problema" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Problema
                </label>
                <textarea
                  id="problema"
                  value={formData.problema}
                  onChange={(e) => setFormData(prev => ({...prev, problema: e.target.value}))}
                  rows="3"
                  required
                  placeholder="Describa el problema"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tratamientos
                </label>
                <div id="tratamientosContainer" className="space-y-2">
                  {formData.tratamientos.map((tratamiento, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={tratamiento}
                        onChange={(e) => handleTratamientoChange(index, e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Seleccione un tratamiento</option>
                        {tratamientosOptions.map(t => (
                          <option key={t._id} value={JSON.stringify(t)}>
                            {t.nombre}
                          </option>
                        ))}
                      </select>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeTratamiento(index)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          -
                        </button>
                      )}
                      {index === formData.tratamientos.length - 1 && (
                        <button
                          type="button"
                          onClick={addTratamiento}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  if (confirm('¿Está seguro que desea cancelar? Se perderán los datos ingresados.')) {
                    window.location.href = '/consultas';
                  }
                }}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Crear Consulta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevaConsulta;