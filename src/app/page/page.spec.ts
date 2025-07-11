import { provideHttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Content } from '../content';
import { IntersectionStatus } from '../from-intersection-observer';
import { Page } from './page';

xdescribe('Page', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;
  let content: Content;
  let httpMock: HttpTestingController;
  let viewportScroller: jasmine.SpyObj<ViewportScroller>;

  const mockPage = {
    id: '1',
    link: '/test',
    name: 'Test Page',
    examples: [
      { nav: 'Example 1', copy: 'Example 1 content' },
      { nav: 'Example 2', copy: 'Example 2 content' }
    ]
  };

  beforeEach(async () => {
    const viewportScrollerSpy = jasmine.createSpyObj('ViewportScroller', ['scrollToPosition']);

    await TestBed.configureTestingModule({
      imports: [Page],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        Content,
        { provide: ViewportScroller, useValue: viewportScrollerSpy }
      ]
    }).compileComponents();

    content = TestBed.inject(Content);
    httpMock = TestBed.inject(HttpTestingController);
    viewportScroller = TestBed.inject(ViewportScroller) as jasmine.SpyObj<ViewportScroller>;

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
    
    // Set up the component input
    fixture.componentRef.setInput('section', 'test');
    
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with section input', () => {
    expect(component.section()).toBe('test');
  });

  it('should update content service when section changes', () => {
    spyOn(content.currentPageName, 'set');
    spyOn(content.currentExampleIndex, 'set');

    fixture.componentRef.setInput('section', 'new-section');
    fixture.detectChanges();

    expect(content.currentPageName.set).toHaveBeenCalledWith('new-section');
    // expect(content.currentExampleIndex.set).toHaveBeenCalledWith(0);
  });

  it('should scroll to top when section changes', () => {
    fixture.componentRef.setInput('section', 'new-section');
    fixture.detectChanges();

    expect(viewportScroller.scrollToPosition).toHaveBeenCalledWith([0, 0]);
  });

  it('should handle visibility change events', () => {
    spyOn(content.currentExampleIndex, 'set');

    component.onVisibilityChanged(2, IntersectionStatus.Visible);
    expect(content.currentExampleIndex.set).toHaveBeenCalledWith(2);

    component.onVisibilityChanged(3, IntersectionStatus.NotVisible);
    expect(content.currentExampleIndex.set).not.toHaveBeenCalledWith(3);
  });

  it('should only update index when status is Visible', () => {
    spyOn(content.currentExampleIndex, 'set');

    component.onVisibilityChanged(1, IntersectionStatus.Pending);
    expect(content.currentExampleIndex.set).not.toHaveBeenCalled();

    component.onVisibilityChanged(1, IntersectionStatus.Visible);
    expect(content.currentExampleIndex.set).toHaveBeenCalledWith(1);
  });
});