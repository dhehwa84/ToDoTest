import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss']
})
export class NewtaskComponent implements OnInit {

  public id = null;
  public error = null;
  public form = {
    title: null,
    dueDate: null,
    status: 'pending',
    created_by: this.id
  };
  constructor(
    private User: UserService,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router) { }
  onSubmit() {
    this.Jarwis.newTask(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/tasks');
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
    this.User.idValue.subscribe(value => this.id = value);

  }

}
