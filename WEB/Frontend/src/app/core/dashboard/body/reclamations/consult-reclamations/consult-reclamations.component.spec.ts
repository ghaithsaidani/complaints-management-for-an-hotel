import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultReclamationsComponent } from './consult-reclamations.component';

describe('ConsultReclamationsComponent', () => {
  let component: ConsultReclamationsComponent;
  let fixture: ComponentFixture<ConsultReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultReclamationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
