import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRowAccordionModule } from 'ngx-row-accordion';

const shared = [CommonModule, NgxRowAccordionModule];

@NgModule({
  imports: [...shared],
  exports: [...shared],
})
export class SharedModule {}
