import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '100%',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        width: '0px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class PageOneComponent implements OnInit {

  isOpen = true;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
