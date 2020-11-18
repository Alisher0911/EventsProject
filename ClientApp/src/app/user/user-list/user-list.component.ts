import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/model/userdetail';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDetail[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      }, error => {
        console.log(error);
      }
    )
  }

}
