import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { EventsComponent } from './event/event/event.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventsService } from './services/events.service';
import { AddEventComponent } from './event/add-event/add-event.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { EventDetailResolverService } from './event/event-detail/event-detail-resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { UserEventsComponent } from './user/user-events/user-events.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EventUsersComponent } from './event/event-users/event-users.component';
import { AuthGuardService } from './guards/auth-guard.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const eventRoutes: Routes = [
  { path: 'participatedEvents', component: UserEventsComponent}
];

const appRoutes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent, resolve: {prp: EventDetailResolverService} },
  { path: 'events/:eventid/userInEvent', component: EventUsersComponent },
  { path: 'users', component: EventListComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'addEvent', component: AddEventComponent, canActivate: [AuthGuardService] },
  //{ path: '**', component: EventListComponent },
  { path: 'users/:userid', component: UserProfileComponent },
  { path: 'users/:useriid/participatedEvents', component: UserEventsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventListComponent,
    NavBarComponent,
    AddEventComponent,
    EventDetailComponent,
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    UserEventsComponent,
    EventUsersComponent,
    FilterPipe,
    SortPipe
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    EventsService,
    UserService,
    AlertifyService,
    AuthService,
    EventDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
