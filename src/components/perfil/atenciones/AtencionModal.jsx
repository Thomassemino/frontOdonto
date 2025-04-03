import React, { useState, useEffect } from 'react';

const AtencionModal = ({ show, onClose, onSubmit, medicos }) => {
  const [formData, setFormData] = useState({
    profesional: '',
    fecha: '',
    notaDelDia: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      setFormData({
        profesional: '',
        fecha: '',
        notaDelDia: ''
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
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nueva Atención</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selector de profesional */}
          <div>
            <label htmlFor="profesional" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Profesional
            </label>
            <select
              id="profesional"
              value={formData.profesional}
              onChange={(e) => setFormData(prev => ({ ...prev, profesional: e.target.value }))}
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="">Seleccione un profesional</option>
              {medicos.map((medico) => (
                <option key={medico._id} value={medico.nombre}>
                  {medico.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de fecha */}
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              id="fecha"
              value={formData.fecha}
              onChange={(e) => setFormData(prev => ({ ...prev, fecha: e.target.value }))}
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          {/* Campo de notas */}
          <div>
            <label htmlFor="notaDelDia" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Notas
            </label>
            <textarea
              id="notaDelDia"
              value={formData.notaDelDia}
              onChange={(e) => setFormData(prev => ({ ...prev, notaDelDia: e.target.value }))}
              required
              rows="4"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>

          {/* Botones del modal responsive */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AtencionModal;