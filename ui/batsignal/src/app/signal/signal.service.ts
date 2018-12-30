import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../user/auth.service';
import { SignalData } from './signal-data.model';
import { Subject } from 'rxjs';
import { AlertReferenceData } from './alert-reference-data.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  alertReferenceReturned = new Subject<AlertReferenceData>();
  constructor(private http: Http, private authService: AuthService) { }

  onInsertData(data: SignalData) {

    this.authService.getAuthenticatedUser().getSession((err, session) => {
      if (err) {
        console.error(err);
        return;
      }

      this.http
        .post('https://api.bat-signal.net/alerts/', data, {
          headers: new Headers({
            Authorization: session.getIdToken().getJwtToken()
          })
        })
        .pipe(map((response: Response) => response.json()))
        .subscribe(
          result => {
            console.log(result);
            this.alertReferenceReturned.next(result);
          },
          error => {
            console.error(error);
          }
        );
    });
  }
}
