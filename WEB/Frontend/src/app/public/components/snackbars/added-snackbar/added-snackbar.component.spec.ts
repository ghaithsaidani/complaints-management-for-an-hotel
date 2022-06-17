import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedSnackbarComponent } from './added-snackbar.component';

describe('AddedSnackbarComponent', () => {
  let component: AddedSnackbarComponent;
  let fixture: ComponentFixture<AddedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
