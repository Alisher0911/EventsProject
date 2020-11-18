import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { UserInEvent } from '../model/userinevent';
import { UserProfile } from '../model/userprofile';
import { UserDetail } from '../model/userdetail';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  form: UserInEvent;
  readonly rootURL = "https://localhost:5001/api";

constructor(private http: HttpClient) { }

postUser(formData: User) {
  return this.http.post(this.rootURL + '/auth/register', formData);
}

joinToEvent(form: UserInEvent) {
  return this.http.post(this.rootURL + '/events/' + form.eventId + '/join/' + form.userId, form);
}

getUser(id: number) {
  return this.http.get<UserProfile>(this.rootURL + '/users/' + id);
}

getUsersEvent(eventId: number): Observable<UserProfile[]> {
  return this.http.get<UserProfile[]>(this.rootURL + '/events/' + eventId + '/userInEvent');
}

getAllUsers(): Observable<UserDetail[]> {
  return this.http.get<UserDetail[]>(this.rootURL + '/users');
}
}
