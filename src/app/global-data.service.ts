import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {


  loginStatus: boolean = false;

  constructor() { }

  setGlobalVariable(newValue: boolean): void {
    this.loginStatus = newValue;
  }

}
