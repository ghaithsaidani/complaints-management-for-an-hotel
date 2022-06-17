import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePannesComponent } from './type-pannes.component';

describe('TypePannesComponent', () => {
  let component: TypePannesComponent;
  let fixture: ComponentFixture<TypePannesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePannesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePannesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
