import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('usrForm') form: NgForm;
  confirmUser = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    const usrName = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.signUp(usrName, email, password);
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm(formValue: { usrName: string; validationCode: string }) {
    this.authService.confirmUser(formValue.usrName, formValue.validationCode);
  }
}
