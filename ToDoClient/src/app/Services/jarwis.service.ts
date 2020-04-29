import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/* this service handles all the http requests
* */
export class JarwisService {

  private baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  /**
   * sign up a user/ register
   *
   * @param {*} data - form data object
   * @returns
   * @memberof JarwisService
   */
  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  /**
   * login request
   *
   * @param {*} data - form data object
   * @returns
   * @memberof JarwisService
   */
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }
  /**
   * creates a new task
   *
   * @param {*} data - form data object
   * @returns
   * @memberof JarwisService
   */
  newTask(data) {
    return this.http.post(`${this.baseUrl}/task`, data);
  }
  /**
   * get tasks for a user
   *
   * @param {*} userId - creator id
   * @returns
   * @memberof JarwisService
   */
  getTask(userId) {
    return this.http.get(`${this.baseUrl}/tasks/${userId}`);
  }
  /**
   * filter tasks for a user
   *
   * @param {*} userId - creator id
   * @param {*} searchText - string
   * @returns
   * @memberof JarwisService
   */
  filterTasks(userId, searchText) {
    return this.http.get(`${this.baseUrl}/filterTasks/${userId}/${searchText}`);
  }
  /**
   * get user details
   *
   * @param {*} id
   * @returns
   * @memberof JarwisService
   */
  getUser(id) {
    return this.http.get(`${this.baseUrl}/me/${id}`);
  }
  /**
   * update user details
   *
   * @param {*} data - form object
   * @param {*} id - user id
   * @returns
   * @memberof JarwisService
   */
  updateUser(data, id) {
    return this.http.post(`${this.baseUrl}/update/${id}`, data);
  }
  /**
   * set user profile image
   *
   * @param {*} data
   * @param {*} id
   * @returns - profile image url and thumbnail url
   * @memberof JarwisService
   */
  setImage(data, id) {
    return this.http.post(`${this.baseUrl}/setimage/${id}`, data);
  }
  /**
   * updates a task
   *
   * @param {*} data - task form data
   * @returns
   * @memberof JarwisService
   */
  updateTask(data) {
    return this.http.post(`${this.baseUrl}/updateTask`, data);
  }
  /**
   * removes a task
   *
   * @param {*} id
   * @returns
   * @memberof JarwisService
   */
  deleteTask(id) {
    return this.http.delete(`${this.baseUrl}/deleteTask/${id}`);
  }
}
