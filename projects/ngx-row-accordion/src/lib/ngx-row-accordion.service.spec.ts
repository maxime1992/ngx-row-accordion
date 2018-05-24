import { TestBed, inject } from '@angular/core/testing';

import { NgxRowAccordionService } from './ngx-row-accordion.service';

describe('NgxRowAccordionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxRowAccordionService],
    });
  });

  it(
    'should be created',
    inject([NgxRowAccordionService], (service: NgxRowAccordionService) => {
      expect(service).toBeTruthy();
    })
  );
});
