import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SecureSessionManager } from './secureAuth';
import { showNotification } from '../utils/notifications';

// Definir la interfaz para el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  login: (userId: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Crear el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Hook personalizado para acceder al contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Componente proveedor
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionManager] = useState<SecureSessionManager>(() => new SecureSessionManager());

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isAuth = await sessionManager.isAuthenticated();
        if (isAuth) {
          const id = await sessionManager.getUserId();
          const role = await sessionManager.getUserRole();
          
          setUserId(id);
          setUserRole(role);
          setIsAuthenticated(true);
        } else {
          // Si no hay sesión válida, limpiamos el estado
          setUserId(null);
          setUserRole(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();

    // Limpiar al desmontar
    return () => {
      sessionManager.destroy();
    };
  }, [sessionManager]);

  // Iniciar sesión
  const login = async (userId: string, role: string): Promise<void> => {
    try {
      await sessionManager.setUserSession(userId, role);
      setUserId(userId);
      setUserRole(role);
      setIsAuthenticated(true);
      showNotification('Inicio de sesión exitoso', 'success');
    } catch (error) {
      console.error('Error durante el login:', error);
      showNotification('Error al iniciar sesión', 'error');
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async (): Promise<void> => {
    try {
      await sessionManager.logout();
      setUserId(null);
      setUserRole(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error durante el logout:', error);
      throw error;
    }
  };

  // Valor del contexto
  const contextValue: AuthContextType = {
    isAuthenticated,
    userId,
    userRole,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;