import { Component, OnInit, Input } from '@angular/core';
import { VillainData } from '../../villain-data.model';

@Component({
  selector: 'app-villain-item',
  templateUrl: './villain-item.component.html',
  styleUrls: ['./villain-item.component.css']
})
export class VillainItemComponent implements OnInit {
  @Input() villainData: VillainData;
  @Input() index: number;

  constructor() {}

  ngOnInit() {}
}
