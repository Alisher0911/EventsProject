import { Component, OnInit } from '@angular/core';
import { EventClass } from 'src/app/model/eventClass';
import { EventsService } from 'src/app/services/events.service';
import { IEvent } from '../IEvent.interface';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  //events: Array<IEvent>;
  events: EventClass[];
  Name = '';
  SearchName = '';

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents().subscribe(
      data => {
        this.events = data;
        console.log(data);
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
