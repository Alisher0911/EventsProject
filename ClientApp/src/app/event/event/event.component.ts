import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css']
})


export class EventsComponent implements OnInit{

  @Input() event: Event;
  constructor() {

  }

  ngOnInit():void{
    console.log(this.event.eventName);
  }
}
