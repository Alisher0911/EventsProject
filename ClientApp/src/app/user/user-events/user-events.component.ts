import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/model/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css']
})
export class UserEventsComponent implements OnInit {
  events_of_user: Event[];
  id: number;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['useriid']);
    this.eventsService.getEventsByUser(this.id).subscribe(
      data => {
        this.events_of_user = data;
        console.log(this.events_of_user);
      }, error => {
        console.log(error);
      }
    )
  }

}
