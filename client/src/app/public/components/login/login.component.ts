import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get pass(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(values) {
    console.log('values: ', values);
    this.authService.login(values).subscribe(res => {
      console.log(res);
    });
  }
}
