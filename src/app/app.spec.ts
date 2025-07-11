import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Content } from './content';

describe('App', () => {
  let httpMock: HttpTestingController;
  let content: Content;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule],
      providers: [
        provideHttpClient(),
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    content = TestBed.inject(Content);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should compute current index correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    const mockContent = [
      { id: '1', link: '/', name: 'Home', examples: [] },
      { id: '2', link: '/about', name: 'About', examples: [] },
      { id: '3', link: '/work', name: 'Work', examples: [] }
    ];

    // Mock the content service methods
    spyOn(content, 'allContent').and.returnValue(mockContent);
    spyOn(content, 'currentPageName').and.returnValue('about');

    const currentIndex = app.currentIndex();
    expect(currentIndex).toBe(1); // Index of '/about' in the mock array
  });

  it('should return undefined when no content is available', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    spyOn(content, 'allContent').and.returnValue(undefined);
    spyOn(content, 'currentPageName').and.returnValue('about');

    const currentIndex = app.currentIndex();
    expect(currentIndex).toBe(-1);
  });
});