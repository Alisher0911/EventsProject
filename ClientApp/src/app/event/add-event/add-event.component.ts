import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Event } from 'src/app/model/event';
import { UserInEvent } from 'src/app/model/userinevent';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: Event;
  addEventForm: FormGroup;
  eventList: any[];

  eventId: number;
  userinevent: UserInEvent = {
    eventId: 0,
    userId: 0
  }

  constructor(private router: Router,
              private fb: FormBuilder,
              public eventsService: EventsService,
              private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.resetForm();
    this.CreateAddEventForm();
    /*this.eventsService.getAllEvents().subscribe(data => {
      this.eventList = data;
      console.log(data);
    })*/
  }

  resetForm(form?: NgForm) {
    if(form != null) {
      form.form.reset();
    }
    this.eventsService.formData = {
      id: 0,
      eventName: '',
      description: '',
      place: '',
      startDate: '',
      image: '',
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit(form: NgForm) {
    this.eventsService.addEvent(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.alertify.success("Successfully added!");
        this.router.navigate(['/']);
        //this.addOrganizer(eventid, userid);
      },
      err => {
        console.log(err);
      }
    )
    /*if(this.addEventForm.valid) {
      this.eventsService.addEvent(form.value);
      this.alertify.success('Form Submitted');
      console.log(this.addEventForm);

      this.router.navigate(['/']);
    } else {
      this.alertify.error("Not all fields are filled.");
    }*/
  }

  /*addOrganizer(eventid:number, userid:number) {
    this.userinevent = {
      eventId: Number(eventid),
      userId: Number(userid)
    }
    this.userService.joinToEvent(this.userinevent).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }*/

  mapEvent(): void {
    this.event.id = this.eventsService.newEventId();
    this.event.eventName = this.name.value;
    this.event.description = this.description.value;
    this.event.place = this.place.value;
    this.event.startDate = this.startDate.value;
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

  get currentUserId() {
    return this.authService.currentUser.id;
  }
}
