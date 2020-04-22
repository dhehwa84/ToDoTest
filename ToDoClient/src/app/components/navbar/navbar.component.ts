import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../Services/token.service';
import {UserService} from '../../Services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'src/app/Services/notifier.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;
  public name;
  public thumbnailUrl = null;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private User: UserService,
    private spinner: NgxSpinnerService,
    private Notifier: NotifierService) {}
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.User.nameValue.subscribe(value => this.name = value);
    this.User.thumbnailUrl.subscribe(value => this.thumbnailUrl = value);
    this.thumbnailUrl = this.User.getThumbnailUrl();
    this.name = this.User.getName();
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.Notifier.showNotification('error', 'You have been logged out');
    this.router.navigateByUrl('/login');
  }

}
