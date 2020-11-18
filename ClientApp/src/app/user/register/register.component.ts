import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  //user: User;

  constructor(private fb: FormBuilder,
              public userService: UserService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    }, {validators: this.confirmPasswordValidator});
  }

  confirmPasswordValidator(fg: FormGroup): Validators {
    return fg.get('password').value == fg.get('confirmPassword').value ? null :
    {notMatched: true}
  }

  resetForm(form?: NgForm) {
    if(form != null) {
      form.form.reset();
    }
    this.userService.formData = {
      FullName: '',
      Email: '',
      Password: '',
      PhoneNumber: '',
      Role: '',
    }
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.resetForm(form);
        this.alertify.success("Successfully registered!");
        this.router.navigate(['/']);
      },
      err => {
        console.log(err);
      }
    )
  }

  /*userData(): User {
    return this.user = {
      fullName: this.fullName.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value
    }
  }*/

  //Getters
  /*get fullName() {
    return this.registrationForm.get('fullName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }*/
}
