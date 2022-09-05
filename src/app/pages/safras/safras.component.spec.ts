import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafrasComponent } from './safras.component';

describe('SafrasComponent', () => {
  let component: SafrasComponent;
  let fixture: ComponentFixture<SafrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafrasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
