import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

export interface CooldownState {
  isActive: boolean;
  remainingTime: number;
  totalTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class CooldownService {
  private cooldowns = new Map<string, BehaviorSubject<CooldownState>>();
  private timers = new Map<string, Subscription>();

  /**
   * Inicia un cooldown para una acción específica
   * @param actionId Identificador único de la acción
   * @param duration Duración del cooldown en milisegundos
   */
  public startCooldown(actionId: string, duration: number): Observable<CooldownState> {
    // Si ya existe un cooldown activo, lo cancelamos
    this.stopCooldown(actionId);

    // Crear el estado inicial
    const initialState: CooldownState = {
      isActive: true,
      remainingTime: duration,
      totalTime: duration
    };

    // Crear el BehaviorSubject para este cooldown
    const cooldownSubject = new BehaviorSubject<CooldownState>(initialState);
    this.cooldowns.set(actionId, cooldownSubject);

    // Crear el timer que actualiza cada segundo
    const timerSubscription = timer(0, 1000).pipe(
      map(secondsElapsed => {
        const remainingTime = Math.max(0, duration - (secondsElapsed * 1000));
        const isActive = remainingTime > 0;

        return {
          isActive,
          remainingTime,
          totalTime: duration
        };
      }),
      take(Math.ceil(duration / 1000) + 1)
    ).subscribe(state => {
      cooldownSubject.next(state);
      
      // Si el cooldown ha terminado, limpiar
      if (!state.isActive) {
        this.cleanupCooldown(actionId);
      }
    });

    this.timers.set(actionId, timerSubscription);

    return cooldownSubject.asObservable();
  }

  /**
   * Obtiene el estado actual de un cooldown
   * @param actionId Identificador de la acción
   */
  public getCooldownState(actionId: string): Observable<CooldownState> | null {
    const cooldown = this.cooldowns.get(actionId);
    return cooldown ? cooldown.asObservable() : null;
  }

  /**
   * Verifica si una acción está en cooldown
   * @param actionId Identificador de la acción
   */
  public isOnCooldown(actionId: string): boolean {
    const cooldown = this.cooldowns.get(actionId);
    return cooldown ? cooldown.value.isActive : false;
  }

  /**
   * Obtiene el tiempo restante de un cooldown
   * @param actionId Identificador de la acción
   */
  public getRemainingTime(actionId: string): number {
    const cooldown = this.cooldowns.get(actionId);
    return cooldown ? cooldown.value.remainingTime : 0;
  }

  /**
   * Detiene un cooldown específico
   * @param actionId Identificador de la acción
   */
  public stopCooldown(actionId: string): void {
    const timer = this.timers.get(actionId);
    if (timer) {
      timer.unsubscribe();
      this.timers.delete(actionId);
    }
    this.cleanupCooldown(actionId);
  }

  /**
   * Detiene todos los cooldowns activos
   */
  public stopAllCooldowns(): void {
    this.timers.forEach(timer => timer.unsubscribe());
    this.timers.clear();
    this.cooldowns.clear();
  }

  /**
   * Formatea el tiempo restante en formato MM:SS
   * @param milliseconds Tiempo en milisegundos
   */
  public formatTime(milliseconds: number): string {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Obtiene el porcentaje de progreso del cooldown
   * @param actionId Identificador de la acción
   */
  public getCooldownProgress(actionId: string): number {
    const cooldown = this.cooldowns.get(actionId);
    if (!cooldown) return 0;
    
    const state = cooldown.value;
    if (state.totalTime === 0) return 0;
    
    return ((state.totalTime - state.remainingTime) / state.totalTime) * 100;
  }

  /**
   * Limpia los recursos de un cooldown
   * @param actionId Identificador de la acción
   */
  private cleanupCooldown(actionId: string): void {
    const cooldown = this.cooldowns.get(actionId);
    if (cooldown) {
      cooldown.complete();
      this.cooldowns.delete(actionId);
    }
  }

  /**
   * Verifica si se puede ejecutar una acción (no está en cooldown)
   * @param actionId Identificador de la acción
   */
  public canExecute(actionId: string): boolean {
    return !this.isOnCooldown(actionId);
  }

  /**
   * Ejecuta una acción si no está en cooldown
   * @param actionId Identificador de la acción
   * @param duration Duración del cooldown en milisegundos
   * @param action Función a ejecutar
   */
  public executeWithCooldown<T>(
    actionId: string, 
    duration: number, 
    action: () => T
  ): T | null {
    if (this.canExecute(actionId)) {
      this.startCooldown(actionId, duration);
      return action();
    }
    return null;
  }
}
