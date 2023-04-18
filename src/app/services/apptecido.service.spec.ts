import { TestBed } from '@angular/core/testing';

import { ApptecidoService } from './apptecido.service';

describe('ApptecidoService', () => {
  let service: ApptecidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApptecidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
