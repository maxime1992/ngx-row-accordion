import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageThreeComponent } from './page-three/page-three.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PageThreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [PageThreeComponent],
})
export class Page3Module {}
