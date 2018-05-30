import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, mapTo, map, distinctUntilChanged, tap, delay } from 'rxjs/operators';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

interface Dictionnary<T> {
  [key: string]: T;
}

export interface AccordionState {
  folded: boolean;
}

type GroupName = string;
type AccordionComponentId = string;

interface AccordionGroup {
  // reference to every accordions of the group (to access them by reference)
  map: { [accordionComponentId: string]: AccordionState };
  // array containing the elements IDs to keep track of the orde
  array: AccordionComponentId[];
}

@Injectable({ providedIn: 'root' })
export class NgxRowAccordionService {
  private groups$: BehaviorSubject<Dictionnary<AccordionGroup>> = new BehaviorSubject({});
  private componentToGroup: Map<AccordionComponentId, GroupName> = new Map();

  public addComponentToGroup(accordionComponentId: string, groupName: string): void {
    // get current group
    const groups = this.groups$.getValue();
    let group: AccordionGroup = groups[groupName];

    // if the group does not exist yet, initialize it
    if (!group) {
      group = {
        map: {},
        array: [],
      };
    }

    // if the accordion ID is already registered, throw
    if (!!group.map[accordionComponentId]) {
      throw new Error('A row-accordion should be registered only once');
    }

    // add the new accordion to the group
    const groupWithNewAccordion: AccordionGroup = {
      map: {
        ...group.map,
        [accordionComponentId]: { folded: false },
      },
      array: [...group.array, accordionComponentId],
    };

    this.componentToGroup.set(accordionComponentId, groupName);

    const index: number = groupWithNewAccordion.array.length - 1;

    let newGroupWithNewState: Dictionnary<AccordionGroup> = {
      ...this.groups$.getValue(),
      [groupName]: groupWithNewAccordion,
    };

    // if adding an accordion which is not the first one, close the previous one
    if (index > 0) {
      const previousComponentId: string = groupWithNewAccordion.array[index - 1];

      newGroupWithNewState = getNewState(newGroupWithNewState, groupName, previousComponentId, { folded: true });
    }

    this.groups$.next(newGroupWithNewState);
  }

  public removeComponentFromGroup(accordionComponentId: string): void {
    const groups = this.groups$.getValue();

    const groupName: string = this.componentToGroup.get(accordionComponentId);
    const group: AccordionGroup = this.groups$.getValue()[groupName];

    const { [accordionComponentId]: omit, ...newMap } = group.map;

    const newArray = group.array.filter(x => x !== accordionComponentId);

    let newGroups: Dictionnary<AccordionGroup>;

    const { [groupName]: currentGroup, ...remainingGroups } = groups;

    if (newArray.length === 0) {
      // if current group is now empty, remove the group by keeping only the others
      newGroups = remainingGroups;
    } else {
      newGroups = {
        ...remainingGroups,
        [groupName]: {
          map: newMap,
          array: newArray,
        },
      };
    }

    this.groups$.next(newGroups);
  }

  public getState(accordionComponentId: string): Observable<AccordionState> {
    const groupName: string = this.componentToGroup.get(accordionComponentId);

    return this.groups$.pipe(
      map(groups => groups[groupName]),
      filter(group => !!group),
      map(group => group.map[accordionComponentId]),
      filter(group => !!group),
      distinctUntilChanged(),
      delay(0)
    );
  }

  private updateState(accordionComponentId: string, newState: Partial<AccordionState>): void {
    const groupName: string = this.componentToGroup.get(accordionComponentId);
    const state: AccordionState = this._getState(accordionComponentId);

    if (!!state) {
      this.groups$.next(getNewState(this.groups$.getValue(), groupName, accordionComponentId, newState));
    }
  }

  toggle(accordionComponentId: string): void {
    const groupName: string = this.componentToGroup.get(accordionComponentId);
    const state: AccordionState = this._getState(accordionComponentId);

    if (!!state) {
      const folded: boolean = state.folded;

      this.updateState(accordionComponentId, { folded: !folded });
    }
  }

  private _getState(accordionComponentId: string): AccordionState {
    const groupName: string = this.componentToGroup.get(accordionComponentId);
    const groups = this.groups$.getValue();
    const group: AccordionGroup = groups[groupName];
    if (!!group) {
      const state: AccordionState = group.map[accordionComponentId];
      return state;
    }
  }
}

function getNewState(
  groups: Dictionnary<AccordionGroup>,
  groupName: string,
  accordionComponentId: string,
  newState: Partial<AccordionState>
): Dictionnary<AccordionGroup> {
  return {
    ...groups,
    [groupName]: {
      ...groups[groupName],
      map: {
        ...groups[groupName].map,
        [accordionComponentId]: {
          ...groups[groupName].map[accordionComponentId],
          ...newState,
        },
      },
    },
  };
}
