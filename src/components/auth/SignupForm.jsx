import React, { useState, useEffect } from 'react';
import { handleRegistration } from '../../services/authService';
import { validateRegistrationForm } from '../../utils/formValidation';
import { showNotification } from '../../utils/notifications';
import AuthCard from './AuthCard';
import AuthLinks from './AuthLinks';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import DynamicFields from './DynamicFields';
import LoadingSpinner from '../common/LoadingSpinner';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rol: '',
    nombreMedico: '',
    especialidad: '',
    celularMedico: '',
    nMatricula: '',
    nombreSecretaria: '',
    celularSecretaria: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const rolOptions = [
    { value: "", label: "Selecciona un rol" },
    { value: "odontologo", label: "Médico/a" },
    { value: "secretaria", label: "Secretario/a" }
  ];

  const medicoFields = [
    {
      type: "text",
      name: "nombreMedico",
      label: "Nombre completo",
      placeholder: "Ingrese nombre completo",
      required: true
    },
    {
      type: "text",
      name: "especialidad",
      label: "Especialidad",
      placeholder: "Ingrese especialidad",
      required: true
    },
    {
      type: "tel",
      name: "celularMedico",
      label: "Celular",
      placeholder: "Ingrese número de celular",
      required: true
    },
    {
      type: "text",
      name: "nMatricula",
      label: "Número de Matrícula",
      placeholder: "Ingrese número de matrícula",
      required: true
    }
  ];

  const secretariaFields = [
    {
      type: "text",
      name: "nombreSecretaria",
      label: "Nombre completo",
      placeholder: "Ingrese nombre completo",
      required: true
    },
    {
      type: "tel",
      name: "celularSecretaria",
      label: "Celular",
      placeholder: "Ingrese número de celular",
      required: true
    }
  ];

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Si es el selector de rol, limpiar los campos del otro rol
    if (name === 'rol') {
      if (value === 'odontologo') {
        setFormData(prev => ({
          ...prev,
          rol: value,
          nombreSecretaria: '',
          celularSecretaria: ''
        }));
      } else if (value === 'secretaria') {
        setFormData(prev => ({
          ...prev,
          rol: value,
          nombreMedico: '',
          especialidad: '',
          celularMedico: '',
          nMatricula: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const form = document.createElement('form');
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    const validation = validateRegistrationForm(form);
    setIsValid(validation.isValid);
    return validation;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      showNotification(validation.errors.join('\n'), 'error');
      return;
    }

    setIsLoading(true);
    try {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      await handleRegistration(formDataObj);
      showNotification('Cuenta creada exitosamente');
      window.location.href = '/login';
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 mx-auto dark:bg-gray-900">
      <AuthCard title="Registro de Usuario">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="email"
            name="email"
            id="email"
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            required={true}
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            type="password"
            name="password"
            id="password"
            label="Contraseña"
            placeholder="••••••••"
            required={true}
            value={formData.password}
            onChange={handleChange}
          />

          <SelectField
            name="rol"
            id="rol"
            label="Rol"
            options={rolOptions}
            required={true}
            value={formData.rol}
            onChange={handleChange}
          />

          {/* Campos dinámicos para Médico */}
          <DynamicFields
            id="camposMedico"
            fields={medicoFields}
            hidden={formData.rol !== 'odontologo'}
            values={formData}
            onChange={handleChange}
          />

          {/* Campos dinámicos para Secretaria */}
          <DynamicFields
            id="camposSecretaria"
            fields={secretariaFields}
            hidden={formData.rol !== 'secretaria'}
            values={formData}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              (!isValid || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex justify-center items-center">
              <span>{isLoading ? 'Creando cuenta...' : 'Crear cuenta'}</span>
              {isLoading && <LoadingSpinner size="sm" visible={true} className="ml-2" />}
            </div>
          </button>

          <AuthLinks
            links={[
              {
                text: "¿Ya tienes una cuenta?",
                linkText: "Inicia sesión",
                href: "/login"
              }
            ]}
          />
        </form>
      </AuthCard>
    </div>
  );
};

export default SignupForm;