import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAccountsComponent } from './consult-accounts.component';

describe('ConsultAccountsComponent', () => {
  let component: ConsultAccountsComponent;
  let fixture: ComponentFixture<ConsultAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
