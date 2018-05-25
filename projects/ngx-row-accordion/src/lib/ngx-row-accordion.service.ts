import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, mapTo, map } from 'rxjs/operators';
import { NgxRowAccordionComponent } from './ngx-row-accordion.component';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

type Group = Map<NgxRowAccordionComponent, undefined>;

@Injectable({
  providedIn: 'root',
})
export class NgxRowAccordionService {
  private groups: Map<string, Group> = new Map();
  private componentToGroup: Map<NgxRowAccordionComponent, string> = new Map();
  private _onAddInGroup$: Subject<string> = new Subject();
  private _onRemoveInGroup$: Subject<{ name: string; index: number }> = new Subject();

  constructor() {}

  private addGroupIfDoesNotExists(groupName: string): void {
    if (!this.groups.has(groupName)) {
      this.groups.set(groupName, new Map());
    }
  }

  addComponentToGroup(componentRef: NgxRowAccordionComponent, groupName: string): number {
    this.addGroupIfDoesNotExists(groupName);

    const group: Group = this.groups.get(groupName);

    if (group.has(componentRef)) {
      throw new Error('A row-accordion should be registered only once');
    }

    group.set(componentRef, undefined);

    this.componentToGroup.set(componentRef, groupName);

    this._onAddInGroup$.next(groupName);

    return group.size - 1;
  }

  removeComponentFromGroup(componentRef: NgxRowAccordionComponent) {
    const groupName: string = this.componentToGroup.get(componentRef);

    this.groups.get(groupName).delete(componentRef);

    this._onRemoveInGroup$.next({ name: groupName, index: this.groups.get(groupName).size });

    if (this.groups.get(groupName).size === 0) {
      this.groups.delete(groupName);
    }
  }

  onAddInGroup(groupName: string): Observable<void> {
    return this._onAddInGroup$.pipe(filter(gName => gName === groupName), mapTo(undefined));
  }

  onRemoveInGroup(groupName: string): Observable<number> {
    return this._onRemoveInGroup$.pipe(filter(({ name, index }) => name === groupName), map(({ index }) => index));
  }
}
