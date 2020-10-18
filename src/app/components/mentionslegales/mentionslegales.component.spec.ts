import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionslegalesComponent } from './mentionslegales.component';

describe('MentionslegalesComponent', () => {
  let component: MentionslegalesComponent;
  let fixture: ComponentFixture<MentionslegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentionslegalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionslegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
