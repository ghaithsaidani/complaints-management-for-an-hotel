import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultPannesComponent } from './consult-pannes.component';

describe('ConsultPannesComponent', () => {
  let component: ConsultPannesComponent;
  let fixture: ComponentFixture<ConsultPannesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultPannesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultPannesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
