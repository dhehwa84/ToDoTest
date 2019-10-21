import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../Services/token.service';
import {UserService} from '../../Services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;
  public name;
  constructor(
    private Auth: AuthService,
    private router: Router,
    private Token: TokenService,
    private User: UserService) {}
  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.User.nameValue.subscribe(value => this.name = value);
    this.name = this.User.getName();
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigateByUrl('/login');
  }

}
