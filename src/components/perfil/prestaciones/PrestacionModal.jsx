import React, { useState, useEffect } from 'react';

const PrestacionModal = ({ show, onClose, onSubmit, tratamientos }) => {
  const [formData, setFormData] = useState({
    tratamiento: '',
    precio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      setFormData({
        tratamiento: '',
        precio: ''
      });
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-20"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6 dark:bg-gray-800 mx-auto">
        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="sr-only">Cerrar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nueva Prestación</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Tratamiento
            </label>
            <select
              value={formData.tratamiento}
              onChange={(e) => {
                const selectedTratamiento = tratamientos.find(t => t._id === e.target.value);
                setFormData(prev => ({
                  ...prev,
                  tratamiento: e.target.value,
                  precio: selectedTratamiento?.precio || ''
                }));
              }}
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Seleccione un tratamiento</option>
              {tratamientos.map((tratamiento) => (
                <option key={tratamiento._id} value={tratamiento._id}>
                  {tratamiento.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Precio
            </label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) => setFormData(prev => ({ ...prev, precio: e.target.value }))}
              required
              min="0"
              step="0.01"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrestacionModal;