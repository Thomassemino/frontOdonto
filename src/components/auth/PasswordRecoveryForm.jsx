import React, { useState } from 'react';
import { validateEmail } from '../../utils/validations';
import { showNotification } from '../../utils/notifications';
import { fetchData } from '../../utils/api';
import AuthCard from './AuthCard';
import InputField from '../common/InputField';
import LoadingSpinner from '../common/LoadingSpinner';

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Resetear mensajes
    setError('');
    setSuccess('');

    // Validar email
    if (!validateEmail(email)) {
      showNotification('Por favor, introduce un correo electrónico válido.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchData('/login/recuperar-contrasena', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      setSuccess('Se han enviado las instrucciones a tu correo electrónico.');
      showNotification('Se han enviado las instrucciones a tu correo electrónico.', 'success');
      setEmail('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al conectar con el servidor';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 mx-auto dark:bg-gray-900">
      <AuthCard title="Recuperar Contraseña">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <InputField
            type="email"
            name="email"
            id="email"
            label="Correo electrónico"
            placeholder="nombre@company.com"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="Por favor, introduce un correo electrónico válido."
          />

          {error && (
            <div className="flex items-start">
              <p className="text-sm text-red-500 dark:text-red-500" role="alert">
                {error}
              </p>
            </div>
          )}

          {success && (
            <div className="flex items-start">
              <p className="text-sm text-green-500 dark:text-green-500" role="alert">
                {success}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex justify-center items-center">
              <span>{isLoading ? 'Enviando...' : 'Recuperar Contraseña'}</span>
              {isLoading && <LoadingSpinner size="sm" visible={true} className="ml-2" />}
            </div>
          </button>

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            <a 
              href="/login" 
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Volver al inicio de sesión
            </a>
          </div>
        </form>
      </AuthCard>
    </div>
  );
};

export default PasswordRecoveryForm;