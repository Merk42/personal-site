import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgComponent } from './cg.component';

describe('CgComponent', () => {
  let component: CgComponent;
  let fixture: ComponentFixture<CgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
