// auth/secureAuth.ts
import { jwtVerify, SignJWT } from 'jose';

interface UserSession {
  userId: string;
  role: string;
  timestamp: number;
}

export class SecureSessionManager {
  private readonly SECRET_KEY = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);
  private readonly SESSION_KEY = 'secure_session';
  private readonly MAX_SESSION_AGE = 30 * 60 * 1000;
  private inactivityTimer: number | null = null;
  private readonly events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

  constructor(private readonly customTimeout?: number) {
    this.setupActivityListeners();
    this.startInactivityTimer();
  }

  private async createToken(userId: string, role: string): Promise<string> {
    const jwt = await new SignJWT({ userId, role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30m')
      .setIssuedAt()
      .sign(this.SECRET_KEY);
    
    return jwt;
  }

  private async verifyToken(token: string): Promise<boolean> {
    try {
      await jwtVerify(token, this.SECRET_KEY);
      return true;
    } catch {
      return false;
    }
  }

  private async encrypt(data: string): Promise<string> {
    const key = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(import.meta.env.ENCRYPTION_KEY),
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(data);

    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  private async decrypt(encryptedData: string): Promise<string> {
    const key = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(import.meta.env.ENCRYPTION_KEY),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    const combined = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );

    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  }

  private async saveSession(session: UserSession): Promise<void> {
    const encryptedSession = await this.encrypt(JSON.stringify(session));
    sessionStorage.setItem(this.SESSION_KEY, encryptedSession);
  }

  private async getSession(): Promise<UserSession | null> {
    const encryptedSession = sessionStorage.getItem(this.SESSION_KEY);
    if (!encryptedSession) return null;

    try {
      const decryptedSession = await this.decrypt(encryptedSession);
      return JSON.parse(decryptedSession);
    } catch {
      return null;
    }
  }

  public async setUserSession(userId: string, role: string): Promise<void> {
    const token = await this.createToken(userId, role);
    const session: UserSession = {
      userId,
      role,
      timestamp: Date.now()
    };

    await this.saveSession(session);
    document.cookie = `auth_token=${token}; Secure; SameSite=Strict; HttpOnly; Path=/`;
  }

  public async getUserId(): Promise<string | null> {
    const session = await this.getSession();
    return session?.userId || null;
  }

  public async getUserRole(): Promise<string | null> {
    const session = await this.getSession();
    return session?.role || null;
  }

  public async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    if (!session) return false;

    if (Date.now() - session.timestamp > this.MAX_SESSION_AGE) {
      await this.logout();
      return false;
    }

    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (!token || !(await this.verifyToken(token))) {
      await this.logout();
      return false;
    }

    return true;
  }

  private setupActivityListeners(): void {
    this.events.forEach(event => {
      window.addEventListener(event, () => this.resetInactivityTimer());
    });
  }

  private startInactivityTimer(): void {
    const timeout = this.customTimeout || this.MAX_SESSION_AGE;
    this.inactivityTimer = window.setTimeout(() => this.logout(), timeout);
  }

  private resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      window.clearTimeout(this.inactivityTimer);
    }
    this.startInactivityTimer();
  }

  public async logout(): Promise<void> {
    sessionStorage.removeItem(this.SESSION_KEY);
    document.cookie = 'auth_token=; Max-Age=0; Secure; SameSite=Strict; HttpOnly; Path=/';
    window.location.href = '/login';
  }

  public destroy(): void {
    if (this.inactivityTimer) {
      window.clearTimeout(this.inactivityTimer);
    }
    this.events.forEach(event => {
      window.removeEventListener(event, () => this.resetInactivityTimer());
    });
  }
}