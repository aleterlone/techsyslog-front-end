import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  obter(chave: string): string | null | undefined {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem(chave);
    }

    return null;
  };
}
