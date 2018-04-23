import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrDetailsComponent } from './emr-details.component';

describe('EmrDetailsComponent', () => {
  let component: EmrDetailsComponent;
  let fixture: ComponentFixture<EmrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
