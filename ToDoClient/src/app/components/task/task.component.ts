import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
import {ViewTaskService} from '../../Services/view-task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  private id = null;
  private error = null;
  private tasksTable = null;
  private displayedColumns: string[] = ['id', 'title', 'status', 'view', 'delete'];
  dataSource: MatTableDataSource<any>;
  private message = null;
  private form = {
    status: null
  };
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private User: UserService,
    private Task: ViewTaskService) { }

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
  viewTask(task) {
    this.Task.changeViewId(task);
    this.router.navigateByUrl('/viewtask');
  }
  handleResponse(data) {
    this.tasksTable = new BehaviorSubject(data);
    this.dataSource = this.tasksTable;
  }

  handleError(error) {
    this.error = error.error.error;
  }
  updateStatus(element, val) {
    this.form.status = val;
    console.log(val);
    this.Jarwis.updateTaskStatus(this.form, element.id).subscribe(
      data => this.message = 'success',
      error => console.log(error.status)
    );
  }
  delete(task) {
    this.Jarwis.deleteTask(task.id).subscribe(
      data => this.message = 'success',
      error => this.message = error.status
    );
  }
}
