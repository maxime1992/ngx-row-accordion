import { NgModule } from '@angular/core';
import { PageTwoComponent } from './page-two/page-two.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

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
  imports: [ RouterModule.forChild(routes), SharedModule],
  declarations: [PageTwoComponent],
})
export class Page2Module {}
