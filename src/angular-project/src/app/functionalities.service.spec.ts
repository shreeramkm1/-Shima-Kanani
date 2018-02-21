import { TestBed, inject } from '@angular/core/testing';

import { FunctionalitiesService } from './functionalities.service';

describe('FunctionalitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionalitiesService]
    });
  });

  it('should be created', inject([FunctionalitiesService], (service: FunctionalitiesService) => {
    expect(service).toBeTruthy();
  }));
});
