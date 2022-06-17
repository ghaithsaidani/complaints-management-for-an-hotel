import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanneComponent } from './add-panne.component';

describe('AddPanneComponent', () => {
  let component: AddPanneComponent;
  let fixture: ComponentFixture<AddPanneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPanneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
