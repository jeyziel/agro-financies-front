import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasProdutosComponent } from './categorias-produtos.component';

describe('CategoriasProdutosComponent', () => {
  let component: CategoriasProdutosComponent;
  let fixture: ComponentFixture<CategoriasProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasProdutosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
