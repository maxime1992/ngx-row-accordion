import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AccordionsPageModule } from './accordions-page/accordions-page.module';
import { AppComponent } from './app.component';
import { AuxAccordionsPageModule } from './aux-accordions-page/aux-accordions-page.module';
import { AuxiliaryRouteProxyComponent } from './auxiliary-route-proxy/auxiliary-route-proxy.component';
import { SharedModule } from './shared/shared.module';

export function loadAccordionsPageModule() {
  return AccordionsPageModule;
}

export function loadAuxAccordionsPageModule() {
  return AuxAccordionsPageModule;
}

// for now the build of the project (at least demo) does not work at all
// when using lazy loading like the following
// ----------------------------------------
// {
//   path: 'auxiliary-route',
//   outlet: 'aux',
//   component: AuxiliaryRouteProxyComponent,
//   children: [
//     {
//       path: '',
//       loadChildren: 'app/aux-accordions-page/aux-accordions-page.module#AuxAccordionsPageModule',
//     },
//   ],
// },
// {
//   path: 'app',
//   loadChildren: 'app/accordions-page/accordions-page.module#AccordionsPageModule',
// },
// ----------------------------------------
// it's failing because of CLI issues
// https://github.com/angular/angular-cli/issues/2601
// https://github.com/angular/angular-cli/issues/10750
// https://github.com/angular/angular-cli/issues/7332
// when not using lazy loading, it doesn't work either
// because of https://github.com/angular/angular-cli/issues/4192 ... ¯\_(ツ)_/¯
// tried to explain the vicious circle here:
// https://github.com/angular/angular-cli/issues/2601#issuecomment-393197794

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
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes), SharedModule, FlexModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
