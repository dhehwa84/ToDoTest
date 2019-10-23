import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    surname: null,
    email: null,
    image: '/img/image.jpg',
    password: null,
    password_confirmation: null
  };
  public error = null;
  public message = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService) { }

  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    // this.Token.handle(data.access_token);
    // this.Auth.changeAuthStatus(false);
    this.message = 'sign up complete! now login with your username and password.';
  }

  handleError(error) {
    this.error = error.error.error;
  }
  ngOnInit() {
  }

}
