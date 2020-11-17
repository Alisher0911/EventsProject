import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  readonly rootURL = "https://localhost:5001/api";
  list: Event[];
  formData: Event;

  constructor(private http: HttpClient) { }

  getEvent(id: number) {
    //return this.http.get<Event>(this.rootURL + '/events/' + id);
    return this.getAllEvents().pipe(
      map(eventsArray => {
        return eventsArray.find(e => e.id === id);
      })
    );
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.rootURL + '/events');
  }

  getEventsByUser(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(this.rootURL + '/users/' +userId + '/participatedEvents');
  }

  addEvent(formData: Event) {
    return this.http.post(this.rootURL + '/events/addEvent', formData);
  }

  newEventId() {
    if (localStorage.getItem('Id')) {
      localStorage.setItem('Id', String(+localStorage.getItem('Id') + 1));
      return +localStorage.getItem('Id');
    } else {
      localStorage.setItem('Id', '101');
      return 101;
    }
  }
}
