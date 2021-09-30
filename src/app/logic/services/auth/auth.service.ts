import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Token } from '../../models/token';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<Token> {
    const body = { email: email, password: password };
    return this.http.post<Token>('/login', body).map(this.authSuccess.bind(this));
  }

  public signup(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    const body = { email: email, password: password, firstName: firstName, lastName: lastName };
    return this.http.post('/signup', body);
  }

  public logout(): Observable<any> {
    return new Observable((observer) => {
      this.http.post('/logout', {}).subscribe();
      localStorage.removeItem('token');
      observer.complete();
    });
  }

  public isAuth(): boolean {
    return !!localStorage.getItem('token');
  };

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private setToken(token: Token): void {
    localStorage.setItem('token', token.key);
  };

  private authSuccess(token: Token): Token {
    this.setToken(token);
    return token;
  }

}
