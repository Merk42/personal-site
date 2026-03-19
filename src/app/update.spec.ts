import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { Update } from './update';

describe('Update', () => {
  let service: Update;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
         { provide: SwUpdate, useValue: { isEnabled: false } }
      ]
    })
    TestBed.configureTestingModule({});
    service = TestBed.inject(Update);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
