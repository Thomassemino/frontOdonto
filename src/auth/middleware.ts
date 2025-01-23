
// Verificar autenticación
export function isAuthenticated(): boolean {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    console.log('Current user ID:', userId); // Debug
    console.log('Current user role:', userRole); // Debug
    return userId !== null && userId !== undefined && userId !== '' &&
           userRole !== null && userRole !== undefined && userRole !== '';
  }
  
  // Proteger rutas
  export function requireAuth() {
    const currentPath = window.location.pathname;
    const publicPaths = ['/login', '/logup'];
    
    if (publicPaths.includes(currentPath)) {
      return true;
    }
  
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return false;
    }
    return true;
  }
  
  // Obtener ID del usuario
  export function getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  
  // Establecer ID del usuario
  export function setUserId(id: string): void {
    localStorage.setItem('userId', id);
  }
  
  // Obtener rol del usuario
  export function getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  
  // Establecer rol del usuario
  export function setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }
  
  // Limpiar datos del usuario (logout)
  export function clearUserData(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
  