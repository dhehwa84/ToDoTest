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

  signup(data) {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }
  login(data) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }
  newTask(data) {
    return this.http.post(`${this.baseUrl}/task`, data);
  }
  getTask(data) {
    return this.http.get(`${this.baseUrl}/tasks/${data}`);
  }
  getUser(data) {
    return this.http.get(`${this.baseUrl}/me/${data}`);
  }
  updateUser(data, id) {
    return this.http.post(`${this.baseUrl}/update/${id}`, data);
  }
  setImage(data, id) {
    return this.http.post(`${this.baseUrl}/setimage/${id}`, data);
  }
  updateTaskStatus(data, id) {
    return this.http.post(`${this.baseUrl}/task/${id}`, data);
  }
  deleteTask(id) {
    return this.http.delete(`${this.baseUrl}/task/${id}`);
  }
}
