import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IEvent } from '../event/IEvent.interface';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { EventClass } from '../model/eventClass';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvent(id: number) {
    return this.getAllEvents().pipe(
      map(eventsArray => {
        //throw new Error('Some Error');
        return eventsArray.find(e => e.Id === id);
      })
    );
  }

  getAllEvents(): Observable<EventClass[]> {
    return this.http.get('data/events.json').pipe(
      map(data => {
        const eventsArray: Array<EventClass> = [];
        const localEvents = JSON.parse(localStorage.getItem('newEvent'));
        if(localEvents) {
          for (const id in localEvents) {
            if(localEvents.hasOwnProperty(id)) {
              eventsArray.push(localEvents[id]);
            }
          }
        }

        for (const id in data) {
          if(data.hasOwnProperty(id)) {
            eventsArray.push(data[id]);
          }
        }
        return eventsArray;
      })
    );

    return this.http.get<EventClass[]>('data/events.json');
  }

  addEvent(event: EventClass) {
    let newEvent = [event];
    if(localStorage.getItem('newEvent')) {
      newEvent = [event, ...JSON.parse(localStorage.getItem('newEvent'))];
    }
    localStorage.setItem('newEvent', JSON.stringify(newEvent));
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
