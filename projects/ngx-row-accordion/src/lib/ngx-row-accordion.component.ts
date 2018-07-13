import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { NgxRowAccordionService } from './ngx-row-accordion.service';

@Component({
  selector: 'ngx-row-accordion',
  templateUrl: './ngx-row-accordion.component.html',
  styleUrls: ['./ngx-row-accordion.component.scss'],
})
export class NgxRowAccordionComponent implements OnInit, OnDestroy {
  @Input() title: string;
  // name of the group this accordions belongs to
  @Input() group: string;

  @Input() collapsePrevious = true;

  displayBody$: Observable<boolean>;

  private id: string = uuid();
  private onDestroy$: Subject<void> = new Subject();

  constructor(private ngxRowAccordionService: NgxRowAccordionService) {}

  ngOnInit() {
    if (!this.group) {
      throw new Error('[ngx-row-accordion] you should always pass a group when creating a row-accordion');
    }

    this.ngxRowAccordionService.addComponentToGroup(this.id, this.group, this.collapsePrevious);

    this.displayBody$ = this.ngxRowAccordionService.getState(this.id).pipe(map(x => !x.folded));
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();

    this.ngxRowAccordionService.removeComponentFromGroup(this.id);
  }

  toggle() {
    this.ngxRowAccordionService.toggle(this.id);
  }
}
