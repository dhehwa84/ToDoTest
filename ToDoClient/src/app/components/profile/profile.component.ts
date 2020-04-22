import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../Services/jarwis.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { NotifierService } from 'src/app/Services/notifier.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // user data object form
  public form = {
    _method: 'PUT',
    id: null,
    email: null,
    name: null,
    surname: null,
    password: null,
    imageUrl: null
  };
  // profile image
  public image: File = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private User: UserService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private Notifier: NotifierService) { }

  ngOnInit() {
    this.spinner.show();
    // get current user information
    this.form.id = this.User.getId();
    this.User.nameValue.subscribe(value => this.form.name = value);
    this.Jarwis.getUser(this.form.id).subscribe(
      data => this.handleGetResponse(data),
      error => this.handleError(error)
    );
  }
    /**
     * Update a user function
     */
  onSubmit() {
    this.spinner.show();
    this.Jarwis.updateUser(this.form, this.form.id).subscribe(
      data => this.handleSaveResponse(data),
      error => this.handleSaveResponse(error)
    );
  }
  /**
   * handle user data response
   *
   * @param {*} data - the json data object response
   * @memberof ProfileComponent
   */
  handleGetResponse(data) {
    this.form.email = data.email;
    this.form.name = data.name;
    this.form.surname = data.surname;
    this.form.imageUrl = data.baseUrl + data.image;
    this.User.changeLoggedInName(data.name);
    // hide the spinner
    this.spinner.hide();
  }
  handleSaveResponse(data) {
      this.User.changeLoggedInName(this.form.name);
      this.Notifier.showNotification('success', 'Changes saved successfully');
      this.spinner.hide();
  }
  handleImageUploadResponse(data) {
    this.image = data.image;
    this.User.changethumbnailUrl(data.baseUrl + data.thumbnail);
    this.User.setThumbnailUrl(data.baseUrl + data.thumbnail);
    this.Notifier.showNotification('success', 'Profile Image changes successfully');
    this.spinner.hide();
  }
  handleError(error) {
    this.Notifier.showNotification('error', error.error.error);
    this.spinner.hide();
  }
  // image upload
  onFileSelected(event) {
    this.spinner.show();
    this.image = event.target.files[0] as File;
    // change image
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      this.form.imageUrl = evt.target.result;
    };
    reader.readAsDataURL(this.image);
    this.onUpload();
  }
  // upload profile image and get tumbnail
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.image);
    this.Jarwis.setImage(fd, this.form.id).subscribe(
      data => this.handleImageUploadResponse(data),
      error => this.handleError(error)
    );
  }


}
