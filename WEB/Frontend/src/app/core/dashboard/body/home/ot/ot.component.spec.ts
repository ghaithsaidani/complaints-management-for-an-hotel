import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTComponent } from './ot.component';

describe('OTComponent', () => {
  let component: OTComponent;
  let fixture: ComponentFixture<OTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
