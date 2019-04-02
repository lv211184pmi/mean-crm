import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public regForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.regForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, [Validators.required],
    });
  }

  get email(): AbstractControl {
    return this.regForm.get('email');
  }

  get pass(): AbstractControl {
    return this.regForm.get('password');
  }

  onSubmit(values) {
    console.log('values: ', values);
    this.authService.registration(values).subscribe(res => {
      console.log(res);
    });
  }
}
