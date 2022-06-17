import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherListPreventifComponent } from './afficher-list-preventif.component';

describe('AfficherListPreventifComponent', () => {
  let component: AfficherListPreventifComponent;
  let fixture: ComponentFixture<AfficherListPreventifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherListPreventifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherListPreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
