import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Content } from './content';

xdescribe('Content', () => {
  let service: Content;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideZonelessChangeDetection]
    });
    service = TestBed.inject(Content);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
