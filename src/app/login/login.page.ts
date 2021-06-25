import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
  }

  login(){
    if(this.username != "" && this.password != "")
    {
      this.http.login(this.username, this.password);

      this.router.navigate(['/tabs/tab1']);
    }
  }
}
