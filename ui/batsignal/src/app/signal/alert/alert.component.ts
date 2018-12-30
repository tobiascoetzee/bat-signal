import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VillainService } from '../villain.service';
import { VillainData } from '../villain-data.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  villainData: VillainData[];
  alertForm: FormGroup;
  alertSent = false;
  alertReference = '234-sds-232-dsd-233d';

  constructor(private villainService: VillainService) {}

  ngOnInit() {
    this.villainService.dataLoaded.subscribe((data: VillainData[]) => {
      this.villainData = data;
      this.initForm();
    });

    this.villainService.onRetrieveData();
  }

  private initForm() {
    this.alertSent = false;

    this.alertForm = new FormGroup({
      name: new FormControl('', Validators.required),
      villain: new FormControl('', Validators.required),
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
