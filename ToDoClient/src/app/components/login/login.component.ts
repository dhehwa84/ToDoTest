import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Route, Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import {UserService} from '../../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/Services/notifier.service';

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
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
    private User: UserService,
    private spinner: NgxSpinnerService,
    private Notifier: NotifierService) {
  }

  // submit login form
  onSubmit() {
    this.spinner.show();
    this.Jarwis.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    // store user details to storage
    this.User.setId(data.id);
    this.User.setName(data.user);
    this.User.changeLoggedInName(data.user);
    this.User.changethumbnailUrl(data.baseUrl + data.thumbnail);
    this.User.setThumbnailUrl(data.baseUrl + data.thumbnail);
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/tasks');
  }
  handleError(error) {
    this.Notifier.showNotification('error', error.error.error);
    this.spinner.hide();
  }
  ngOnInit() {

  }

}
