import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private ngZone: NgZone, private router: Router, private dataService: GlobalDataService) {}

  ngOnInit() {
    if( sessionStorage.getItem('ID:') == "x") {
      this.loggedIn = false;
      console.log(sessionStorage.getItem('ID:'));
    // @ts-ignore
      google.accounts.id.initialize({
        client_id: "315207043943-lml7kgh8vurfmn2mv13h8ihn0b066bf9.apps.googleusercontent.com",
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
    
        });
        // @ts-ignore
        google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("google-button"),
          { theme: "outline", size: "large", width: "100%" }
        );
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      
      }  
      else {
        this.loggedIn = true;
        this.dataService.loginStatus = true;
      }
        
  }

  googlePacket: any;

  handleCredentialResponse(response: any) {
      this.googlePacket = ((this.parseJwt(response.credential)));

      console.log("ID: " + this.googlePacket.sub);
      console.log('Given Name: ' + this.googlePacket.name);
      console.log("Image URL: " + this.googlePacket.picture);
      console.log("Email: " + this.googlePacket.email);

      sessionStorage.setItem('ID:', this.googlePacket.sub );
      sessionStorage.setItem('Name:', this.googlePacket.name );
      sessionStorage.setItem('Picture:', this.googlePacket.picture );
      this.loggedIn = true;
      this.dataService.loginStatus = true;
      this.navigate();
    }


  parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
  };


  logout(): void {
    sessionStorage.setItem('ID:', "x" );
    sessionStorage.setItem('Name:', "" );
    sessionStorage.setItem('Picture:', "" );
    this.loggedIn = false;
    this.ngOnInit();
  }

  navigate() {
    this.ngZone.run(() => {
      // Perform navigation or state changes here
      this.router.navigate(['/tutorial']);
    });
  }
}


//   ngOnInit() {
//     if (sessionStorage.getItem('ID:') == 'x') {
//       this.loggedIn = false;
//       console.log(sessionStorage.getItem('ID:'));
//       // @ts-ignore
//       google.accounts.id.initialize({
//         client_id: "315207043943-lml7kgh8vurfmn2mv13h8ihn0b066bf9.apps.googleusercontent.com",
//         callback: this.handleCredentialResponse.bind(this),
//         auto_select: false,
//         cancel_on_tap_outside: true,
//       });
//       // @ts-ignore
//       google.accounts.id.renderButton(
//         // @ts-ignore
//         document.getElementById('google-button'),
//         { theme: 'outline', size: 'large', width: '100%' }
//       );
//       // @ts-ignore
//       google.accounts.id.prompt((notification: PromptMomentNotification) => {});
//     } else {
//       this.loggedIn = false;
//     }
//   }

//   handleCredentialResponse(response: any) {
//     this.googlePacket = this.parseJwt(response.credential);

//     console.log('ID: ' + this.googlePacket.sub);
//     console.log('Given Name: ' + this.googlePacket.name);
//     console.log('Image URL: ' + this.googlePacket.picture);
//     console.log('Email: ' + this.googlePacket.email);

//     sessionStorage.setItem('ID:', this.googlePacket.sub);
//     sessionStorage.setItem('Name:', this.googlePacket.name);
//     sessionStorage.setItem('Picture:', this.googlePacket.picture);
//     this.loggedIn = true;
//   }

//   parseJwt(token: any) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
//   }

//   logout(): void {
//     sessionStorage.setItem('ID:', 'x');
//     sessionStorage.setItem('Name:', '');
//     sessionStorage.setItem('Picture:', '');
//     this.loggedIn = false;
//     this.ngOnInit();
//   }
// }