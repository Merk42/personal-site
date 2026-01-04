import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewportScroller } from '@angular/common';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { Page } from './page';
import { Content } from '../content';
import { IntersectionStatus } from '../from-intersection-observer';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

(globalThis as any).IntersectionObserver = MockIntersectionObserver as any;

describe('Page Component', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;
  let mockViewportScroller: { scrollToPosition: ReturnType<typeof vi.fn> };
  let mockContentService: {
    currentPageName: ReturnType<typeof signal>;
    currentExampleIndex: ReturnType<typeof signal>;
    currentNav: ReturnType<typeof signal>;
    currentPage: ReturnType<typeof signal>;
  };

  const mockPageData = {
    examples: [
      { nav: 'About Me', content: 'About content' },
      { nav: 'Example 1', content: 'Example 1 content' },
      { nav: 'Example 2', content: 'Example 2 content' }
    ]
  };

  beforeEach(async () => {
    mockViewportScroller = {
      scrollToPosition: vi.fn()
    };

    mockContentService = {
      currentPageName: signal(''),
      currentExampleIndex: signal(0),
      currentNav: signal([
        { nav: 'About Me' },
        { nav: 'Example 1' },
        { nav: 'Example 2' }
      ]),
      currentPage: signal(mockPageData)
    };

    await TestBed.configureTestingModule({
      imports: [Page],
      providers: [
        provideRouter([]),
        { provide: ViewportScroller, useValue: mockViewportScroller },
        { provide: Content, useValue: mockContentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should inject ViewportScroller', () => {
      expect(component.viewportScroller).toBe(mockViewportScroller);
    });

    it('should inject Content service', () => {
      expect(component.contentService).toBe(mockContentService);
    });

    it('should have section input signal', () => {
      expect(component.section).toBeDefined();
    });
  });

  describe('Constructor Effect', () => {
    it('should scroll to top on initialization', () => {
      fixture.detectChanges();
      expect(mockViewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
    });
/*
    it('should set current page name from section input', () => {
      fixture.componentRef.setInput('section', 'test-section');
      fixture.detectChanges();
      expect(mockContentService.currentPageName()).toBe('test-section');
    });
*/
    it('should reset current example index to 0', () => {
      mockContentService.currentExampleIndex.set(5);
      fixture.componentRef.setInput('section', 'new-section');
      fixture.detectChanges();
      expect(mockContentService.currentExampleIndex()).toBe(0);
    });
/*
    it('should trigger effect when section input changes', () => {
      fixture.componentRef.setInput('section', 'section-1');
      fixture.detectChanges();
      expect(mockContentService.currentPageName()).toBe('section-1');

      fixture.componentRef.setInput('section', 'section-2');
      fixture.detectChanges();
      expect(mockContentService.currentPageName()).toBe('section-2');
      expect(mockViewportScroller.scrollToPosition).toHaveBeenCalledTimes(2);
    });
    */
  });

  describe('demo computed property', () => {
    it('should return current page from content service', () => {
      fixture.detectChanges();
      expect(component.demo()).toEqual(mockPageData);
    });

    it('should update when currentPage signal changes', () => {
      fixture.detectChanges();
      const newPageData = {
        examples: [{ nav: 'New Example', content: 'New content' }]
      };

      mockContentService.currentPage.set(newPageData);
      fixture.detectChanges();

      expect(component.demo()).toEqual(newPageData);
    });
  });

  describe('onVisibilityChanged method', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should update currentExampleIndex when status is Visible', () => {
      component.onVisibilityChanged(2, 'Visible' as IntersectionStatus);
      expect(mockContentService.currentExampleIndex()).toBe(2);
    });

    it('should update to different indices', () => {
      component.onVisibilityChanged(1, 'Visible' as IntersectionStatus);
      expect(mockContentService.currentExampleIndex()).toBe(1);

      component.onVisibilityChanged(3, 'Visible' as IntersectionStatus);
      expect(mockContentService.currentExampleIndex()).toBe(3);
    });

    it('should not update currentExampleIndex when status is not Visible', () => {
      mockContentService.currentExampleIndex.set(1);

      component.onVisibilityChanged(2, 'Pending' as IntersectionStatus);
      expect(mockContentService.currentExampleIndex()).toBe(1);

      component.onVisibilityChanged(3, 'NotVisible' as IntersectionStatus);
      expect(mockContentService.currentExampleIndex()).toBe(1);
    });

    it('should handle index 0', () => {
      mockContentService.currentExampleIndex.set(5);
      component.onVisibilityChanged(0, 'Visible' as IntersectionStatus);
      expect(mockContentService.currentExampleIndex()).toBe(0);
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render navigation items', () => {
      const compiled = fixture.nativeElement;
      const navLinks = compiled.querySelectorAll('.sideNav a');
      expect(navLinks.length).toBe(3);
    });

    it('should render correct navigation text', () => {
      const compiled = fixture.nativeElement;
      const navLinks = compiled.querySelectorAll('.sideNav a span');
      expect(navLinks[0].textContent).toBe('About Me');
      expect(navLinks[1].textContent).toBe('Example 1');
      expect(navLinks[2].textContent).toBe('Example 2');
    });

    it('should apply active class to current example', () => {
      mockContentService.currentExampleIndex.set(1);
      fixture.detectChanges();

      const navLinks = fixture.nativeElement.querySelectorAll('.sideNav a');
      expect(navLinks[1].classList.contains('active')).toBe(true);
      expect(navLinks[0].classList.contains('active')).toBe(false);
    });

    it('should render sections for each example', () => {
      const sections = fixture.nativeElement.querySelectorAll('section');
      expect(sections.length).toBe(3);
    });

    it('should set correct id on sections', () => {
      const sections = fixture.nativeElement.querySelectorAll('section');
      expect(sections[0].id).toBe('About Me');
      expect(sections[1].id).toBe('Example 1');
      expect(sections[2].id).toBe('Example 2');
    });

    it('should render h2 with correct text', () => {
      const headings = fixture.nativeElement.querySelectorAll('h2');
      expect(headings[0].textContent).toBe('About Me');
      expect(headings[1].textContent).toBe('Example 1');
    });

    it('should render About component for "About Me" section', () => {
      const aboutComponent = fixture.nativeElement.querySelector('mec-about');
      expect(aboutComponent).toBeTruthy();
    });

    it('should render ExampleFigure for non-About sections', () => {
      const exampleFigures = fixture.nativeElement.querySelectorAll('mec-example-figure');
      expect(exampleFigures.length).toBe(2);
    });
  });
});
