import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { AccordionsPageComponent } from './accordions-page.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageTwoComponent } from './page-two/page-two.component';

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
