import { Component, OnInit, ViewChild } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {UserService} from '../../Services/user.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {ViewTaskService} from '../../Services/view-task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/Services/notifier.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // user id
  private id = null;

  // holds a form that is being edited
  public taskForm = {
    id: null,
    title: null,
    dueDate: null,
    status: null,
    created_by: null
  };
  // holds the columns that will be displayed in the table
  public displayedColumns: string[] = ['id', 'title', 'status', 'view', 'delete'];
  // holds the table data
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private Jarwis: JarwisService,
    private User: UserService,
    private Task: ViewTaskService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private Notifier: NotifierService,
    private router: Router) {
     }

  ngOnInit() {
    if (this.User.isIdValid()) {
      this.router.navigateByUrl('login');
    }
    this.spinner.show();
    this.id = this.User.getId();
    // get all tasks for logged in user
    this.Jarwis.getTask(this.id).subscribe(
      data => this.handleResponse(data, 'tasks'),
      error => this.handleError(error)
    );
    //
  }
  viewTask(task) {
    this.Task.changeViewId(task);
    this.taskForm.id = task.id;
    this.taskForm.title = task.title;
    this.taskForm.status = task.status;
  }
  /**
   * handles response from multiple functions which return data response
   *
   * @param {*} data
   * @param {*} message
   * @memberof TaskComponent
   */
  handleResponse(data, message) {

    switch (message) {
      case 'tasks':
        // set tasks result data to table
        this.dataSource =  new MatTableDataSource<any>(data.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        break;
      case 'update':
        //
        this.Notifier.showNotification('success', data.message);
        location.reload();
        break;
      case 'delete':
      this.Notifier.showNotification('success', data.message);
      location.reload();
      break;
      default:
        this.Notifier.showNotification('error', 'Error');
        break;
    }
    this.spinner.hide();
  }
  handleError(data) {
    this.Notifier.showNotification('error', data.error.error);
    this.spinner.hide();
  }

  /**
   * delete a task
   * @param task - task to be deleted
   */
  delete(taskId) {
    this.Jarwis.deleteTask(taskId).subscribe(
      data => this.handleResponse(data, 'delete'),
      error => this.handleError(error)
    );
  }
  applyFilter(filterValue: string) {
    // if filter value is null, replace will 'all'
    if (filterValue === '') {
      filterValue = 'all';
    }
    // filter tasks with provided string text
    this.Jarwis.filterTasks(this.id, filterValue).subscribe(
      data => this.handleResponse(data, 'tasks'),
      error => this.handleError(error)
    );
  }

  /**
   * @param content open modal
   */
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }
  /**
   * update a task
   */
  onSubmit() {
    this.spinner.show();
    this.taskForm.created_by = this.User.getId;
    this.Jarwis.updateTask(this.taskForm).subscribe(
      data => this.handleResponse(data, 'update'),
      error => this.handleError(error)
    );
  }
}
