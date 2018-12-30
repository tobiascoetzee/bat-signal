import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alertForm: FormGroup;
  alertSent = false;
  alertReference = '234-sds-232-dsd-233d';

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.alertSent = false;

    this.alertForm = new FormGroup({
      name: new FormControl('', Validators.required),
      villain: new FormControl('Choose...'),
      description: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  onSubmit() {
    console.log(this.alertForm.value);
    this.alertSent = true;
  }

  onCancel() {
    this.initForm();
  }

  onNewAlert() {
    this.initForm();
  }
}
