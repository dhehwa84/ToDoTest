import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public form = {
    _method: 'PUT',
    id: null,
    email: null,
    name: null,
    surname: null,
    password: null,
    imageUrl: null
  };
  public image: File = null;
  public error = null;
  public success = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private User: UserService,
    private http: HttpClient) { }

  onSubmit() {
    this.Jarwis.updateUser(this.form, this.form.id).subscribe(
      data => this.handleSaveResponse(data),
      error => this.handleSaveResponse(error)
    );
  }
  ngOnInit() {
    this.form.id = this.User.getId();
    this.User.nameValue.subscribe(value => this.form.name = value);
    this.Jarwis.getUser(this.form.id).subscribe(
      data => this.handleGetResponse(data),
      error => this.handleError(error)
    );
  }
  handleGetResponse(data) {
    this.form.email = data.email;
    this.form.name = data.name;
    this.form.surname = data.surname;
    this.form.imageUrl = data.baseUrl + data.image;
    this.User.changeLoggedInName(data.name);
  }
  handleSaveResponse(data) {
    this.handleError(data);
  }

  handleError(error) {
    this.error = error.response;
    if (error.response === 'success') {
      this.User.changeLoggedInName(this.form.name);
    }
  }
  // image upload
  onFileSelected(event) {
    this.image = event.target.files[0] as File;
    // change image
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      this.form.imageUrl = evt.target.result;
    };
    reader.readAsDataURL(this.image);
    this.onUpload();
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.image);
    this.Jarwis.setImage(fd, this.form.id).subscribe(
      data => this.form.imageUrl = data.url,
      error => this.handleError(error)
    );
  }


}
