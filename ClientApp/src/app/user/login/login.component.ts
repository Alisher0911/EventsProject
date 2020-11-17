import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    return this.authService.login(loginForm.value).subscribe(
      res => {
        this.alertify.success("Logged In!");
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.alertify.warning("Incorrect Email or Password!");
      }
    );
    /*console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);
    if(token) {
      console.log(token);
      localStorage.setItem('token', JSON.stringify(token));
      this.alertify.success('Succesfully Logged In.');
      this.router.navigate(['/']);
    } else {
      this.alertify.error('Incorrect email or password');
    }*/
  }

}
