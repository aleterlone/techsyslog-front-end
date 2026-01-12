import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCadastrar } from './usuario-cadastrar';

describe('UsuarioCadastrar', () => {
  let component: UsuarioCadastrar;
  let fixture: ComponentFixture<UsuarioCadastrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCadastrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCadastrar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
