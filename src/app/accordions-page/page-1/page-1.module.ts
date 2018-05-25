import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { PageOneComponent } from './page-one/page-one.component';

const routes: Routes = [
  {
    path: '',
    component: PageOneComponent,
    children: [
      {
        path: 'page2',
        loadChildren: 'src/app/accordions-page/page-2/page-2.module#Page2Module',
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgxRowAccordionModule],
  declarations: [PageOneComponent],
})
export class Page1Module {}
