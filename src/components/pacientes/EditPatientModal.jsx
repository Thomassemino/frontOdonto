import React, { useState, useEffect } from 'react';
import { showNotification } from '../../utils/notifications';

const EditPatientModal = ({ patient, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    mail: '',
    areaCode: '+54',
    telefono: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        dni: patient.dni || '',
        mail: patient.mail || '',
        areaCode: patient.areaCode || '+54',
        telefono: patient.telefono || ''
      });
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const patientData = {
        nombre: formData.name,
        dni: formData.dni,
        mail: formData.mail,
        telefono: formData.telefono,
        areaCode: formData.areaCode,
      };

      await onSubmit(patientData);
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto mt-20">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Editar Paciente
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="Ingrese Nombre y Apellido"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                DNI
              </label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) => setFormData(prev => ({ ...prev, dni: e.target.value }))}
                required
                placeholder="Ingrese 8 números"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={formData.mail}
                onChange={(e) => setFormData(prev => ({ ...prev, mail: e.target.value }))}
                placeholder="ejemplo@correo.com"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Teléfono
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.areaCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, areaCode: e.target.value }))}
                  className="w-24 rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="+54">+54</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  type="text"
                  value={formData.telefono}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                  required
                  placeholder="Número de teléfono"
                  className="flex-1 rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;