import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Page } from './page';

  import { HttpClient } from '@angular/common/http';
    import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
    import { provideHttpClient } from '@angular/common/http';
    // Import your service under test
    import { Content } from '../content';
    import { ActivatedRoute } from '@angular/router';


describe('Page', () => {
  let component: Page;
  let fixture: ComponentFixture<Page>;

  let content: Content;
  let activatedRoute: ActivatedRoute;
  let httpTestingController: HttpTestingController;

   const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Page],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        Content,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        provideZonelessChangeDetection()
      ]
    })
    .compileComponents();

    content = TestBed.inject(Content);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
