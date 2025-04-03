import React, { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner visible={true} size="lg" />
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
      return null;
    }
    return null;
  }

  // Si hay roles permitidos especificados y el rol del usuario no está en la lista
  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          No tienes los permisos necesarios para acceder a esta página.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // Si está autenticado y tiene los permisos correctos, mostrar el contenido
  return <>{children}</>;
};

export default ProtectedRoute;