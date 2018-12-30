import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VillainService } from '../villain.service';
import { VillainData } from '../villain-data.model';
import { SignalService } from '../signal.service';
import { AlertReferenceData } from '../alert-reference-data.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  villainData: VillainData[];
  alertForm: FormGroup;
  alertSent = false;
  alertReference: string;

  constructor(private villainService: VillainService, private signalService: SignalService) {}

  ngOnInit() {
    this.initForm();

    this.villainService.dataLoaded.subscribe((data: VillainData[]) => {
      this.villainData = data;
    });

    this.signalService.alertReferenceReturned.subscribe((data: AlertReferenceData) => {
      this.alertReference = data.referenceId;
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
    this.signalService.onInsertData(this.alertForm.value);
    this.alertSent = true;
  }

  onCancel() {
    this.initForm();
  }

  onNewAlert() {
    this.initForm();
  }
}
