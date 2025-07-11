import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IntersectionObserverDirective } from './intersection-observer';
import { IntersectionStatus } from './from-intersection-observer';

describe('IntersectionObserverDirective', () => {
  let directive: IntersectionObserverDirective;
  let mockElementRef: ElementRef;
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    mockElementRef = new ElementRef(mockElement);
    
    TestBed.configureTestingModule({
      providers: [IntersectionObserverDirective]
    });
    
    directive = new IntersectionObserverDirective(mockElementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have default values', () => {
    expect(directive.intersectionDebounce).toBe(0);
    expect(directive.intersectionRootMargin).toBe('0px');
    expect(directive.intersectionRoot).toBeUndefined();
    expect(directive.intersectionThreshold).toBeUndefined();
  });

  it('should clean up on destroy', () => {
    spyOn(directive['destroy$'], 'next');
    directive.ngOnDestroy();
    expect(directive['destroy$'].next).toHaveBeenCalledWith(null);
  });

  it('should accept custom configuration', () => {
    directive.intersectionDebounce = 100;
    directive.intersectionRootMargin = '10px';
    directive.intersectionThreshold = 0.5;

    expect(directive.intersectionDebounce).toBe(100);
    expect(directive.intersectionRootMargin).toBe('10px');
    expect(directive.intersectionThreshold).toBe(0.5);
  });
});