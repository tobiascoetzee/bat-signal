import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

import { VillainData, VillainList } from './villain-data.model';
import { AuthService } from '../user/auth.service';

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

  getVillainFromIndex(index: number) {
    return this.currentVillains[index];
  }

  onDeleteData(name: string) {
    this.dataLoadFailed.next(false);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error(err);
        return;
      }

      this.http
        .delete('https://api.bat-signal.net/villains/' + name, {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken()
          })
        })
        .subscribe(
          data => {
            this.onRetrieveData();
          },
          error => {
            console.error(error);
            this.dataLoadFailed.next(true);
          }
        );
    });
  }

  onInsertData(data: VillainData) {
    this.dataLoadFailed.next(false);
    this.dataIsLoading.next(true);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error(err);
        return;
      }

      this.http
        .post('https://api.bat-signal.net/villains/', data, {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken()
          })
        })
        .subscribe(
          result => {
            this.dataLoadFailed.next(false);
            this.dataIsLoading.next(false);
            this.onRetrieveData();
          },
          error => {
            console.error(error);
            this.dataIsLoading.next(false);
            this.dataLoadFailed.next(true);
          }
        );
    });
  }

  onUpdateData(data: VillainData) {
    this.dataLoadFailed.next(false);
    this.dataIsLoading.next(true);

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error(err);
        return;
      }

      this.http
        .put('https://api.bat-signal.net/villains/' + data.name, data, {
          headers: new HttpHeaders({
            Authorization: session.getIdToken().getJwtToken()
          })
        })
        .subscribe(
          result => {
            this.dataLoadFailed.next(false);
            this.dataIsLoading.next(false);
            this.onRetrieveData();
          },
          error => {
            this.dataIsLoading.next(false);
            this.dataLoadFailed.next(true);
          }
        );
    });
  }
}
