import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesadminComponent } from './prestatairesadmin.component';

describe('PrestatairesadminComponent', () => {
  let component: PrestatairesadminComponent;
  let fixture: ComponentFixture<PrestatairesadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestatairesadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestatairesadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
