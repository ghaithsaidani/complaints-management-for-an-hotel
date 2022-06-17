import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventifComponent } from './preventif.component';

describe('PreventifComponent', () => {
  let component: PreventifComponent;
  let fixture: ComponentFixture<PreventifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreventifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
