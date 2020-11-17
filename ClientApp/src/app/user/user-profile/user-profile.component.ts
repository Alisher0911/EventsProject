import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/model/userprofile';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: number;
  user: UserProfile = {
    email: '',
    fullName: '',
    phoneNumber: '',
    role: ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) {
                this.userId = route.snapshot.params['id'];
               }


  ngOnInit() {
    this.router.navigate(['/users/' + this.authService.currentUser.id]);
    this.userService.getUser(this.authService.currentUser.id).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      }, err => {
        console.log(err);
      }
    )
  }
}
