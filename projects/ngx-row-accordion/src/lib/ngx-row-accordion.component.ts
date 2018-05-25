import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-row-accordion',
  templateUrl: './ngx-row-accordion.component.html',
  styleUrls: ['./ngx-row-accordion.component.scss'],
})
export class NgxRowAccordionComponent implements OnInit {
  @Input() title: string;

  isFolded: boolean = false;

  constructor() {}

  ngOnInit() {}

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
