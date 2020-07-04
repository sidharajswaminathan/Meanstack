import { Component, OnInit } from '@angular/core';
import {AjaxService} from '../ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: any = {};
  alertData: any = {};
  routerValues: any = {'url': ''};
  constructor(private ajaxservice: AjaxService, private router: Router) { }

  ngOnInit() {
    this.alertData.show = false;
    this.alertData.message = '';
  }

  /*Method to register user details*/
  registerUser() {
    console.log(this.userForm);
    /*if(this.userForm.password === this.userForm.confirmpassword)*/
    this.ajaxservice.postMethod('signup', this.userForm).subscribe((data: any) => {
      console.log(data);
    });
  }
  cancelRegistration() {
    this.userForm = {};
    console.log(this.userForm);
  }

  onSubmit() {
    /*alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));*/
    if (this.userForm.password === this.userForm.confirmpassword) {
      this.ajaxservice.postMethod('signup', this.userForm).subscribe((data: any) => {
        console.log(data);
        this.userForm = {};
        this.alertData.message = 'User Details has been registered successfully!';
        this.alertData.show = true;
        this.alertData.type = 'success';
        this.routerValues.url = ['/loginpage'];
        setTimeout(() => {this.alertData.show = false; this.router.navigate(this.routerValues.url); } , 5000);
      });
    }
  }

}
