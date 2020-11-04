import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventClass } from 'src/app/model/eventClass';
import { EventsService } from 'src/app/services/events.service';

@Injectable({
  providedIn: 'root'
})
export class EventDetailResolverService implements Resolve<EventClass> {

constructor(private router: Router, private eventsService: EventsService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventClass> | EventClass {
  const eventId = route.params['id'];
  return this.eventsService.getEvent(+eventId).pipe(
    catchError( error => {
        this.router.navigate(['/']);
        return of(null);
    })
  );
}

}
