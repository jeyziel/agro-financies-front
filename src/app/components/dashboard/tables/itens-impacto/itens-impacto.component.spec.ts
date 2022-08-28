import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensImpactoComponent } from './itens-impacto.component';

describe('ItensImpactoComponent', () => {
  let component: ItensImpactoComponent;
  let fixture: ComponentFixture<ItensImpactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensImpactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensImpactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
