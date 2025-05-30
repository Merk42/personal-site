import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resume } from './resume';

describe('ResumeComponent', () => {
  let component: Resume;
  let fixture: ComponentFixture<Resume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [Resume]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Resume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
