import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrListComponent } from './emr-list.component';

describe('EmrListComponent', () => {
  let component: EmrListComponent;
  let fixture: ComponentFixture<EmrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
