import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoriosComponent } from './inventorios.component';

describe('InventoriosComponent', () => {
  let component: InventoriosComponent;
  let fixture: ComponentFixture<InventoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
