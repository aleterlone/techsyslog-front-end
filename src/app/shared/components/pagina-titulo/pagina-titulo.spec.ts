import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTitulo } from './pagina-titulo';

describe('PaginaTitulo', () => {
  let component: PaginaTitulo;
  let fixture: ComponentFixture<PaginaTitulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaTitulo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaTitulo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
