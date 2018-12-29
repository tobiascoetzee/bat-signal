import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { VillainData } from './villain-data.model';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<VillainData[]>();
  dataLoadFailed = new Subject<boolean>();
  currentVillains: VillainData[];

  constructor(private http: Http) {}

  onRetrieveData(name = '') {
    this.dataLoadFailed.next(false);

    this.http
      .get('https://api.bat-signal.net/villains/' + name)
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        data => {
          console.log(data.villains);
          this.currentVillains = data.villains;
          this.dataLoaded.next(this.currentVillains);
        },
        error => {
          console.error(error);
          this.currentVillains = null;
          this.dataLoadFailed.next(true);
          this.dataLoaded.next(null);
        }
      );
  }

  getVillainFromIndex(index: number) {
    return this.currentVillains[index];
  }
}
