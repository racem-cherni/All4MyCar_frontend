import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepresComponent } from './homepres.component';

describe('HomepresComponent', () => {
  let component: HomepresComponent;
  let fixture: ComponentFixture<HomepresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
