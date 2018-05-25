import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOneComponent } from './page-one/page-one.component';
import { SharedModule } from '../../shared/shared.module';

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
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [PageOneComponent],
})
export class Page1Module {}
