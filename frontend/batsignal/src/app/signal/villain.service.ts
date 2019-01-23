import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { AuthService } from '../user/auth.service';
import { VillainData, VillainList } from './villain-data.model';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  dataIsLoading = new BehaviorSubject<boolean>(false);
  dataLoaded = new Subject<VillainData[]>();
  dataLoadFailed = new Subject<boolean>();
  currentVillains: VillainData[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  onRetrieveData(name = '') {
    this.dataLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error(err);
        return;
      }

      this.http
        .get<VillainList>('https://api.bat-signal.net/villains/' + name, {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken()
          })
        })
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
