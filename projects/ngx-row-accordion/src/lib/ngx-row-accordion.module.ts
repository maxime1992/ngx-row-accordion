import { NgxRowAccordionService } from './ngx-row-accordion.service';
import { NgModule } from '@angular/core';
import { NgxRowAccordionComponent } from './ngx-row-accordion.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

