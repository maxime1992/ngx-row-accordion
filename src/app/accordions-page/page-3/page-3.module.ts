import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { Routes, RouterModule } from '@angular/router';
import { PageThreeComponent } from './page-three/page-three.component';

const routes: Routes = [
  {
    path: '',
    component: PageThreeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxRowAccordionModule],
  declarations: [PageThreeComponent],
})
export class Page3Module {}
