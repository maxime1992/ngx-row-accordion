import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxRowAccordionService, AccordionState } from './ngx-row-accordion.service';
import { tap, takeUntil, delay, map } from 'rxjs/operators';
import { merge, Subject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'ngx-row-accordion',
  templateUrl: './ngx-row-accordion.component.html',
  styleUrls: ['./ngx-row-accordion.component.scss'],
})
export class NgxRowAccordionComponent implements OnInit, OnDestroy {
  @Input() title: string;
  // name of the group this accordions belongs to
  @Input() group: string;

  displayBody$: Observable<boolean>;

  private id: string = uuid();
  private onDestroy$: Subject<void> = new Subject();

  constructor(private ngxRowAccordionService: NgxRowAccordionService) {}

  ngOnInit() {
    if (!this.group) {
      throw new Error('[ngx-row-accordion] you should always pass a group when creating a row-accordion');
    }

    this.ngxRowAccordionService.addComponentToGroup(this.id, this.group);

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
