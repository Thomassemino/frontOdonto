import React, { useState } from 'react';
import { handleLogin } from '../../services/authService';
import { validateForm } from '../../utils/formValidation';
import { showNotification } from '../../utils/notifications';
import { useAuth } from '../../auth/AuthContext';
import AuthCard from './AuthCard';
import AuthLinks from './AuthLinks';
import LoadingSpinner from '../common/LoadingSpinner';
import DynamicFields from './DynamicFields';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validation = validateForm(formData);
    if (!validation.isValid) {
      showNotification(validation.errors.join('\n'), 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await handleLogin({
        email: formData.email,
        password: formData.password
      });

      if (response.success && response.userId) {
        // Usar login del AuthContext en vez de localStorage
        await login(response.userId, response.rol);
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        throw new Error(response.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      setError(error.message);
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loginFields = [
    {
      type: 'email',
      name: 'email',
      label: 'Correo electrónico',
      placeholder: 'nombre@company.com',
      required: true
    },
    {
      type: 'password',
      name: 'password',
      label: 'Contraseña',
      placeholder: '••••••••',
      required: true
    }
  ];

  const authLinks = [
    {
      text: "¿Aún no tienes una cuenta?",
      linkText: "Regístrate",
      href: "/auth/logup"
    },
    {
      text: "¿Olvidaste tu contraseña?",
      linkText: "Recuperar contraseña",
      href: "/auth/recuperar-contra"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 mx-auto dark:bg-gray-900">
      <AuthCard title="Iniciar sesión">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <DynamicFields
            id="loginFields"
            fields={loginFields}
            values={formData}
            onChange={handleChange}
          />

          {error && (
            <div className="flex items-start">
              <p className="text-sm text-red-500 dark:text-red-500" role="alert">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex justify-center items-center">
              <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}</span>
              {isLoading && <LoadingSpinner size="sm" visible={true} className="ml-2" />}
            </div>
          </button>

          <AuthLinks links={authLinks} />
        </form>
      </AuthCard>
    </div>
  );
};

export default LoginForm;