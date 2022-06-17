import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOtsComponent } from './consult-ots.component';

describe('ConsultOtsComponent', () => {
  let component: ConsultOtsComponent;
  let fixture: ComponentFixture<ConsultOtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultOtsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
