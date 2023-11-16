import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {


  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  loginStatus$: Observable<boolean> = this.loginStatusSubject.asObservable();

  setLoginStatus(status: boolean): void {
    this.loginStatusSubject.next(status);
  }

}
