import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRowAccordionComponent } from './ngx-row-accordion.component';

describe('NgxRowAccordionComponent', () => {
  let component: NgxRowAccordionComponent;
  let fixture: ComponentFixture<NgxRowAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxRowAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRowAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
