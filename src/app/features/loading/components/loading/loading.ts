import { Component, inject, signal } from '@angular/core';

// Features

import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})

export class Loading {
  private readonly _loadingService = inject(LoadingService);

  exibir = signal<boolean>(false);

  ngOnInit() {
    this.exibir = this._loadingService.exibir;
  }
}
