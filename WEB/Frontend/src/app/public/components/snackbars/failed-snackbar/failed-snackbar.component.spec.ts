import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedSnackbarComponent } from './failed-snackbar.component';

describe('FailedSnackbarComponent', () => {
  let component: FailedSnackbarComponent;
  let fixture: ComponentFixture<FailedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
