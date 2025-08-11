import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Random } from './random.page';

describe('Random', () => {
  let component: Random;
  let fixture: ComponentFixture<Random>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Random],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Random);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
