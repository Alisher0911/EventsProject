import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/model/userprofile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-users',
  templateUrl: './event-users.component.html',
  styleUrls: ['./event-users.component.css']
})
export class EventUsersComponent implements OnInit {
  users_of_event: UserProfile[];
  eventId: number;

  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.params['eventid']);
    this.userService.getUsersEvent(this.eventId).subscribe(
      data => {
        this.users_of_event = data;
        console.log(this.users_of_event);
      }, error => {
        console.log(error);
      }
    )
  }

}
