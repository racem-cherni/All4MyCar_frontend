import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutadminComponent } from './layoutadmin.component';

describe('LayoutadminComponent', () => {
  let component: LayoutadminComponent;
  let fixture: ComponentFixture<LayoutadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
