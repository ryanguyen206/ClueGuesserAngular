import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from '../global-data.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private ngZone: NgZone, private router: Router, private dataService: GlobalDataService, private http: HttpClient) {}

  ngOnInit() {

    this.dataService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });


    if( sessionStorage.getItem('ID:') == "x") {
      this.isLoggedIn = false;
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
        this.isLoggedIn = true;
        this.dataService.setLoginStatus(true);
   
      }

      console.log(this.dataService.loginStatus$)
 
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
      sessionStorage.setItem('Email:', this.googlePacket.email );
      this.dataService.setLoginStatus(true);
      this.isLoggedIn = true;
      this.checkUsers();
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

  checkUsers(){
    this.http.get<any>('http://localhost:3000/users').subscribe(
        (response) => {
            let isEmailRegistered = false;
            console.log('USERS GET request successful:', response);
            for(let i = 0; i < response.length; i++){
              if(response[i].email == sessionStorage.getItem("Email:")){
                isEmailRegistered = true;
              }
            }
            if(isEmailRegistered == false){

              let newUser = new User(
                sessionStorage.getItem("Name:"),
                sessionStorage.getItem("Email:"),
              );

              this.http.post<any>('http://localhost:3000/users', newUser)
              .subscribe(
                (response) => {
                  // Handle the response from the server here
                  console.log('POST USER request successful:', response);
                },
                (error) => {
                  // Handle any errors here
                  console.error('POST USER request error:', error);
                }
              );
            }
        },
        (error) => {
            console.error('USERS GET request error:', error);
        });

  }
  


  logout(): void {
    sessionStorage.setItem('ID:', "x" );
    sessionStorage.setItem('Name:', "" );
    sessionStorage.setItem('Picture:', "" );
    this.isLoggedIn = false;
    this.dataService.setLoginStatus(false);
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