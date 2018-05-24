import { NgModule } from '@angular/core';
import { NgxRowAccordionComponent } from './ngx-row-accordion.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [FlexLayoutModule],
  declarations: [NgxRowAccordionComponent],
  exports: [NgxRowAccordionComponent],
})
export class NgxRowAccordionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxRowAccordionModule,
      providers: [],
    };
  }
}

