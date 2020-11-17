import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserDetail } from '../model/userdetail';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly rootURL = "https://localhost:5001/api";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  currentUser: UserDetail = {
    id: null,
    fullName: null,
    email: null,
    phoneNumber: null,
    role: null
  }

constructor(private http: HttpClient) { }

authUser(user: any) {
  //return this.http.post(this.rootURL + '/auth/login', user);
  let UserArray = [];
  if(localStorage.getItem('Users')) {
    UserArray = JSON.parse(localStorage.getItem("Users"));
  }
  return UserArray.find(u => u.email === user.email && u.password === user.password);
}

login(user: any) {
  return this.http.post(this.rootURL + '/auth/login', user).pipe(
    map((res: any) => {
      const user = res;
      if(user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser.id = this.decodedToken.nameid;
        this.currentUser.email = this.decodedToken.email;
        this.currentUser.fullName = this.decodedToken.unique_name;
        this.currentUser.phoneNumber = 'no_phone_number';
        this.currentUser.role = this.decodedToken.role;
      }
    })
  )
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

logout() {
  this.currentUser = {
    id: null,
    fullName: null,
    email: null,
    phoneNumber: null,
    role: null
  };
  localStorage.removeItem('token');
}

}
