import { NgModule } from '@angular/core';
import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { AccordionsPageComponent } from './accordions-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'accordions',
    component: AccordionsPageComponent,
    children: [
      {
        path: 'page1',
        loadChildren: 'src/app/accordions-page/page-1/page-1.module#Page1Module',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxRowAccordionModule.forRoot()],
  declarations: [AccordionsPageComponent],
})
export class AccordionsPageModule {}
