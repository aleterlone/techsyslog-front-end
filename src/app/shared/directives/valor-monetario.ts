import { AfterViewInit, Directive, ElementRef, HostListener, inject, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

// Shared

import { REGEX } from '../constants';

@Directive({
  selector: '[appValorMonetario]',
})

export class ValorMonetarioDirective implements AfterViewInit {
  private readonly _elementRef = inject(ElementRef);

  constructor(
    @Optional() private _ngControl: NgControl
  ) { }

  ngAfterViewInit() {
    this._elementRef.nativeElement.style.textAlign = "right";
  }

  @HostListener("keypress", ["$event"])
  onKeyPress(event: KeyboardEvent) {
    let valorAtual: string = "";

    if (this._ngControl != null && this._ngControl.value != null) {
      valorAtual = this._ngControl.value;
    } else {
      valorAtual = this._elementRef.nativeElement.value;
    }

    valorAtual = valorAtual + event.key;

    if (!REGEX.NUMERO_COM_SINAL.test(valorAtual)) {
      event.preventDefault();
    }
  }
}
