import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { HeaderComponent } from '../header/header.component';
import { LoginService } from '../../../core/services/auth/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let mockToken;
  let service: LoginService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [LoginComponent, HeaderComponent],
      providers: [LoginService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    mockToken = { token: 'some token' };
    service = de.injector.get(LoginService);
    spy = spyOn(service, 'login').and.returnValue(of(mockToken));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {
    component.loginForm.controls['email'].patchValue('some@gmail.com');
    component.loginForm.controls['password'].patchValue('password');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.loginForm.controls['email'].patchValue('');
    component.loginForm.controls['password'].patchValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be call onSubmit', () => {
    component.onSubmit({});

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should be create form', () => {
    component.ngOnInit();
    expect(component.loginForm).not.toBeUndefined();
  });

  it('email should be type AbstractControl', () => {
    const email = component.email;
    expect(email instanceof AbstractControl).toBeTruthy();
  });

  it('pass should be type AbstractControl', () => {
    const pass = component.pass;
    expect(pass instanceof AbstractControl).toBeTruthy();
  });
});
