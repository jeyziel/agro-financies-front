import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoAreaComponent } from './custo-area.component';

describe('CustoAreaComponent', () => {
  let component: CustoAreaComponent;
  let fixture: ComponentFixture<CustoAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustoAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
