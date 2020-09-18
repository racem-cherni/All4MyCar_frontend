import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeclientComponent } from './homeclient.component';

describe('HomeclientComponent', () => {
  let component: HomeclientComponent;
  let fixture: ComponentFixture<HomeclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
