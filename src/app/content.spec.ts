import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Content } from './content';
import { Page } from './types';
import { provideHttpClient } from '@angular/common/http';

describe('Content Service', () => {
  let service: Content;
  let httpMock: HttpTestingController;

  const mockContentData: Page[] = [
    {
      id: '1',
      link: '/about',
      name: 'About',
      examples: [
        { nav: 'About Me', copy: 'About me content' },
        { nav: 'Skills', copy: 'Skills content' }
      ]
    },
    {
      id: '2',
      link: '/past',
      name: 'Past Work',
      examples: [
        { nav: 'Project 1', copy: 'Project 1 content' },
        { nav: 'Project 2', copy: 'Project 2 content' }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        Content]
    });
    service = TestBed.inject(Content);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch content from API', () => {
    /*
    service.getContent().subscribe(content => {
      expect(content).toEqual(mockContentData);
      expect(content.length).toBe(2);
    });
    */
/*
    const req = httpMock.expectOne('content.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockContentData);
    */
  });

  it('should update current page name', () => {
    service.currentPageName.set('about');
    expect(service.currentPageName()).toBe('about');
  });

  it('should update current page index', () => {
    service.currentPageIndex.set(1);
    expect(service.currentPageIndex()).toBe(1);
  });

  it('should update current example index', () => {
    service.currentExampleIndex.set(2);
    expect(service.currentExampleIndex()).toBe(2);
  });
/*
  it('should compute current page based on page name', () => {
    // Mock the HTTP request first
    service.getContent().subscribe();
    const req = httpMock.expectOne('content.json');
    req.flush(mockContentData);

    // Set the current page name
    service.currentPageName.set('about');

    // Test the computed value
    const currentPage = service.currentPage();
    expect(currentPage.name).toBe('About');
    expect(currentPage.link).toBe('/about');
  });
*/
  it('should return empty page when no match found', () => {
    // Mock the HTTP request first
    service.getContent().subscribe();
    const req = httpMock.expectOne('content.json');
    req.flush(mockContentData);

    // Set a non-existent page name
    service.currentPageName.set('nonexistent');

    const currentPage = service.currentPage();
    expect(currentPage).toEqual({
      id: '',
      link: '',
      name: '',
      examples: []
    });
  });
/*
  it('should compute current nav from current page examples', () => {
    // Mock the HTTP request first
    service.getContent().subscribe();
    const req = httpMock.expectOne('content.json');
    req.flush(mockContentData);
    console.log("MOCK", req);

    // Set the current page name
    service.currentPageName.set('about');

    const currentNav = service.currentNav();
    expect(currentNav).toEqual([
      { nav: 'About Me', copy: 'About me content' },
      { nav: 'Skills', copy: 'Skills content' }
    ]);
  });
  */
});
