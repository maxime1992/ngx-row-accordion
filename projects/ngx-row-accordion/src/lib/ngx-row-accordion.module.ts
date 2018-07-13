import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { NgxRowAccordionComponent } from './ngx-row-accordion.component';
import { NgxRowAccordionService } from './ngx-row-accordion.service';

// @todo RouterModule should be passed within forRoot to avoid creating new instances
// this will prevent unexpected behavior with interceptors on main app
@NgModule({
  imports: [CommonModule, FlexLayoutModule, RouterModule],
  declarations: [NgxRowAccordionComponent],
  exports: [NgxRowAccordionComponent],
})
export class NgxRowAccordionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxRowAccordionModule,
      providers: [NgxRowAccordionService],
    };
  }
}
