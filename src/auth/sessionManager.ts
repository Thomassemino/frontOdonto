// SessionManager.ts
import { clearUserData } from './middleware';

class SessionManager {
  private readonly INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos de inactividad por defecto
  private inactivityTimeoutId: number | null = null;

  constructor(private timeout: number = 30 * 60 * 1000) {
    this.timeout = timeout;
    this.setupActivityListeners();
    this.startInactivityTimer();
  }

  private setupActivityListeners(): void {
    // Lista de eventos a escuchar para detectar actividad
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  private startInactivityTimer(): void {
    // Iniciar el temporizador de inactividad
    this.inactivityTimeoutId = window.setTimeout(() => {
      this.logout();
    }, this.timeout);
  }

  private resetInactivityTimer(): void {
    // Limpiar el temporizador existente
    if (this.inactivityTimeoutId) {
      window.clearTimeout(this.inactivityTimeoutId);
    }

    // Reiniciar el temporizador de inactividad
    this.startInactivityTimer();
  }

  private logout(): void {
    clearUserData();
    window.location.href = '/login';
  }

  // Método público para destruir la instancia
  public destroy(): void {
    if (this.inactivityTimeoutId) {
      window.clearTimeout(this.inactivityTimeoutId);
    }

    // Remover event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.removeEventListener(event, () => this.resetInactivityTimer());
    });
  }
}

export default SessionManager;