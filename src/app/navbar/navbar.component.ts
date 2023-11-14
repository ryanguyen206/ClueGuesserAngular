import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean = false;

  constructor(private router: Router, private dataService: GlobalDataService) {
    this.login = this.dataService.loginStatus;
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  ngOnInit(): void {}
}