import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event';
import { UserInEvent } from 'src/app/model/userinevent';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventsService } from 'src/app/services/events.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  public eventId: number;
  event: Event;

  userinevent: UserInEvent = {
    eventId: 0,
    userId: 0
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventsService: EventsService,
              public authService: AuthService,
              public userSevice: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.params['id']);
    //this.getEvent();
    this.route.data.subscribe(
      (data: Event) => {
        this.event = data['prp'];
      }
    )
  }


  /*getEvent() {
    this.eventsService.getEvent(this.eventId).subscribe(data => {
      this.event = data;
      console.log(this.event);
    })
  }*/

  showEventParticipants(id: number) {
    this.router.navigate(['/events/' + id + '/userInEvent'], {relativeTo: this.route});
  }

  joinToEvent(eventid: any, userid: any) {
    this.userinevent = {
      eventId: Number(eventid),
      userId: Number(userid)
    }
    console.log(this.userinevent.eventId + this.userinevent.userId);
    this.userSevice.joinToEvent(this.userinevent).subscribe(
      data => {
        console.log(data);
        this.alertify.success("Succesfully Joined!");
      }, err => {
        console.log(err);
        this.alertify.error("You already joined");
      }
    );
  }
}
