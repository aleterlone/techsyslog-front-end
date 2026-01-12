import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListar } from './usuario-listar';

describe('UsuarioListar', () => {
  let component: UsuarioListar;
  let fixture: ComponentFixture<UsuarioListar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioListar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
