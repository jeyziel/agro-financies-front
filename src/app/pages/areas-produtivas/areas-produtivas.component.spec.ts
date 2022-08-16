import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasProdutivasComponent } from './areas-produtivas.component';

describe('AreasProdutivasComponent', () => {
  let component: AreasProdutivasComponent;
  let fixture: ComponentFixture<AreasProdutivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasProdutivasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasProdutivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
