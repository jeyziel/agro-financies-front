import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustoCategoriasComponent } from './custo-categorias.component';

describe('CustoCategoriasComponent', () => {
  let component: CustoCategoriasComponent;
  let fixture: ComponentFixture<CustoCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustoCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
