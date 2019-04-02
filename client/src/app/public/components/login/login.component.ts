import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { LoginService } from '../../../core/services/auth/login.service';
import { MaterialService } from '../../../core/services/material-utils/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private sub: Subscription;
  private alert = MaterialService.alert;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.alert('Now you can log in');
      } else if (params['accessDenied']) {
        this.alert('Нou must first log in');
      } else if (params['sessionExpired']) {
        // this.alert.message('Please log in again');
      }
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get pass(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(values) {
    this.loginForm.disable();
    this.sub = this.loginService
      .login(values)
      .subscribe(() => this.loginForm.enable(), () => this.loginForm.enable());
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
