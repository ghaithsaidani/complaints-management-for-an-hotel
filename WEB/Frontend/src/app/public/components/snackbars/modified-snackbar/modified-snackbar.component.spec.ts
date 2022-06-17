import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedSnackbarComponent } from './modified-snackbar.component';

describe('ModifiedSnackbarComponent', () => {
  let component: ModifiedSnackbarComponent;
  let fixture: ComponentFixture<ModifiedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiedSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
