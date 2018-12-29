import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';
import { VillainData } from '../villain-data.model';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit {
  villainData: VillainData[];
  didFail = false;
  constructor(private villainService: VillainService) {}

  ngOnInit() {
    this.villainService.dataLoaded.subscribe((data: VillainData[]) => {
      console.log('In component' + data);
      this.villainData = data;
    });
    this.villainService.dataLoadFailed.subscribe(
      (didFail: boolean) => (this.didFail = didFail)
    );

    this.villainService.onRetrieveData();
  }
}
