import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { EventsComponent } from './event/event/event.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventsService } from './services/events.service';
import { AddEventComponent } from './event/add-event/add-event.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserServiceService } from './services/user-service.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { EventDetailResolverService } from './event/event-detail/event-detail-resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';

const appRoutes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent, resolve: {prp: EventDetailResolverService} },
  { path: 'users', component: EventListComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: '**', component: EventListComponent }
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
    BsDatepickerModule.forRoot()
  ],
  providers: [
    EventsService,
    UserServiceService,
    AlertifyService,
    AuthService,
    EventDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
