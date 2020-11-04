import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EventClass } from 'src/app/model/eventClass';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  public eventId: number;
  event = new EventClass();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventsService: EventsService) { }

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.params['id']);
    this.route.data.subscribe(
      (data: EventClass) => {
        this.event = data['prp'];
      }
    )

    /*this.route.params.subscribe(
      (params) => {
        this.eventId = +params['id'];
        this.eventsService.getEvent(this.eventId).subscribe(
          (data: EventClass) => {
            this.event = data;
          }, error => this.router.navigate(['/'])
        );
      }
    )*/
  }
}
