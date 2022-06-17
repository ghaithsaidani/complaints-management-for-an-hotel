import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DBaseComponent } from './d-base.component';

describe('DBaseComponent', () => {
  let component: DBaseComponent;
  let fixture: ComponentFixture<DBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
