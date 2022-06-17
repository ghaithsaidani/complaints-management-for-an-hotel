import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDetailsIntervenantComponent } from './afficher-details-intervenant.component';

describe('AfficherDetailsIntervenantComponent', () => {
  let component: AfficherDetailsIntervenantComponent;
  let fixture: ComponentFixture<AfficherDetailsIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherDetailsIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDetailsIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
