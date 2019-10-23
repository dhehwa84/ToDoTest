import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public id = new BehaviorSubject <any>(null);
  private name = new BehaviorSubject <any>(null);
  idValue = this.id.asObservable();
  nameValue = this.name.asObservable();
  changeLoggedInId(value: any) {
    this.id.next(value);
    console.log('id changed to: ' + value);
  }
  changeLoggedInName(value: any) {
    this.name.next(value);
  }
  setId(id) {
    localStorage.setItem('id', id);
  }
  setName(name) {
    localStorage.setItem('name', name);
  }
  getId() {
    return localStorage.getItem('id');
  }
  getName() {
    return localStorage.getItem('name');
  }
  removeId() {
    localStorage.removeItem('id');
  }
  removeName() {
    localStorage.removeItem('name');
  }
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
