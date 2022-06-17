import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterIntervenantComponent } from './ajouter-intervenant.component';

describe('AjouterIntervenantComponent', () => {
  let component: AjouterIntervenantComponent;
  let fixture: ComponentFixture<AjouterIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
