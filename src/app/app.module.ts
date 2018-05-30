import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { AccordionsPageModule } from './accordions-page/accordions-page.module';
import { AuxAccordionsPageModule } from './aux-accordions-page/aux-accordions-page.module';
import { AuxiliaryRouteProxyComponent } from './auxiliary-route-proxy/auxiliary-route-proxy.component';

export function loadAccordionsPageModule() {
  return AccordionsPageModule;
}

export function loadAuxAccordionsPageModule() {
  return AuxAccordionsPageModule;
}

const routes: Routes = [
  {
    path: 'auxiliary-route',
    outlet: 'aux',
    component: AuxiliaryRouteProxyComponent,
    children: [
      {
        path: '',
        loadChildren: loadAuxAccordionsPageModule,
      },
    ],
  },
  {
    path: 'app',
    loadChildren: loadAccordionsPageModule,
  },
  // { path: '**', redirectTo: 'app' },
];

@NgModule({
  declarations: [AppComponent, AuxiliaryRouteProxyComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), SharedModule, FlexModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
