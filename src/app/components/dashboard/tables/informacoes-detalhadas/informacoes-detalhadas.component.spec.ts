import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesDetalhadasComponent } from './informacoes-detalhadas.component';

describe('InformacoesDetalhadasComponent', () => {
  let component: InformacoesDetalhadasComponent;
  let fixture: ComponentFixture<InformacoesDetalhadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacoesDetalhadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesDetalhadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
