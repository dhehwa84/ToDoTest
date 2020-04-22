import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // define variables to monitor on change
  public id = new BehaviorSubject <any>(null);
  private name = new BehaviorSubject <any>(null);
  private thumbnail = new BehaviorSubject <any>(null);

  // set the variables observable
  idValue = this.id.asObservable();
  nameValue = this.name.asObservable();
  thumbnailUrl = this.thumbnail.asObservable();

  // on change functions
  changeLoggedInId(value: any) {
    this.id.next(value);
  }
  changeLoggedInName(value: any) {
    this.name.next(value);
  }
  changethumbnailUrl(value: any) {
    this.thumbnail.next(value);
  }

  // methods  to set the values in memory
  setThumbnailUrl(thumbnailUrl) {
    localStorage.setItem('thumbnailUrl', thumbnailUrl);
  }
  setId(id) {
    localStorage.setItem('id', id);
  }
  setName(name) {
    localStorage.setItem('name', name);
  }

  // getters
  getId() {
    return localStorage.getItem('id');
  }
  getThumbnailUrl() {
    return localStorage.getItem('thumbnailUrl');
  }
  getName() {
    return localStorage.getItem('name');
  }

  // methods below destroys the set values in memory
  removeId() {
    localStorage.removeItem('id');
  }
  removeName() {
    localStorage.removeItem('name');
  }
  // validates users current session
  isIdValid() {
    const user = this.getId();
    if (user) {
      this.changeLoggedInId(user);
      return true;
    }
    return false;
  }
  constructor() { }
}
