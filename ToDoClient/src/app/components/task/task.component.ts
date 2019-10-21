import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  private id = null;
  private error = null;
  private tasksTable = null;
  private displayedColumns: string[] = ['id', 'title', 'status'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private User: UserService) { }

  ngOnInit() {
    this.onLoad();
  }
  onLoad() {
    this.id = this.User.getId();
    this.Jarwis.getTask(this.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    // this.Token.handle(data.access_token);
    this.tasksTable = new BehaviorSubject(data);
    this.dataSource = this.tasksTable;
    console.log(data);
    // this.router.navigateByUrl('/tasks');
  }

  handleError(error) {
    this.error = error.error.error;
  }
}
