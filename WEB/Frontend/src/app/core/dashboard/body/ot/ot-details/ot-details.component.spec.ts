import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtDetailsComponent } from './ot-details.component';

describe('OtDetailsComponent', () => {
  let component: OtDetailsComponent;
  let fixture: ComponentFixture<OtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
