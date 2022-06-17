import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtComponent } from './add-ot.component';

describe('AddOtComponent', () => {
  let component: AddOtComponent;
  let fixture: ComponentFixture<AddOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
