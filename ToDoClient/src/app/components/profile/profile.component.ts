import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public form = {
    _method: 'PUT',
    id: null,
    email: null,
    name: null,
    surname: null,
    password: null
  };
  public error = null;
  public success = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private User: UserService) { }

  onSubmit() {
    this.Jarwis.updateUser(this.form, this.form.id).subscribe(
      data => this.handleSaveResponse(data),
      error => this.handleSaveResponse(error)
    );
  }
  ngOnInit() {
    this.form.id = this.User.getId();
    this.User.nameValue.subscribe(value => this.form.name = value);
    this.Jarwis.getUser(this.form.id).subscribe(
      data => this.handleGetResponse(data),
      error => this.handleError(error)
    );
  }
  handleGetResponse(data) {
    this.form.email = data.email;
    this.form.name = data.name;
    this.form.surname = data.surname;
    this.User.changeLoggedInName(data.name);
  }
  handleSaveResponse(data) {
    this.handleError(data);
  }

  handleError(error) {
    this.error = error.response;
    if (error.response === 'success') {
      this.User.changeLoggedInName(this.form.name);
    }
  }
  // image upload

}
