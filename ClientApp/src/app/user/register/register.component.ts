import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private alertify: AlertifyService) { }

  ngOnInit() {
    /*this.registrationForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl('8', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    }, this.confirmPasswordValidator);*/
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

  onSubmit() {
    console.log(this.registrationForm.value);

    this.userSubmitted = true;
    if(this.registrationForm.valid) {
      //this.user = Object.assign(this.user, this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('Succesfully registered!');
    } else {
      this.alertify.error('Not all fields are filled');
    }
  }

  userData(): User {
    return this.user = {
      fullName: this.fullName.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value
    }
  }

  //Getters
  get fullName() {
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
  }
}
