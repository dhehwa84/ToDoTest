import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Route, Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };
  public error = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private User: UserService) {
  }

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    console.log(data);
    this.User.setId(data.id);
    this.User.setName(data.name);
    this.User.changeLoggedInName(data.user);
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/tasks');
  }
  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {

  }

}
