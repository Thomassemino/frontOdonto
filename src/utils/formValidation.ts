interface ValidationResult {
    isValid: boolean;
    errors: string[];
  }
  
  export const validateRegistrationForm = (form: HTMLFormElement): ValidationResult => {
    const errors: string[] = [];
    let isValid = true;
  
    // Get all enabled required inputs
    const inputs = form.querySelectorAll('input:not([disabled])[required], select[required]');
    
    inputs.forEach(input => {
      const value = (input as HTMLInputElement).value.trim();
      
      if (!value) {
        isValid = false;
        errors.push(`El campo ${input.getAttribute('name')} es requerido`);
        showFieldError(input as HTMLInputElement);
      } else {
        const fieldValidation = validateField(input as HTMLInputElement);
        if (!fieldValidation.isValid) {
          isValid = false;
          errors.push(fieldValidation.error);
        }
      }
    });
  
    return { isValid, errors };
  };
  
  interface FieldValidation {
    isValid: boolean;
    error: string;
  }
  
  export const validateField = (input: HTMLInputElement): FieldValidation => {
    const value = input.value.trim();
    const name = input.name;
  
    // Reset previous validation
    clearFieldError(input);
  
    // Skip validation for disabled fields
    if (input.disabled) {
      return { isValid: true, error: '' };
    }
  
    // Required field validation
    if (input.required && !value) {
      return {
        isValid: false,
        error: `El campo ${name} es requerido`
      };
    }
  
    // Field-specific validations
    switch (input.type) {
      case 'email':
        if (!validateEmail(value)) {
          return {
            isValid: false,
            error: 'El formato del email no es válido'
          };
        }
        break;
  
      case 'password':
        if (value.length < 6) {
          return {
            isValid: false,
            error: 'La contraseña debe tener al menos 6 caracteres'
          };
        }
        break;
  
      case 'tel':
        if (!validatePhone(value)) {
          return {
            isValid: false,
            error: 'El número de teléfono debe tener entre 6 y 14 dígitos'
          };
        }
        break;
  
      case 'text':
        if (name.includes('nombre') && !validateName(value)) {
          return {
            isValid: false,
            error: 'Solo se permiten letras y espacios (3-40 caracteres)'
          };
        }
        break;
    }
  
    return { isValid: true, error: '' };
  };

export const validateForm = (formData: any): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  // Validación del email
  if (!formData.email) {
    errors.push('El email es requerido');
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    errors.push('El formato del email no es válido');
    isValid = false;
  }

  // Validación de la contraseña
  if (!formData.password) {
    errors.push('La contraseña es requerida');
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
    isValid = false;
  }

  return { isValid, errors };
};
  
  function showFieldError(input: HTMLInputElement) {
    input.classList.add('border-red-500', 'focus:border-red-500');
    input.classList.remove('border-gray-300', 'focus:border-blue-500');
  }
  
  function clearFieldError(input: HTMLInputElement) {
    input.classList.remove('border-red-500', 'focus:border-red-500');
    input.classList.add('border-gray-300', 'focus:border-blue-500');
  }
  
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{6,14}$/;
    return phoneRegex.test(phone);
  };
  
  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
    return nameRegex.test(name);
  };