import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultLocauxComponent } from './consult-locaux.component';

describe('ConsultLocauxComponent', () => {
  let component: ConsultLocauxComponent;
  let fixture: ComponentFixture<ConsultLocauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultLocauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultLocauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
