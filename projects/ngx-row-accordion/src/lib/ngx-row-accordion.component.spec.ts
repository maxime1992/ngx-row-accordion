import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxRowAccordionComponent } from './ngx-row-accordion.component';
import { NgxRowAccordionService } from './ngx-row-accordion.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-host',
  template: `
    <ngx-row-accordion title="Super title" [group]="group"></ngx-row-accordion>
  `,
})
export class HostComponent {
  group: string;
}

describe('NgxRowAccordionComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoopAnimationsModule],
      declarations: [HostComponent, NgxRowAccordionComponent],
      providers: [NgxRowAccordionService],
    }).compileComponents();
  }));

  it('should create if a group is passed', () => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    component.group = 'test-group';
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should not create if a group is not passed', () => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

    expect(() => fixture.detectChanges()).toThrowError(
      '[ngx-row-accordion] you should always pass a group when creating a row-accordion'
    );
  });
});
