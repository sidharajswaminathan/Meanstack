import { Component, OnInit } from '@angular/core';
import {AjaxService} from '../ajax.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: any = {};
  alertData: any = {};
  routerValues: any = {'url': ''};
  loggedinData: any;
  constructor(private ajaxservice: AjaxService, private router: Router) { }

  ngOnInit() {
  }
  /*Method to register user details*/
  loginUser() {
    console.log(this.userForm);
    this.ajaxservice.postMethod('login', this.userForm).subscribe((data: any) => {
      console.log(data);
      this.loggedinData = data;
      if (this.loggedinData.data && this.loggedinData.data != null) {
        this.userForm = {};
        this.alertData.type = 'success';
      } else {
        this.alertData.type = 'danger';
      }
      this.alertData.message = this.loggedinData.message;
      this.alertData.show = true;
    });
  }
  cancelRegistration() {
    this.userForm = {};
    console.log(this.userForm);
  }
}
