import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../user/auth.service';
import { VillainData } from './villain-data.model';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<VillainData[]>();
  dataLoadFailed = new Subject<boolean>();
  currentVillains: VillainData[];

  constructor(private http: Http, private authService: AuthService) {}

  onRetrieveData(name = '') {
    this.dataLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error(err);
        return;
      }

      this.http
        .get('https://api.bat-signal.net/villains/' + name, {
          headers: new Headers({
            Authorization: session.getIdToken().getJwtToken()
          })
        })
        .pipe(map((response: Response) => response.json()))
        .subscribe(
          data => {
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
    });
  }
}
