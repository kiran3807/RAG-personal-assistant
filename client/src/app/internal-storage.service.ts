import { Injectable } from '@angular/core';


export enum Details {
  ADDRESS = "address"
}

@Injectable({
  providedIn: 'root'
})
export class InternalStorageService {

  constructor() { 
  }

  get(key: string) {
    return window.localStorage.getItem(key);
  }

  set(key: string, value: any) {
    window.localStorage.setItem(key, value);
  }
}
