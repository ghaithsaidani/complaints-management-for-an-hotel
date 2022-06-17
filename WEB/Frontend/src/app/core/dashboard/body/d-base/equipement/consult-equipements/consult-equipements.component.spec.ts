import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultEquipementsComponent } from './consult-equipements.component';

describe('ConsultEquipementsComponent', () => {
  let component: ConsultEquipementsComponent;
  let fixture: ComponentFixture<ConsultEquipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultEquipementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
