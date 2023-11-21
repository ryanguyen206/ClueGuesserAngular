import { Component, OnInit, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  isLoggedIn: boolean = false;

  constructor(private ngZone: NgZone, private router: Router, private dataService: GlobalDataService) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  ngOnInit() {

    this.dataService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    /* if( sessionStorage.getItem('ID:') == "x" || this.isLoggedIn === false) {
      this.isLoggedIn = false;
      this.navigate();
    } */

    console.log(this.isLoggedIn)
  }


  logout(): void {
    sessionStorage.setItem('ID:', "x" );
    sessionStorage.setItem('Name:', "" );
    sessionStorage.setItem('Picture:', "" );
    this.dataService.setLoginStatus(false);
    this.navigate();
  }



  navigate() {
    this.ngZone.run(() => {
      this.router.navigate(['/login']);
    });
  }


}
