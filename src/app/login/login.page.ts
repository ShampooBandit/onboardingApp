import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    if(this.username != "" && this.password != "")
    {
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.username
        }
      }
      this.router.navigate(['/tabs/tab1'], navigationExtras);
    }
  }
}
