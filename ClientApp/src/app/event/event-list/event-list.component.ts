import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  Name = '';
  SearchName = '';

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents().subscribe(
      data => {
        this.events = data;
        console.log(this.events);
      }, error => {
        console.log(error);
      }
    )
  }

  filterByName() {
    this.SearchName = this.Name;
  }

  filterByNameClear() {
    this.SearchName = '';
    this.Name = '';
  }

}
