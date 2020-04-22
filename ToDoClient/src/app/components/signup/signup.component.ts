import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import { NotifierService } from 'src/app/Services/notifier.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // sign up form with default images for profile
  public form = {
    name: null,
    surname: null,
    email: null,
    image: '/img/fullImage/image.jpg',
    thumbnail: '/img/thumbnail/image.png',
    password: null,
    password_confirmation: null
  };
  constructor(
    private Jarwis: JarwisService,
    private router: Router,
    private Notifier: NotifierService,
    private spinner: NgxSpinnerService) { }

    //  submit form for sign up
  onSubmit() {
    this.spinner.show();
    this.Jarwis.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.spinner.hide();
    this.Notifier.showNotification('success', 'sign up complete! now login with your username and password.');
    this.router.navigateByUrl('/login');
  }

  handleError(error) {
    this.Notifier.showNotification('error', 'Error, please check your details and try again');
    this.spinner.hide();
  }
  ngOnInit() {
  }

}
