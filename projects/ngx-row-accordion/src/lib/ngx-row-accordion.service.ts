import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, mapTo, map, delay } from 'rxjs/operators';
import { NgxRowAccordionComponent } from './ngx-row-accordion.component';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

interface AccordionState {
  folded: boolean;
}

interface AccordionGroup {
  // reference to every accordions of the group (to access them by reference)
  map: Map<NgxRowAccordionComponent, AccordionState>;
  // array containing the elements to keep track of the order (to access them by order)
  array: NgxRowAccordionComponent[];
  // subject to broadcast the index of new element added to that group
  onAdd$: Subject<{ groupName: string; index: number }>;
  // subject to broadcast the index of element removed from that group
  onDelete$: Subject<{ groupName: string; index: number }>;
}

@Injectable({ providedIn: 'root' })
export class NgxRowAccordionService {
  private groups: Map<string, AccordionGroup> = new Map();
  private componentToGroup: Map<NgxRowAccordionComponent, string> = new Map();

  private addGroupIfDoesNotExists(groupName: string): void {
    if (this.groups.has(groupName)) {
      return;
    }

    const group: AccordionGroup = {
      map: new Map(),
      array: [],
      onAdd$: new Subject(),
      onDelete$: new Subject(),
    };

    this.groups.set(groupName, group);
  }

  addComponentToGroup(componentRef: NgxRowAccordionComponent, groupName: string): number {
    this.addGroupIfDoesNotExists(groupName);

    const group: AccordionGroup = this.groups.get(groupName);

    if (group.map.has(componentRef)) {
      throw new Error('A row-accordion should be registered only once');
    }

    group.map.set(componentRef, { folded: false });
    group.array.push(componentRef);
    this.componentToGroup.set(componentRef, groupName);

    const index = group.map.size - 1;
    group.onAdd$.next({ groupName, index: index });

    return index;
  }

  removeComponentFromGroup(componentRef: NgxRowAccordionComponent) {
    const groupName: string = this.componentToGroup.get(componentRef);
    this.groups.get(groupName).map.delete(componentRef);
    this.groups.get(groupName).array = this.groups.get(groupName).array.filter(x => x !== componentRef);
    this.groups.get(groupName).onDelete$.next({ groupName, index: this.groups.get(groupName).map.size });

    if (this.groups.get(groupName).map.size === 0) {
      this.groups.get(groupName).onAdd$.complete();
      this.groups.get(groupName).onDelete$.complete();

      this.groups.delete(groupName);
    }
  }

  onAddInGroup(groupName: string): Observable<number> {
    return this.groups
      .get(groupName)
      .onAdd$.asObservable()
      .pipe(map(x => x.index), delay(0));
  }

  onRemoveInGroup(groupName: string): Observable<number> {
    return this.groups
      .get(groupName)
      .onDelete$.asObservable()
      .pipe(map(x => x.index), delay(0));
  }
}
