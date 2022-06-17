import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInterventionsComponent } from './consult-interventions.component';

describe('ConsultInterventionsComponent', () => {
  let component: ConsultInterventionsComponent;
  let fixture: ComponentFixture<ConsultInterventionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultInterventionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
