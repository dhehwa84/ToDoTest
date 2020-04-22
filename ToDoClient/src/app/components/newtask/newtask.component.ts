import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/Services/notifier.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {

  // user id
  public id = null;
  // new task form
  public form = {
    title: null,
    dueDate: null,
    status: 'pending',
    created_by: null
  };
  constructor(
    private User: UserService,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private spinner: NgxSpinnerService,
    private Notifier: NotifierService) { }
    // create new task
  onSubmit() {
    this.spinner.show();
    this.form.created_by = this.User.getId();
    this.Jarwis.newTask(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Notifier.showNotification('success', data.message);
    this.spinner.hide();
  }

  handleError(error) {
   this.Notifier.showNotification('error', error.error.error);
   this.spinner.hide();
  }

  ngOnInit() {
    // subscribe to user ID
    this.User.idValue.subscribe(value => this.id = value);
    this.id = this.User.getId();

  }

}
