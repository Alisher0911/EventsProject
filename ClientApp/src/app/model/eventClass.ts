import { IEvent } from '../event/IEvent.interface';

export class EventClass implements IEvent {
  Id: number;
  Name: string;
  Description: string;
  Place: string;
  StartDate: string;
  Image?: string;
}
