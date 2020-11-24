import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FacadeComponent } from './facade.component';

describe('FacadeComponent', () => {
  let component: FacadeComponent;
  let fixture: ComponentFixture<FacadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacadeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
