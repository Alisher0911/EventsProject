import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { IEvent } from '../IEvent.interface';
import { EventClass } from 'src/app/model/eventClass';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event = new EventClass();
  addEventForm: FormGroup;
  eventList: any[];

  constructor(private router: Router,
              private fb: FormBuilder,
              private eventsService: EventsService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.CreateAddEventForm();
    this.eventsService.getAllEvents().subscribe(data => {
      this.eventList = data;
      console.log(data);
    })
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if(this.addEventForm.valid) {
      this.mapEvent();
      this.eventsService.addEvent(this.event);
      this.alertify.success('Form Submitted');
      console.log(this.addEventForm);

      this.router.navigate(['/']);
    } else {
      this.alertify.error("Not all fields are filled.");
    }
  }

  mapEvent(): void {
    this.event.Id = this.eventsService.newEventId();
    this.event.Name = this.name.value;
    this.event.Description = this.description.value;
    this.event.Place = this.place.value;
    this.event.StartDate = this.startDate.value;
  }


  CreateAddEventForm() {
    this.addEventForm = this.fb.group({
      Name: [null, [Validators.required, Validators.minLength(5)]],
      Description: [null, [Validators.required, Validators.maxLength(500)]],
      Place: [null, [Validators.required, Validators.maxLength(200)]],
      StartDate: [null, Validators.required]
    })
  }

  //Getter
  get name() {
    return this.addEventForm.get('Name') as FormControl;
  }

  get description() {
    return this.addEventForm.get('Description') as FormControl;
  }

  get place() {
    return this.addEventForm.get('Place') as FormControl;
  }

  get startDate() {
    return this.addEventForm.get('StartDate') as FormControl;
  }
}
