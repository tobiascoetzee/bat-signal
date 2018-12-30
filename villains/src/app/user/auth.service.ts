import { Subject, Observable } from 'rxjs';

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Injectable } from '@angular/core';

const POOL_DATA = {
  UserPoolId: 'us-east-2_Mi8bdKn5I',
  ClientId: '1bgtqt84ej1c41vj5bppts3gvu'
};

const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthService {
  authStatusChanged = new Subject<boolean>();
  registeredUser: CognitoUser;

  constructor(private router: Router) {}

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create(observer => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }

  signIn(username: string, password: string): void {
    const authData = {
      Username: username,
      Password: password
    };

    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.authStatusChanged.next(true);
      },
      onFailure(err) {
        that.authStatusChanged.next(false);
        console.error(err);
      }
    });
    return;
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }

  initAuth() {
    this.isAuthenticated().subscribe(auth => this.authStatusChanged.next(auth));
  }

  signUp(username: string, email: string, password: string): void {
    const user: User = {
      username: username,
      email: email,
      password: password
    };

    const attrList: CognitoUserAttribute[] = [];

    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };

    attrList.push(new CognitoUserAttribute(emailAttribute));

    userPool.signUp(
      user.username,
      user.password,
      attrList,
      null,
      (err, result) => {
        if (err) {
          return;
        }
        this.registeredUser = result.user;
      }
    );

    return;
  }

  confirmUser(username: string, code: string) {
    const userData = {
      Username: username,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        return;
      }
      this.router.navigate(['/']);
    });
  }

}
