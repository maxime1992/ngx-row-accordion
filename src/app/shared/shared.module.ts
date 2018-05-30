import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRowAccordionModule } from 'ngx-row-accordion';
import { RouterModule } from '@angular/router';

const shared = [CommonModule, RouterModule, NgxRowAccordionModule];

@NgModule({
  imports: [...shared],
  exports: [...shared],
})
export class SharedModule {}
