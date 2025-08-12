import { Component, OnInit } from '@angular/core';
import { IonFooter } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonicModule],
})
export class FooterComponent {

  constructor() { }
}
