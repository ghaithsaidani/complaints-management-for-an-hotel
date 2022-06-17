import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsComponent } from './reclamations.component';

describe('ReclamationsComponent', () => {
  let component: ReclamationsComponent;
  let fixture: ComponentFixture<ReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
