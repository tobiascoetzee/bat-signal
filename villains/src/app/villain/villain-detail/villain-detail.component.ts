import { Component, OnInit } from '@angular/core';
import { VillainData } from '../villain-data.model';
import { VillainService } from '../villain.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {
  villainData: VillainData;
  id: number;

  constructor(
    private villainService: VillainService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.villainData = this.villainService.getVillainFromIndex(this.id);
    });
  }

  onEditVillain() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
