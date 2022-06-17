import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementdetailsComponent } from './equipementdetails.component';

describe('EquipementdetailsComponent', () => {
  let component: EquipementdetailsComponent;
  let fixture: ComponentFixture<EquipementdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
