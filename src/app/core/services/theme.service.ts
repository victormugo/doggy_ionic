import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'doggy-theme';
  private readonly THEME_ATTRIBUTE = 'data-theme';
  
  private currentThemeSubject = new BehaviorSubject<ThemeMode>('system');
  public currentTheme$ = this.currentThemeSubject.asObservable();
  
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor() {
    this.initializeTheme();
  }

  /**
   * Inicializa el tema desde localStorage o usa el tema del sistema
   */
  private initializeTheme(): void {
    const savedTheme = this.getStoredTheme();
    this.setTheme(savedTheme);
  }

  /**
   * Obtiene el tema guardado en localStorage
   */
  private getStoredTheme(): ThemeMode {
    const stored = localStorage.getItem(this.THEME_KEY);
    return (stored as ThemeMode) || 'system';
  }

  /**
   * Guarda el tema en localStorage
   */
  private saveTheme(theme: ThemeMode): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  /**
   * Detecta si el sistema está en modo oscuro
   */
  private isSystemDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Aplica el tema al documento
   */
  private applyTheme(theme: ThemeMode): void {
    let isDark = false;
    
    switch (theme) {
      case 'light':
        isDark = false;
        break;
      case 'dark':
        isDark = true;
        break;
      case 'system':
        isDark = this.isSystemDarkMode();
        break;
    }

    // Aplicar el tema al documento
    document.documentElement.setAttribute(this.THEME_ATTRIBUTE, isDark ? 'dark' : 'light');
    
    // Actualizar el estado
    this.isDarkModeSubject.next(isDark);
    this.currentThemeSubject.next(theme);
  }

  /**
   * Establece el tema
   */
  public setTheme(theme: ThemeMode): void {
    this.saveTheme(theme);
    this.applyTheme(theme);
  }

  /**
   * Obtiene el tema actual
   */
  public getCurrentTheme(): ThemeMode {
    return this.currentThemeSubject.value;
  }

  /**
   * Verifica si está en modo oscuro
   */
  public isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  public toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    
    if (currentTheme === 'system') {
      // Si está en sistema, cambiar a modo opuesto al actual
      const isDark = this.isDarkMode();
      this.setTheme(isDark ? 'light' : 'dark');
    } else {
      // Si no está en sistema, alternar entre claro y oscuro
      this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
  }

  /**
   * Escucha cambios en las preferencias del sistema
   */
  public watchSystemTheme(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (this.getCurrentTheme() === 'system') {
        this.applyTheme('system');
      }
    });
  }

  /**
   * Obtiene el texto descriptivo del tema
   */
  public getThemeDescription(theme: ThemeMode): string {
    switch (theme) {
      case 'light':
        return 'Modo claro';
      case 'dark':
        return 'Modo oscuro';
      case 'system':
        return 'Seguir sistema';
      default:
        return 'Seguir sistema';
    }
  }

  /**
   * Obtiene el icono del tema
   */
  public getThemeIcon(theme: ThemeMode): string {
    switch (theme) {
      case 'light':
        return 'sunny';
      case 'dark':
        return 'moon';
      case 'system':
        return 'phone-portrait';
      default:
        return 'phone-portrait';
    }
  }
}
