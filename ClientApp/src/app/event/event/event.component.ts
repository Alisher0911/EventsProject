import { Component, Input } from '@angular/core';
import { IEvent } from '../IEvent.interface';

@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css']
})

export class EventsComponent {
  @Input() event: IEvent
}
