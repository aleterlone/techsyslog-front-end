import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoListar } from './pedido-listar';

describe('PedidoListar', () => {
  let component: PedidoListar;
  let fixture: ComponentFixture<PedidoListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoListar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
