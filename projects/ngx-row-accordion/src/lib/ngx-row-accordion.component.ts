import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxRowAccordionService } from './ngx-row-accordion.service';
import { tap, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

@Component({
  selector: 'ngx-row-accordion',
  templateUrl: './ngx-row-accordion.component.html',
  styleUrls: ['./ngx-row-accordion.component.scss'],
})
export class NgxRowAccordionComponent implements OnInit, OnDestroy {
  @Input() title: string;

  // name of the group this accordions belongs to
  @Input() group: string;

  isFolded: boolean = false;

  private onDestroy$: Subject<void> = new Subject();

  constructor(private ngxRowAccordionService: NgxRowAccordionService) {}

  ngOnInit() {
    if (!this.group) {
      throw new Error('[ngx-row-accordion] you should always pass a group when creating a row-accordion');
    }

    const index = this.ngxRowAccordionService.addComponentToGroup(this, this.group);

    merge(
      this.ngxRowAccordionService.onAddInGroup(this.group).pipe(tap(x => this.fold())),
      this.ngxRowAccordionService.onRemoveInGroup(this.group).pipe(
        tap(removedIndex => {
          if (index === removedIndex - 1) {
            this.unfold();
          }
        })
      )
    )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();

    this.ngxRowAccordionService.removeComponentFromGroup(this);
  }

  fold() {
    this.isFolded = true;
  }

  unfold() {
    this.isFolded = false;
  }

  toggle() {
    this.isFolded = !this.isFolded;
  }
}
