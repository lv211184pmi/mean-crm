import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from '../../../core/services/auth/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public regForm: FormGroup;
  private sub: Subscription;

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get email(): AbstractControl {
    return this.regForm.get('email');
  }

  get pass(): AbstractControl {
    return this.regForm.get('password');
  }

  onSubmit(values) {
    this.regForm.disable();
    this.sub = this.loginService
      .registration(values)
      .subscribe(() => this.regForm.enable(), () => this.regForm.enable());
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
