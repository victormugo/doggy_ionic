import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SplashPage implements OnInit {
  progress = 0;
  loadingText = 'Cargando...';
  private loadingMessages = [
    'Preparando la aplicación...',
    'Cargando razas de perros...',
    'Configurando la interfaz...',
    '¡Casi listo!'
  ];
  private currentMessageIndex = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startLoadingAnimation();
  }

  private startLoadingAnimation() {
    const duration = 3000; // 3 segundos
    const interval = 50; // Actualizar cada 50ms
    const totalSteps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      this.progress = Math.min((currentStep / totalSteps) * 100, 100);
      
      // Cambiar mensaje de carga cada 25% del progreso
      const messageIndex = Math.floor((currentStep / totalSteps) * this.loadingMessages.length);
      if (messageIndex < this.loadingMessages.length && messageIndex !== this.currentMessageIndex) {
        this.currentMessageIndex = messageIndex;
        this.loadingText = this.loadingMessages[messageIndex];
      }

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        this.loadingText = '¡Listo!';
        
        // Esperar un poco más antes de navegar
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      }
    }, interval);
  }
}
