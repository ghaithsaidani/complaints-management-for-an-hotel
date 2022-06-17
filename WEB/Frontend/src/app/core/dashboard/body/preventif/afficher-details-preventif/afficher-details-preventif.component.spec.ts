import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDetailsPreventifComponent } from './afficher-details-preventif.component';

describe('AfficherDetailsPreventifComponent', () => {
  let component: AfficherDetailsPreventifComponent;
  let fixture: ComponentFixture<AfficherDetailsPreventifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherDetailsPreventifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDetailsPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
