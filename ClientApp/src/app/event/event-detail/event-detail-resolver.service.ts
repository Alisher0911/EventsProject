import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Event } from 'src/app/model/event';
import { EventsService } from 'src/app/services/events.service';

@Injectable({
  providedIn: 'root'
})
export class EventDetailResolverService implements Resolve<Event> {

constructor(private router: Router, private eventsService: EventsService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> | Event {
  const eventId = route.params['id'];
  return this.eventsService.getEvent(+eventId).pipe(
    catchError( error => {
        this.router.navigate(['/']);
        return of(null);
    })
  );
}

}
