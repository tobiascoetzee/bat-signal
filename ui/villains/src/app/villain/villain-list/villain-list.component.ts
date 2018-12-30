import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';
import { VillainData } from '../villain-data.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit {
  villainData: VillainData[];
  didFail = false;
  constructor(
    private villainService: VillainService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.villainService.dataLoaded.subscribe((data: VillainData[]) => {
      this.villainData = data;
    });
    this.villainService.dataLoadFailed.subscribe(
      (didFail: boolean) => (this.didFail = didFail)
    );

    this.villainService.onRetrieveData();
  }

  onNewVillain() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onRefresh() {
    this.villainService.onRetrieveData();
    this.router.navigate(['/villains']);
  }
}
