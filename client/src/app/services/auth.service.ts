import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  user: any;

  id: string;
  token: string;
  name: String;
  address: String;
  email: String;
  phone: String;

  listener: any;

  constructor(private httpClient: HttpClient) { }

  init() { }

  login(email: string, password: string) {
    let promise = new Promise<void>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/login",
          { email: email, password: password },
          { headers: new HttpHeaders().set("Content-Type", "application/json") }
        )
        .toPromise()
        .then(res => {
          console.log(res);
          if (res["result"] == 0) {
            localStorage.setItem('token', res['token']);
            this.token = res["token"];
            this.isLoggedIn = true;
            this.id = res["user"]["id"];
            this.user = res["user"];
            //this.initDefaults();
            if (!this.user.mode) {
              this.user.mode = 0;
            }
            if (this.listener) {
              this.listener();
            }
          }

          resolve();
        });
    });

    return promise;
  }

  register(name: String, email: String, password: String) {
    let promise = new Promise<void>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/register",
          { name: name, email: email, password: password },
          { headers: new HttpHeaders().set("Content-Type", "application/json") }
        )
        .toPromise()
        .then(res => {
          if (res["result"] == 0) {
            console.log(res);
            this.id = res["user"]["id"];
            this.token = res["token"];
            this.isLoggedIn = true;
            this.user = res["user"];
            //this.initDefaults();
            if (!this.user.mode) {
              this.user.mode = 0;
            }
          }
          resolve();
        });
    });

    return promise;
  }

  logout() {
    let promise = new Promise<void>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/logout",
          {},
          { headers: new HttpHeaders().set("Content-Type", "application/json") }
        )
        .toPromise()
        .then(res => {
          console.log(res);
          if (res["result"] == 0) {
            this.isLoggedIn = false;
          }
          resolve();
        });
    });

    return promise;
  }
}
