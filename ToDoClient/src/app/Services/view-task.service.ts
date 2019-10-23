import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewTaskService {

  public currTask  = new BehaviorSubject <any>(null);
  viewId = this.currTask.asObservable();
  changeViewId(value: any) {
    this.currTask.next(value);
    console.log('view Id changed to: ' + value);
  }
  constructor() { }
}
