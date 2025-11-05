import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IntersectionObserverDirective } from './intersection-observer';

describe('IntersectionObserverDirective', () => {
  it('should create an instance', () => {
    @Component({
      template: `<div intersectionObserver></div>`,
      standalone: true,
      imports: [IntersectionObserverDirective]
    })
    class TestComponent {}

    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()]
    });

    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture).toBeTruthy();
  });

  it('should have default values', () => {
    @Component({
      template: `<div intersectionObserver></div>`,
      standalone: true,
      imports: [IntersectionObserverDirective]
    })
    class TestComponent {}

    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()]
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directive = fixture.debugElement.children[0].injector.get(IntersectionObserverDirective);

    expect(directive.intersectionDebounce()).toBe(0);
    expect(directive.intersectionRootMargin()).toBe('0px');
    expect(directive.intersectionRoot()).toBeUndefined();
    expect(directive.intersectionThreshold()).toBeUndefined();
  });

  it('should accept custom configuration', () => {
    @Component({
      template: `
        <div
          intersectionObserver
          [intersectionDebounce]="100"
          [intersectionRootMargin]="'10px'"
          [intersectionThreshold]="0.5">
        </div>
      `,
      standalone: true,
      imports: [IntersectionObserverDirective]
    })
    class TestComponent {}

    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()]
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const directive = fixture.debugElement.children[0].injector.get(IntersectionObserverDirective);

    expect(directive.intersectionDebounce()).toBe(100);
    expect(directive.intersectionRootMargin()).toBe('10px');
    expect(directive.intersectionThreshold()).toBe(0.5);
  });
});
