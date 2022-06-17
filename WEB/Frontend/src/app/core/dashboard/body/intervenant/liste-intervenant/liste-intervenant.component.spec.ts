import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeIntervenantComponent } from './liste-intervenant.component';

describe('ListeIntervenantComponent', () => {
  let component: ListeIntervenantComponent;
  let fixture: ComponentFixture<ListeIntervenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeIntervenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
