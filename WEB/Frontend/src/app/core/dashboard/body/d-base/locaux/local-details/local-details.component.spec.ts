import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalDetailsComponent } from './local-details.component';

describe('LocalDetailsComponent', () => {
  let component: LocalDetailsComponent;
  let fixture: ComponentFixture<LocalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
