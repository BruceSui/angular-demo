/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YunxinService } from './yunxin.service';

describe('Service: Yunxin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YunxinService]
    });
  });

  it('should ...', inject([YunxinService], (service: YunxinService) => {
    expect(service).toBeTruthy();
  }));
});
