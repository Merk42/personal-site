import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Logo } from './logo';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Logo', () => {
  let component: Logo;
  let fixture: ComponentFixture<Logo>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logo],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(Logo);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render M letter structure', () => {
    const mLetter = debugElement.query(By.css('.m'));
    expect(mLetter).toBeTruthy();
    
    const mElements = mLetter.queryAll(By.css('div'));
    expect(mElements.length).toBe(4); // lg, md, sm, xl
    
    const classes = mElements.map(el => el.nativeElement.className);
    expect(classes).toContain('lg');
    expect(classes).toContain('md');
    expect(classes).toContain('sm');
    expect(classes).toContain('xl');
  });

  it('should render C letter structure', () => {
    const cLetter = debugElement.query(By.css('.c'));
    expect(cLetter).toBeTruthy();
    
    const cElements = cLetter.queryAll(By.css('div'));
    expect(cElements.length).toBe(4); // lg, md, sm, xs
    
    const classes = cElements.map(el => el.nativeElement.className);
    expect(classes).toContain('lg');
    expect(classes).toContain('md');
    expect(classes).toContain('sm');
    expect(classes).toContain('xs');
  });

  it('should have proper grid structure', () => {
    const hostElement = debugElement.nativeElement;
    const computedStyle = getComputedStyle(hostElement);
    expect(computedStyle.display).toBe('inline-grid');
  });

  it('should contain exactly two main sections (M and C)', () => {
    const mainDivs = debugElement.children.filter(child => child.name === 'div');
    expect(mainDivs.length).toBe(2);
    
    const classes = mainDivs.map(div => div.nativeElement.className);
    expect(classes).toContain('m');
    expect(classes).toContain('c');
  });
});