import { Component, inject } from '@angular/core';

// Services

import { ToastService } from '../../services/toast-service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast-padrao',
  imports: [
    NgbToast
  ],
  templateUrl: './toast-padrao.html',
  styleUrl: './toast-padrao.css',
})

export class ToastPadrao {
  readonly _toastService = inject(ToastService);
}
