import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Breeds } from './breeds.page';

describe('Breeds', () => {
  let component: Breeds;
  let fixture: ComponentFixture<Breeds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Breeds],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Breeds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
