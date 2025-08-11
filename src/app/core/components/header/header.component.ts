import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HeaderComponent {

  @Input() title: string = "";
  @Input() showConfigButton: boolean = false;
  @Input() showCloseButton: boolean = false;

  @Output() actionEmitter: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(

  ) { }

  public openSettings() {
    this.actionEmitter.emit({ action: 'settings'});
  }

  public close() {
    this.actionEmitter.emit({ action: 'close'});
  }

}
