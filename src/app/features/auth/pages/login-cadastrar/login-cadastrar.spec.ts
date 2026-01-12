import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCadastrar } from './login-cadastrar';

describe('LoginCadastrar', () => {
  let component: LoginCadastrar;
  let fixture: ComponentFixture<LoginCadastrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCadastrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCadastrar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
