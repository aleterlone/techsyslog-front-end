import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoMovimentarModal } from './pedido-movimentar-modal';

describe('PedidoMovimentarModal', () => {
  let component: PedidoMovimentarModal;
  let fixture: ComponentFixture<PedidoMovimentarModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoMovimentarModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoMovimentarModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
