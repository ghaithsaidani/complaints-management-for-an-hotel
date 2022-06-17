import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneDetailsComponent } from './panne-details.component';

describe('PanneDetailsComponent', () => {
  let component: PanneDetailsComponent;
  let fixture: ComponentFixture<PanneDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanneDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
