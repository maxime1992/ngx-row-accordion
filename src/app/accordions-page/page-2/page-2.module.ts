import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { PageTwoComponent } from './page-two/page-two.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PageTwoComponent,
    children: [
      {
        path: 'page3',
        loadChildren: 'src/app/accordions-page/page-3/page-3.module#Page3Module',
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxRowAccordionModule],
  declarations: [PageTwoComponent],
})
export class Page2Module {}
