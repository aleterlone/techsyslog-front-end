import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastPadrao } from './toast-padrao';

describe('ToastPadrao', () => {
  let component: ToastPadrao;
  let fixture: ComponentFixture<ToastPadrao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastPadrao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastPadrao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
