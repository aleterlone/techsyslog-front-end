import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCadastrar } from './pedido-cadastrar';

describe('PedidoCadastrar', () => {
  let component: PedidoCadastrar;
  let fixture: ComponentFixture<PedidoCadastrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoCadastrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoCadastrar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
