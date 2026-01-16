import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LoadingService {
  exibir = signal<boolean>(false);
}
