import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExampleFigure } from './example-figure';
import { Example } from '../types';

describe('ExampleFigure', () => {
  let component: ExampleFigure;
  let fixture: ComponentFixture<ExampleFigure>;
  let debugElement: DebugElement;

  const mockExample:Example = {
    "nav": "Acronymph",
    "img": "acronymph.png",
    "image": {
      "width": 1460,
      "height": 560,
      "formats": [
        "acronymph.png"
      ]
    },
    "copy": "Recreation of multiplayer acronym game. Utilizing NodeJS, Socket.io, React, and Tailwind. Allows for up to 20 players to compete in crafting acronyms from randomly generated array of letters.",
    "ctas":[
      {
        "link":"https://acronymph.markecurtis.com",
        "copy":"interactive version"
      },
      {
        "link":"https://github.com/Merk42/acronymph",
        "copy":"github"
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleFigure],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleFigure);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('EX', mockExample);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the caption', () => {
    const figcaptions = debugElement.queryAll(By.css('figcaption'));
    expect(figcaptions.length).toBeGreaterThan(0);

    const firstFigcaption = figcaptions[0];
    expect(firstFigcaption.nativeElement.textContent).toContain('Recreation of multiplayer acronym game. Utilizing NodeJS, Socket.io, React, and Tailwind.');
  });

  it('should display GitHub profile link', () => {
    const githubLink = debugElement.query(By.css('a[href="https://github.com/Merk42/acronymph"]'));
    expect(githubLink).toBeTruthy();
    expect(githubLink.nativeElement.textContent).toBe('github');
    expect(githubLink.nativeElement.getAttribute('target')).toBe('_blank');
  });
});
