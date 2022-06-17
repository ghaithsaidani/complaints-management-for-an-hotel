import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultRoomsComponent } from './consult-rooms.component';

describe('ConsultRoomsComponent', () => {
  let component: ConsultRoomsComponent;
  let fixture: ComponentFixture<ConsultRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
