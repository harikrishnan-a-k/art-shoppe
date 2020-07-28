import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    let email:string=form.value.email;
    let password:string=form.value.password;
    let name:string=form.value.name;
    let address:string=form.value.address;
    let userType:string=form.value.userType;
    this.authService.createUser({email,password,name,address,userType});
  }
  ngOnInit(): void {
  }

}
