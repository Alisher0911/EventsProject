import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/model/event';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {
  events_of_user: Event[];
  id: number;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private authService: AuthService) {
                //this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
              }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.eventsService.getEventsByUser(this.authService.currentUser.id).subscribe(
      data => {
        this.events_of_user = data;
        console.log(this.events_of_user);
      }, error => {
        console.log(error);
      }
    )
  }

}
