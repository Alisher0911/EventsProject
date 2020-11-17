import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;

  constructor(private alertify: AlertifyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  isOrganizer():boolean {
    return this.authService.currentUser.role == 'Organizer'? true : false;
  }

  isStudent():boolean {
    return this.authService.currentUser.role == 'Student'? true : false;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.alertify.success("Logged out");
    this.router.navigate(['/']);
  }

  //getters
  get FullName() {
    return this.authService.currentUser.fullName;
  }

  get Email() {
    return this.authService.currentUser.email;
  }

  get Id() {
    return Number(this.authService.currentUser.id);
  }
}
