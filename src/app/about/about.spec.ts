import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { About } from './about';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the coding history content', () => {
    const paragraphs = debugElement.queryAll(By.css('p'));
    expect(paragraphs.length).toBeGreaterThan(0);
    
    const firstParagraph = paragraphs[0];
    expect(firstParagraph.nativeElement.textContent).toContain('My coding history began in High School');
  });

  it('should display GitHub profile link', () => {
    const githubLink = debugElement.query(By.css('a[href="https://github.com/Merk42"]'));
    expect(githubLink).toBeTruthy();
    expect(githubLink.nativeElement.textContent).toBe('Github');
    expect(githubLink.nativeElement.getAttribute('target')).toBe('_blank');
  });

  it('should display LinkedIn profile link', () => {
    const linkedinLink = debugElement.query(By.css('a[href="https://www.linkedin.com/in/markecurtis/"]'));
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink.nativeElement.textContent).toBe('LinkedIn');
    expect(linkedinLink.nativeElement.getAttribute('target')).toBe('_blank');
  });

  it('should have profiles list with correct CSS class', () => {
    const profilesList = debugElement.query(By.css('.profiles'));
    expect(profilesList).toBeTruthy();
    expect(profilesList.nativeElement.tagName).toBe('UL');
  });

  it('should contain all expected career milestones', () => {
    const content = debugElement.nativeElement.textContent;
    expect(content).toContain('C++');
    expect(content).toContain('jQuery');
    expect(content).toContain('ClearChannel');
    expect(content).toContain('iHeartRadio');
    expect(content).toContain('Uncommon Goods');
    expect(content).toContain('ActionScript');
  });
});