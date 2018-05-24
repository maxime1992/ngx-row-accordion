import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxRowAccordionModule } from 'ngx-row-accordion';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxRowAccordionModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
