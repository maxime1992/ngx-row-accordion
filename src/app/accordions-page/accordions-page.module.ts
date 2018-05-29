import { PageOneComponent } from './page-one/page-one.component';
import { NgModule } from '@angular/core';
import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { AccordionsPageComponent } from './accordions-page.component';
import { Routes, RouterModule } from '@angular/router';
import { PageTwoComponent } from './page-two/page-two.component';
import { PageThreeComponent } from './page-three/page-three.component';

const routes: Routes = [
  {
    path: 'accordions',
    component: AccordionsPageComponent,
    children: [
      {
        path: 'page1',
        component: PageOneComponent,
        children: [
          {
            path: 'page2',
            component: PageTwoComponent,
            children: [
              {
                path: 'page3',
                component: PageThreeComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxRowAccordionModule.forRoot()],
  declarations: [AccordionsPageComponent, PageOneComponent, PageTwoComponent, PageThreeComponent],
})
export class AccordionsPageModule {}
