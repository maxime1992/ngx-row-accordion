import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { AccordionsPageModule } from './accordions-page/accordions-page.module';

export function loadAccordionsPageModule() {
  return AccordionsPageModule;
}

const routes: Routes = [
  {
    path: 'app',
    loadChildren: loadAccordionsPageModule,
  },
  { path: '**', redirectTo: 'app' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, RouterModule.forRoot(routes), FlexModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
