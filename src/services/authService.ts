import { fetchData } from '../utils/api';

interface BaseUserData {
  email: string;
  password: string;
  rol: string;
}

interface MedicoData extends BaseUserData {
  nombre: string;
  especialidad: string;
  celular: string;
  nMatricula: string;
}

interface SecretariaData extends BaseUserData {
  nombre: string;
  celular: string;
}

export const handleRegistration = async (formData: FormData): Promise<void> => {
  try {
    // 1. Extract common data
    const email = formData.get('email')?.toString().toLowerCase();
    const password = formData.get('password')?.toString();
    const rol = formData.get('rol')?.toString();

    if (!email || !password || !rol) {
      throw new Error('Faltan datos requeridos');
    }

    // 2. Create base user
    const userData: BaseUserData = {
      email,
      password,
      rol
    };

    const userResponse = await fetchData('/login/registro', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    if (!userResponse.success) {
      throw new Error(userResponse.message || 'Error al crear usuario');
    }

    // 3. Create role-specific profile
    if (rol === 'secretaria') {
      const secretariaData: SecretariaData = {
        ...userData,
        nombre: formData.get('nombreSecretaria')?.toString().toLowerCase() || '',
        celular: formData.get('celularSecretaria')?.toString().replace(/\D/g, '') || '',
      };

      const secretariaResponse = await fetchData('/secretaria/create', {
        method: 'POST',
        body: JSON.stringify({
          nombre: secretariaData.nombre,
          email: secretariaData.email,
          celular: secretariaData.celular
        })
      });

      if (!secretariaResponse.success) {
        // Rollback user creation if profile creation fails
        await handleRollback(email);
        throw new Error(secretariaResponse.message || 'Error al crear perfil de secretaria');
      }
    } 
    else if (rol === 'odontologo') {
      const medicoData: MedicoData = {
        ...userData,
        nombre: formData.get('nombreMedico')?.toString().toLowerCase() || '',
        especialidad: formData.get('especialidad')?.toString() || '',
        celular: formData.get('celularMedico')?.toString().replace(/\D/g, '') || '',
        nMatricula: formData.get('nMatricula')?.toString() || '',
      };

      const medicoResponse = await fetchData('/medico/create', {
        method: 'POST',
        body: JSON.stringify({
          nombre: medicoData.nombre,
          email: medicoData.email,
          especialidad: medicoData.especialidad,
          celular: medicoData.celular,
          nMatricula: medicoData.nMatricula,
          clave: medicoData.password
        })
      });

      if (!medicoResponse.success) {
        // Rollback user creation if profile creation fails
        await handleRollback(email);
        throw new Error(medicoResponse.message || 'Error al crear perfil de médico');
      }
    }
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

const handleRollback = async (email: string): Promise<void> => {
  try {
    await fetchData('/login/eliminar-usuario', {
      method: 'DELETE',
      body: JSON.stringify({ email })
    });
  } catch (error) {
    console.error('Error en rollback:', error);
    // Even if rollback fails, we still want to throw the original error
  }
};

export const handleLogin = async (credentials: { email: string; password: string }) => {
  try {
    // 1. Login request
    const loginResponse = await fetchData('/login/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    if (!loginResponse.success) {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }

    // 2. Get user details based on role
    if (loginResponse.success) {
      let userResponse;
      
      if (loginResponse.rol === 'odontologo') {
        userResponse = await fetchData(`/medico/findByEmail/${credentials.email}`);
        
        if (userResponse.medico) {
          return {
            success: true,
            message: loginResponse.message,
            rol: loginResponse.rol,
            userId: userResponse.medico._id
          };
        }
      } 
      else if (loginResponse.rol === 'secretaria') {
        userResponse = await fetchData(`/secretaria/buscar/${credentials.email}`);
        
        if (userResponse.secretaria) {
          return {
            success: true,
            message: loginResponse.message,
            rol: loginResponse.rol,
            userId: userResponse.secretaria._id
          };
        }
      }

      return {
        success: false,
        message: `No se encontró el perfil de ${loginResponse.rol}`,
        userId: ''
      };
    }

    return {
      success: false,
      message: 'No se pudo verificar la identidad del usuario',
      userId: ''
    };
  } catch (error) {
    console.error('Error en handleLogin:', error);
    throw error;
  }
};

export const handlePasswordRecovery = async (email: string) => {
  try {
    const response = await fetchData('/login/recuperar-contrasena', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    if (!response.success) {
      throw new Error('Error al procesar la solicitud de recuperación');
    }

    return {
      success: true,
      message: 'Se han enviado las instrucciones a tu correo electrónico'
    };
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    throw error;
  }
};