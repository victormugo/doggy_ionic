import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Inicializar el tema
    this.themeService.watchSystemTheme();
    
    // Redirigir a splash al inicio
    this.router.navigate(['/splash']);
  }
}
