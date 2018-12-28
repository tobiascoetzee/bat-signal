import { Subject, Observable } from 'rxjs';

export class AuthService {
  authStatusChanged = new Subject<boolean>();
  userLoggedIn = false;

  isAuthenticated(): Observable<boolean> {
    const authenticatedObservable = Observable.create(observer => {
      if (this.userLoggedIn) {
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });

    return authenticatedObservable;
  }

  signIn() {
    this.userLoggedIn = true;
    this.authStatusChanged.next(true);
  }

  logout() {
    this.userLoggedIn = false;
    this.authStatusChanged.next(false);
  }

  initAuth() {
    this.isAuthenticated().subscribe(auth => this.authStatusChanged.next(auth));
  }
}
