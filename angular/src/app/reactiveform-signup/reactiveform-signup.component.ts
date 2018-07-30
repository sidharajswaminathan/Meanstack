import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AjaxService} from "../ajax.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reactiveform-signup',
  templateUrl: './reactiveform-signup.component.html',
  styleUrls: ['./reactiveform-signup.component.css']
})
export class ReactiveformSignupComponent implements OnInit {
  userForm: any = {};
  alertData: any = {};
  routerValues: any = {'url': ''};
  registerForm : FormGroup;
  submitted: boolean = false;
  constructor(private formbuilder: FormBuilder,private ajaxservice: AjaxService, private router: Router) { }

  ngOnInit() {
    this.alertData.show = false;
    this.alertData.message = '';
    this.registerForm = this.formbuilder.group({
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6), this.passwordValidator]],
      confirmPassword: ['',[Validators.required, Validators.minLength(6), this.confirmpasswordValidator]],
      email: ['',[Validators.required, Validators.email]],
    });
  }

  /*Method to watch changes in password fields*/
  passwordValidator(passwordformRef: FormControl){
    const errors={unmatched:{test:true}};
    if(passwordformRef.parent) {
      const passwordRef = passwordformRef.parent.controls['password'];
      const confirmPasswordRef = passwordformRef.parent.controls['confirmPassword'];
      if (passwordformRef.value != passwordformRef.parent.value["password"]) {
        confirmPasswordRef.setErrors(errors);
      } else {
        confirmPasswordRef.setErrors(null);
      }
    }
  }
  /*Method to watch changes in password fields*/
  confirmpasswordValidator(formRef: FormControl) {
    const errors={unmatched:{test:true}};
    if(formRef.parent) {
      const passwordRef = formRef.parent.controls['password'];
      const confirmPasswordRef = formRef.parent.controls['confirmPassword'];
      if (formRef.value != formRef.parent.value["password"]) {
        return errors;
      } else {
       return null;
      }
    }
  }


  // convenience getter for easy access to form fields
  get f(){ return this.registerForm.controls; }


  cancelRegistration() {
    this.userForm = {};
    console.log(this.userForm);
  }


  registerUser(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.ajaxservice.postMethod('signup', this.registerForm.value).subscribe((data: any) => {
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
