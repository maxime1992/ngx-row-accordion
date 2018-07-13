import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxRowAccordionModule } from 'ngx-row-accordion';

const shared = [CommonModule, RouterModule, NgxRowAccordionModule];

@NgModule({
  imports: [...shared],
  exports: [...shared],
})
export class SharedModule {}
