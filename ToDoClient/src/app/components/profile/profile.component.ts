import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    surname: null,
    password: null
  }
  constructor() { }

  onSubmit() {
  }
  ngOnInit() {
  }

}
